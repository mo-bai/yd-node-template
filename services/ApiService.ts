import { IApi } from '@interfaces/IApi'
import { IData } from '@interfaces/IData'
import { prisma } from '@prismaClient/index'

class ApiService implements IApi {
  getInfo() {
    return new Promise<IData>((resolve) => {
      resolve({
        item: '后台数据',
        result: [1, 'next']
      })
    })
  }
  async getUsers() {
    const users = await prisma.users.findMany()
    return users.map((user) => ({
      ...user,
      id: user.id.toString()
    }))
  }
}

export default ApiService
