import * as Koa from 'koa'
import * as logger from 'koa-logger'

import renderHomepage from './render-homepage'
import serveGraphql from './serve-graphql'
import initTypeorm from './init-typeorm'

const port = parseInt(process.env.PORT, 10)

const app = new Koa()

app
.use(logger('dev'))
.use(renderHomepage())
.listen(port)

initTypeorm()
serveGraphql(app)