import {ApolloServer} from 'apollo-server-koa'
import * as Koa from 'koa'

import Shop, {resolvers as shopResolvers} from '../graphql/shop'

const Query = `
  type Mutation
  type Query
`

const apolloServer = new ApolloServer({
  resolvers: [shopResolvers],
  typeDefs: [Query, Shop],
})

export default (app: Koa) => {
  apolloServer.applyMiddleware({app})
}
