import {Types} from '../entities/subscribable'

const typeDef = `
  type NewSubscribableOptions {
    types: [String]
  }

  input SubscribableProductInput {
    shopifyProductId: Int
  }

  input SubscribableSizeInput {
    numVariants: Int
    price: Int
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
    createSubscribable: async (obj, args, context, info) => {
      console.log(context)
      return {id: 1}
    },
  },
  Query: {
    newSubscribableOptions: async (obj, args, context, info) => ({
      types: Object.keys(Types),
    }),
  },
}