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

  type Subscribable {
    id: ID!
  }

  extend type Mutation {
    createSubscribable(input: SubscribableInput!): Subscribable
  }

  extend type Query {
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
    newSubscribableOptions: async (obj, args, context, info) => ({
      types: Object.keys(Types),
    }),
  },
}