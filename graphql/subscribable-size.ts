const typeDef = `
  input SubscribableSizeInput {
    numVariants: Int
    price: String
  }

  type SubscribableSize {
    id: ID!
    numVariants: Int
    price: String
  }
`

export default typeDef
