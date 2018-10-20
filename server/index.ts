import * as Koa from 'koa'
import * as logger from 'koa-logger'

import serveGraphql from './serve-graphql'
import initTypeorm from './init-typeorm'

const port = parseInt(process.env.PORT, 10)

const app = new Koa()

app
.use(logger('dev'))
.use(async (ctx, next) => {
  if (ctx.path === '/') {
    ctx.body = 'Cron Commerce Core'
  } else {
    await next()
  }
})
.listen(port)

initTypeorm()
serveGraphql(app)