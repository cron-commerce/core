import * as Koa from 'koa'
import * as Router from 'koa-router'

import graphql from './graphql'
import initTypeorm from './init-typeorm'

const port = 3000

const app = new Koa()
const router = new Router()
 
router.get('/', (ctx: Koa.Context) => {
  ctx.body = 'Cron Commerce Core'
})

graphql(app)
 
app
.use(router.routes())
.use(router.allowedMethods())
.listen(port)

initTypeorm()
