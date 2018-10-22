import * as Shopify from 'shopify-api-node'

import {Shop} from '../entities/shop'

const typeDef = `
  type Province {
    code: String
    country_id: ID
    id: ID!
    name: String
    shipping_zone_id: ID
    tax: Float
    tax_name: String
    tax_type: String
    tax_percentage: Float
  }

  type Country {
    id: ID!
    shipping_zone_id: ID
    name: String
    tax: Float
    code: String
    tax_name: String
    provinces: [Province]
  }

  extend type Query {
    countries(shopName: String!): [Country]
  }
`

export default typeDef

export const resolvers = {
  Query: {
    countries: async (obj, args, context, info) => {
      const shop = await Shop.findByName(args.shopName)
      const shopify = new Shopify({accessToken: shop.accessToken, shopName: args.shopName})
      const countries = await shopify.country.list()
      return countries
    },
  },
}