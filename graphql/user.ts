import {UserInputError} from 'apollo-server-koa'
import * as jwt from 'jsonwebtoken'
import {getManager} from 'typeorm'

import {User} from '../entities/user'

const typeDef = `
  type User {
    id: ID!
    email: String
    token: String
  }

  extend type Mutation {
    createUser(email: String!, password: String!): User
    loginUser(email: String!, password: String!): User
  }

  extend type Query {
    user(email: String!): User
  }
`

export default typeDef

const createJWT = user => jwt.sign({sub: user.id}, process.env.JWT_SECRET)

export const resolvers = {
  Mutation: {
    createUser: async (obj, args, context, info) => {
      if (args.password.length < 6) { throw new UserInputError('Password too short') }

      const entityManager = getManager()
      const user = new User()
      user.password = args.password
      user.email = args.email
      await entityManager.save(user)

      user.token = createJWT(user)
      return user
    },

    loginUser: async (obj, args, context, info) => {
      const entityManager = getManager()
      const user = await entityManager.findOne(User, {where: {email: args.email}})

      if (user && user.isPasswordValid(args.password)) {
        user.token = createJWT(user)
        return user
      }
    },
  },

  Query: {
    user: async (obj, args, context, info) => {
      const entityManager = getManager()
      return entityManager.findOne(User, {where: {email: args.email}})
    },
  },
}