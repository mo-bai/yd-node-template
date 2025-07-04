import { addAliases } from 'module-alias'

addAliases({
  '@root': __dirname,
  '@interfaces': `${__dirname}/interfaces`,
  '@config': `${__dirname}/config`,
  '@middlewares': `${__dirname}/middlewares`,
  '@services': `${__dirname}/services`,
  '@routers': `${__dirname}/routers`,
  '@prismaClient': `${__dirname}/prismaClient`
})

import Koa from 'koa'
import { createContainer, Lifetime } from 'awilix'
import { loadControllers, scopePerRequest } from 'awilix-koa'
import render from 'koa-swig'
import co from 'co'
import config from '@config/index'
import serve from 'koa-static'
//koa中没有实现的路由重定向到index.html
import { historyApiFallback } from 'koa2-connect-history-api-fallback'
import { assertDatabaseConnection } from '@prismaClient/index'

const app = new Koa()
const container = createContainer()

const { port, viewDir, memoryFlag, staticDir } = config

app.use(serve(staticDir))
// 让所有service都注册到container中
container.loadModules([`${__dirname}/services/*.ts`], {
  formatName: 'camelCase',
  resolverOptions: {
    lifetime: Lifetime.SCOPED
  }
})

// 每一次用户请求 router 时，都会从容器中取到注入的服务
app.use(scopePerRequest(container))

app.context.render = co.wrap(
  render({
    root: viewDir,
    autoescape: true,
    cache: memoryFlag as 'memory' | false, // disable, set to false
    ext: 'html',
    writeBody: false
  })
)

app.use(historyApiFallback({ index: '/', whiteList: ['/api'] }))

// 让所有的路有都生效
app.use(loadControllers(`${__dirname}/routers/*.ts`))

app.listen(port, async () => {
  // 初始化就连接数据库，避免在第一次请求时连接数据库出错或延时
  await assertDatabaseConnection()
  console.log(`Server is running on http://localhost:${port}`)
})
