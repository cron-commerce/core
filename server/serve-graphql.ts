import {ApolloServer} from 'apollo-server-koa'
import * as Koa from 'koa'

import BigInt, {resolvers as BigIntResolvers} from '../graphql/big-int'
import Checkout, {resolvers as CheckoutResolvers} from '../graphql/checkout'
import ShippingRate, {resolvers as ShippingRateResolvers} from '../graphql/shipping-rate'
import Shop, {resolvers as ShopResolvers} from '../graphql/shop'
import Subscribable, {resolvers as SubscribableResolvers} from '../graphql/subscribable'
import SubscribableProduct from '../graphql/subscribable-product'
import SubscribableSize from '../graphql/subscribable-size'
import setGraphQLContext from './set-graphql-context'

const Query = `
  type Mutation
  type Query
`

const apolloServer = new ApolloServer({
  context: setGraphQLContext,
  resolvers: [BigIntResolvers, CheckoutResolvers, ShippingRateResolvers, ShopResolvers, SubscribableResolvers],
  typeDefs: [BigInt, Checkout, ShippingRate, Query, Shop, Subscribable, SubscribableProduct, SubscribableSize],
})

export default (app: Koa) => {
  apolloServer.applyMiddleware({app})
}
