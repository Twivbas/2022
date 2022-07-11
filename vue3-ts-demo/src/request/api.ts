import service from './index'
import { LoginFormInt } from '@/type/login'

export const login = (data:LoginFormInt) => {
  return service({
    url: '/login',
    method: 'post',
    data
  })
}

export const getGoodsList = () => {
  return service({
    url: '/getGoodsList',
    method: 'get'
  })
}

export const getUserList = () => {
  return service({
    url: '/getUserList',
    method: 'get'
  })
}

export const getRoleList = () => {
  return service({
    url: '/getRoleList',
    method: 'get'
  })
}

export const getAuthorityList = () => {
  return service({
    url: '/getAuthorityList',
    method: 'get'
  })
}
