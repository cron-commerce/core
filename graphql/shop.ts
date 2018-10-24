import {Shop} from '../entities/shop'

const typeDef = `
  type Shop {
    id: ID!
    name: String
    stripePublishableKey: String
    stripeUserId: String
  }

  input ShopInput {
    stripePublishableKey: String
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
      let shop = await Shop.findOne({where: {name: args.name}})

      if (!shop) {
        shop = new Shop()
        shop.name = args.name
      }
    
      await shop.save()

      return shop
    },

    updateShop: async (obj, args, context, info) => {
      await Shop.update({name: args.name}, {...args.input})
      return Shop.findOne({where: {name: args.name}})
    }
  },
  Query: {
    shop: async (obj, args, context, info) => Shop.findOne({where: {name: args.name}})
  },
}