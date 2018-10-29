import * as Koa from 'koa'

import {Shop} from '../entities/shop'

export interface Context {
  shop: Shop,
}

export default async ({ctx}: {ctx: Koa.Context}): Promise<Context> => {
  const shopHeader = ctx.headers['x-shop']
  let shop

  if (shopHeader) {
    shop = await Shop.findOne({where: {name: shopHeader}})
  }

  return {shop}
}
