const typeDef = `
  type ShippingRate {
    title: String
    code: String
    price: Int
    description: String
    currency: String
    min_delivery_date: Int
    max_delivery_date: Int
  }

  extend type Query {
    shippingRates: [ShippingRate]
  }
`

export default typeDef

export const resolvers = {
  Query: {
    shippingRates: async (obj, args, context, info) => {
      return [{
        title: 'USPS Priority Mail',
        code: 'usps-priority',
        price: 999,
        description: '2 Business Days',
        currency: 'USD',
      }, {
        title: 'USPS Overnight',
        code: 'usps-overnight',
        price: 1999,
        description: '1 Business Day',
        currency: 'USD',
      },]
    },
  },
}