import {getManager} from 'typeorm'

import {Shop} from '../entities/shop'

const typeDef = `
  type Shop {
    id: ID!
    name: String
    stripeUserId: String
  }

  input ShopInput {
    stripeUserId: String
  }

  extend type Mutation {
    saveShopAccessToken(name: String!, accessToken: String!): Shop
    updateShop(name: String!, input: ShopInput): Shop
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
      let shop = await Shop.findByName(args.name)

      if (!shop) {
        shop = new Shop()
        shop.name = args.name
      }
    
      shop.accessToken = args.accessToken
      await entityManager.save(shop)

      return shop
    },

    updateShop: async (obj, args, context, info) => {
      const entityManager = getManager()
      await entityManager.update(Shop, {name: args.name}, {...args.input})
      return Shop.findByName(args.name)
    }
  },
  Query: {
    shop: async (obj, args, context, info) => Shop.findByName(args.name),
  },
}