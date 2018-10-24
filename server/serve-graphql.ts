import {ApolloServer} from 'apollo-server-koa'
import * as Koa from 'koa'

import BigInt, {resolvers as BigIntResolvers} from '../graphql/big-int'
import Checkout, {resolvers as CheckoutResolvers} from '../graphql/checkout'
import ShippingRate, {resolvers as ShippingRateResolvers} from '../graphql/shipping-rate'
import Shop, {resolvers as ShopResolvers} from '../graphql/shop'

const Query = `
  type Mutation
  type Query
`

const apolloServer = new ApolloServer({
  resolvers: [BigIntResolvers, CheckoutResolvers, ShippingRateResolvers, ShopResolvers],
  typeDefs: [BigInt, Checkout, ShippingRate, Query, Shop],
})

export default (app: Koa) => {
  apolloServer.applyMiddleware({app})
}
