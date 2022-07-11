export interface ListInt {
  id: number,
  nickName: string,
  role: RoleInt[],
  userName: string
}

interface RoleInt {
  role: number,
  roleName: string
}

interface RoleListInt {
  authority: number[],
  roleId: number,
  roleName: string
}

interface SelectDataInt {
  role: number,
  nickName: string
}

interface ActiveInt {
  id: number,
  nickName: string,
  role: number[],
  userName: string 
}

export class InitData {
  selectData: SelectDataInt = {
    nickName: '',
    role: 0
  }
  list: ListInt[] = []  // 用来接收用户信息列表
  roleList: RoleListInt[] = [] // 用来接收角色列表
  isShow = false
  active: ActiveInt = {   // 选中的对象
    id: 0,
    nickName: '',
    role: [],
    userName: ''
  }
}