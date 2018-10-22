import * as Shopify from 'shopify-api-node'

import {Shop} from '../entities/shop'

const typeDef = `
  type ShippingZone {
    id: ID!
  }

  extend type Query {
    shippingZones(shopName: String!): [ShippingZone]
  }
`

export default typeDef

export const resolvers = {
  Query: {
    shippingZones: async (obj, args, context, info) => {
      const shop = await Shop.findByName(args.shopName)
      const shopify = new Shopify({accessToken: shop.accessToken, shopName: args.shopName})
      const shippingZones = await shopify.shippingZone.list()
      return shippingZones
    },
  },
}