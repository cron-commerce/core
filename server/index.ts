import * as Koa from 'koa'
import * as logger from 'koa-logger'
import * as Router from 'koa-router'

import serveGraphql from './serve-graphql'
import initTypeorm from './init-typeorm'

const port = 3000

const app = new Koa()
const router = new Router()
 
router.get('/', (ctx: Koa.Context) => {
  ctx.body = 'Cron Commerce Core'
})
 
app
.use(logger('dev'))
.use(router.routes())
.use(router.allowedMethods())
.listen(port)

serveGraphql(app)
initTypeorm()
