import { GET, route } from 'awilix-koa'
import { Context } from '@interfaces/IKoa'

@route('/')
export default class IndexController {
  @GET()
  async actionList(ctx: Context) {
    const data = await ctx.render('index', {
      data: '服务端数据'
    })
    ctx.body = data
  }
}
