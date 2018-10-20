import {ApolloServer} from 'apollo-server-koa'
import * as Koa from 'koa'

import Shop, {resolvers as shopResolvers} from '../graphql/shop'

const apolloServer = new ApolloServer({
  resolvers: [shopResolvers],
  typeDefs: [Shop],
})

export default (app: Koa) => {
  apolloServer.applyMiddleware({app})
}
