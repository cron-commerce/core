import * as Shopify from 'shopify-api-node'

import {Shop} from '../entities/shop'

const typeDef = `
  type ShippingZoneWeightBasedShippingRate {
    id: ID!
    weight_low: Float
    weight_high: Float
    name: String
    price: Float
    shipping_zone_id: ID
  }

  type ShippingZonePriceBasedShippingRate {
    id: ID!
    name: String
    min_order_subtotal: Float
    price: Float
    max_order_subtotal: Float
    shipping_zone_id: ID
  }

  type ShippingZoneCarrierRateProvider {
    id: ID!
    country_id: ID
    carrier_service_id: ID
    percent_modifier: Int
    flat_modifier: Float
    shipping_zone_id: ID
  }

  type ShippingZone {
    id: ID!
    name: String
    countries: [Country]
    weight_based_shipping_rates: [ShippingZoneWeightBasedShippingRate]
    price_based_shipping_rates: [ShippingZonePriceBasedShippingRate]
    carrier_shipping_rate_providers: [ShippingZoneCarrierRateProvider]
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