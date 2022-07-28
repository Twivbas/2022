// 定义接口参数和返回值的类型
interface IAdminLoginData {
  username: string
  password: string
}

type PromiseRes<T = {}> = Promise<IManageResult<T>>

interface IManageResult<T = {}> {
  code?: number
  errno?: number
  data: T
  // message: string
}
// 登录返回接口
interface IAdminLoginRes {
  token: string
  tokenHead: string
}
// 当前用户信息
interface AdminInfoRes {
  menus: []
}

interface AdminListParams {
  keyword: string
  pageNum: number
  pageSize: number
}