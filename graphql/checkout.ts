import * as Shopify from 'shopify-api-node'
import * as Stripe from 'stripe'

import {Customer} from '../entities/customer'
import {Shop} from '../entities/shop'

const typeDef = `
  type Checkout {
    id: ID!
  }

  input AddressInput {
    address1: String
    address2: String
    city: String
    country: String
    firstName: String
    lastName: String
    province: String
    zip: String
  }

  input CartItemInput {
    quantity: Int
    variant_id: BigInt
  }

  input CartInput {
    items: [CartItemInput]
  }

  input ShippingRateInput {
    title: String
    code: String
    price: Int
    description: String
    currency: String
  }

  input CheckoutInput {
    cart: CartInput
    customerEmail: String
    shippingAddress: AddressInput
    shippingRate: ShippingRateInput
    stripeToken: String
  }

  extend type Mutation {
    createCheckout(shopName: String!, input: CheckoutInput!): Checkout
  }
`

export default typeDef

interface CreateCheckoutArgs {
  input: {
    cart: {
      items: {
        quantity: number,
        variant_id: number,
      }[],
    },
    customerEmail: string,
    shippingAddress: {
      address1: string,
      address2: string,
      city: string,
      country: string,
      firstName: string,
      lastName: string,
      province: string,
      zip: string,
    },
    shippingRate: {
      title: string,
      code: string,
      price: number,
      description: string,
      currency: string,
    },
    stripeToken: string,
  },
  shopName: string,
}

export const resolvers = {
  Mutation: {
    createCheckout: async (obj, args: CreateCheckoutArgs, context, info) => {
      const shop = await Shop.findOne({where: {name: args.shopName}})
      const shopify = new Shopify({accessToken: shop.accessToken, shopName: args.shopName})
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
      const stripeConnectArgs = {stripe_account: shop.stripeUserId}

      // fetch variants from shopify to pull current prices
      const variants = await Promise.all(args.input.cart.items.map(item => shopify.productVariant.get(item.variant_id)))
      const subtotal = args.input.cart.items.reduce((sum, item) => {
        const variant = variants.find(variant => variant.id === item.variant_id)
        return sum + (parseFloat(variant.price) * item.quantity)
      }, 0.0)

      // TODO: fetch shipping rates to get the price for the selected one, as well as tax
      // TODO: calculate total
      const total = subtotal

      // find or create local customer
      let customer = await Customer.findOne(Customer, {where: {email: args.input.customerEmail}})
      if (!customer) {
        customer = new Customer()
        customer.email = args.input.customerEmail
        await customer.save()
      }
      
      // if no stripeCustomerId, create stripe customer
      if (!customer.stripeCustomerId) {
        const stripeCustomer = await stripe.customers.create({
          source: args.input.stripeToken,
          email: customer.email,
        }, stripeConnectArgs)
        customer.stripeCustomerId = stripeCustomer.id
        await customer.save()
      }

      // if there is a stripe customer, update the default credit card
      else {
        await stripe.customers.update(customer.stripeCustomerId, {
          source: args.input.stripeToken,
        }, stripeConnectArgs)
      }

      // create the stripe charge
      const charge = await stripe.charges.create({
        amount: Math.ceil(total * 100),
        currency: 'usd',
        customer: customer.stripeCustomerId,
      }, stripeConnectArgs)

      // create the order in shopify
      // create subscriptions for all applicable items

      // TODO: throw an error if the order total does not equal the incoming cart total
      // TODO: currencies
      // TODO: discounts
    
      return {}
    },
  },
}