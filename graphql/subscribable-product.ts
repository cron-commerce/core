const typeDef = `
  input SubscribableProductInput {
    shopifyProductId: BigInt
  }

  type ShopifyProduct {
    id: ID!
  }

  type SubscribableProduct {
    id: ID!
    shopifyProduct: ShopifyProduct
  }
`

export default typeDef
