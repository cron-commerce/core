import * as BigInt from 'graphql-bigint'

const typeDef = `
  scalar BigInt
`

export default typeDef

export const resolvers = {
  BigInt
}