import {getManager} from 'typeorm'

import {Shop} from '../entities/shop'

const typeDef = `
  type Shop {
    id: ID!
    name: String
  }

  extend type Query {
    shop(name: String!): Shop
  }
`

export default typeDef

export const resolvers = {
  Query: {
    shop: async (obj, args, context, info) => {
      const entityManager = getManager()
      const shop = await entityManager.findOne(Shop, {where: {name: args.name}})
      return shop
    },
  },
}