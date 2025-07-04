import { PrismaClient } from './lib'
import { readReplicas } from '@prisma/extension-read-replicas'

// 使用读写分离的prisma实例, 单例模式
export const prisma = new PrismaClient().$extends(
  readReplicas({
    url: process.env.DATABASE_URL_REPLICA
  })
)

// 服务启动时主动连接数据库
export async function assertDatabaseConnection() {
  try {
    await prisma.$connect()
    console.log('数据库连接成功')
  } catch (err) {
    console.error('数据库连接失败:', err)
    process.exit(1)
  }
}
