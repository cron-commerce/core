import {ApolloServer} from 'apollo-server-koa'
import * as Koa from 'koa'

import ShippingZone, {resolvers as shippingZoneResolvers} from '../graphql/shipping-zone'
import Shop, {resolvers as shopResolvers} from '../graphql/shop'

const Query = `
  type Mutation
  type Query
`

const apolloServer = new ApolloServer({
  resolvers: [shippingZoneResolvers, shopResolvers],
  typeDefs: [Query, ShippingZone, Shop],
})

export default (app: Koa) => {
  apolloServer.applyMiddleware({app})
}
