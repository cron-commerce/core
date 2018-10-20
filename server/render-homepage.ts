import {Context} from 'koa'

export default () => async (ctx: Context, next: () => any) => {
  if (ctx.path === '/') {
    ctx.body = 'Cron Commerce Core'
  } else {
    await next()
  }
}
