import {ApolloServer} from 'apollo-server-koa'
import * as Koa from 'koa'

import Shop, {resolvers as shopResolvers} from '../graphql/shop'
import User, {resolvers as userResolvers} from '../graphql/user'

const Query = `
  type Mutation
  type Query
`

const apolloServer = new ApolloServer({
  resolvers: [shopResolvers, userResolvers],
  typeDefs: [Query, Shop, User],
})

export default (app: Koa) => {
  apolloServer.applyMiddleware({app})
}
