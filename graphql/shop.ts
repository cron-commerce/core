import {getManager} from 'typeorm'

import {Shop} from '../entities/shop'

const typeDef = `
  type Shop {
    id: ID!
    name: String
  }

  extend type Mutation {
    saveShopAccessToken(name: String!, accessToken: String!): Shop
  }

  extend type Query {
    shop(name: String!): Shop
  }
`

export default typeDef

export const resolvers = {
  Mutation: {
    saveShopAccessToken: async (obj, args, context, info) => {
      const entityManager = getManager()
      let shop = await entityManager.findOne(Shop, {where: {name: args.name}})

      if (!shop) {
        shop = new Shop()
        shop.name = args.name
      }
    
      shop.accessToken = args.accessToken
      await entityManager.save(shop)

      return shop
    },
  },
  Query: {
    shop: async (obj, args, context, info) => {
      const entityManager = getManager()
      const shop = await entityManager.findOne(Shop, {where: {name: args.name}})
      return shop
    },
  },
}