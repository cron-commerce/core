import {Types, Subscribable} from '../entities/subscribable'
import {SubscribableProduct} from '../entities/subscribable-product'
import {SubscribableSize} from '../entities/subscribable-size'
import {Context} from '../server/set-graphql-context'

const typeDef = `
  type NewSubscribableOptions {
    types: [String]
  }

  input SubscribableProductInput {
    shopifyProductId: BigInt
  }

  input SubscribableSizeInput {
    numVariants: Int
    price: String
  }

  input SubscribableInput {
    products: [SubscribableProductInput]
    sizes: [SubscribableSizeInput]
    type: String
  }

  type SubscribableProduct {
    id: ID!
    shopifyProductId: BigInt
  }

  type SubscribableSize {
    id: ID!
    numVariants: Int
    price: String
  }

  type Subscribable {
    id: ID!
    products: [SubscribableProduct]
    sizes: [SubscribableSize]
  }

  extend type Mutation {
    createSubscribable(input: SubscribableInput!): Subscribable
  }

  extend type Query {
    subscribable(id: ID!): Subscribable
    newSubscribableOptions: NewSubscribableOptions
  }
`

export default typeDef

export const resolvers = {
  Mutation: {
    createSubscribable: async (obj, args, context: Context, info) => {
      const subscribable = new Subscribable()
      subscribable.type = args.input.type
      subscribable.shop = context.shop

      subscribable.products = args.input.products.map(productArgs => {
        const product = new SubscribableProduct()
        product.shopifyProductId = productArgs.shopifyProductId
        return product
      })

      subscribable.sizes = args.input.sizes.map(sizeArgs => {
        const size = new SubscribableSize()
        size.numVariants = sizeArgs.numVariants
        size.price = sizeArgs.price
        return size
      })

      await subscribable.save()
      return subscribable
    },
  },
  Query: {
    subscribable: async (obj, args, context, info) => Subscribable.findOne(args.id, {where: {shop: context.shop}}),
    newSubscribableOptions: async (obj, args, context, info) => ({types: Object.keys(Types)}),
  },
}