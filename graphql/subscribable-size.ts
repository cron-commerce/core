const typeDef = `
  input SubscribableSizeInput {
    numVariants: Int
    price: Int
  }

  type SubscribableSize {
    id: ID!
    numVariants: Int
    price: Int
  }
`

export default typeDef
