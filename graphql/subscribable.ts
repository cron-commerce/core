import {Types} from '../entities/subscribable'

const typeDef = `
  type NewSubscribableOptions {
    types: [String]
  }

  extend type Query {
    newSubscribableOptions: NewSubscribableOptions
  }
`

export default typeDef

export const resolvers = {
  Query: {
    newSubscribableOptions: async (obj, args, context, info) => ({
      types: Object.keys(Types),
    }),
  },
}