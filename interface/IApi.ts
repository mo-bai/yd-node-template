import { IData } from './IData'
import type { users } from '@prismaClient/lib/index'
export interface IApi {
  getInfo: () => Promise<IData>
  getUsers: () => Promise<(Omit<users, 'id'> & { id: string })[]>
}
