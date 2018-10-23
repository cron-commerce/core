import * as Shopify from 'shopify-api-node'
import * as Stripe from 'stripe'

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
    createCheckout(shopName: String!, input: CheckoutInput!): [Checkout]
  }
`

export default typeDef

export const resolvers = {
  Mutation: {
    createCheckout: async (obj, args, context, info) => {
      const shop = await Shop.findByName(args.shopName)
      const shopify = new Shopify({accessToken: shop.accessToken, shopName: args.shopName})
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

      // fetch variants from shopify to pull prices
      // fetch shipping rates to get the price for the selected one
      // create stripe customer
      // create the stripe charge
      // create the order in shopify
    
      return []
    },
  },
}