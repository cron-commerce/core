import {ApolloServer} from 'apollo-server-koa'
import * as Koa from 'koa'

import Country, {resolvers as countryResolvers} from '../graphql/country'
import ShippingRate, {resolvers as shippingRateResolvers} from '../graphql/shipping-rate'
import ShippingZone, {resolvers as shippingZoneResolvers} from '../graphql/shipping-zone'
import Shop, {resolvers as shopResolvers} from '../graphql/shop'

const Query = `
  type Mutation
  type Query
`

const apolloServer = new ApolloServer({
  resolvers: [countryResolvers, shippingRateResolvers, shippingZoneResolvers, shopResolvers],
  typeDefs: [Country, ShippingRate, ShippingZone, Query, Shop],
})

export default (app: Koa) => {
  apolloServer.applyMiddleware({app})
}
