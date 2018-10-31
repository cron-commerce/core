const typeDef = `
  input SubscribableProductInput {
    shopifyProductId: BigInt
  }

  type SubscribableProduct {
    id: ID!
    shopifyProductId: BigInt
  }
`

export default typeDef
