import {ApolloServer, gql} from 'apollo-server-koa'
import * as Koa from 'koa'

const typeDefs = gql`
  type Query {
    hello: String
  }
`

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
}

const apolloServer = new ApolloServer({resolvers, typeDefs})

export default (app: Koa) => {
  apolloServer.applyMiddleware({app})
}
