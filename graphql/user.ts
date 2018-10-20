import {getManager} from 'typeorm'

import {User} from '../entities/user'

const typeDef = `
  type User {
    id: ID!
    email: String
  }

  extend type Mutation {
    createUser(email: String!, password: String!): User
  }

  extend type Query {
    user(email: String!): User
  }
`

export default typeDef

export const resolvers = {
  Mutation: {
    createUser: async (obj, args, context, info) => {
      const entityManager = getManager()
      const user = new User()
      user.password = args.password
      user.email = args.email
      await entityManager.save(user)
      return user
    },
  },
  Query: {
    user: async (obj, args, context, info) => {
      const entityManager = getManager()
      const user = await entityManager.findOne(User, {where: {email: args.email}})
      return user
    },
  },
}