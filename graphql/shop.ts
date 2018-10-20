const Shop = `
  type Query {
    hello: String
  }
`

export default Shop

export const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
}