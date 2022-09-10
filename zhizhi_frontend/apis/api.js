import uniRequest from './request.js'

// url前面加/api

export const signup = (data) => uniRequest.post(`/signup`, data)  // 注册，微信小程序用不到
export const signin = (data) => uniRequest.post(`/signin`, data)  // 登录

export const login = (data) => uniRequest.post('/wxlogin', data)
export const askQuestion = (data) => uniRequest.post(`/ask`, data)
export const getQuestions = (data) => uniRequest.get(`/getQuestions`, data)
export const answerQuestion = (data) => uniRequest.post(`/answer`, data)
export const getAnswers = (question_id, answer_id, data) => uniRequest.get(`/getAnswers/${question_id}/${answer_id}`, data)
export const likeAnswer = (data) => uniRequest.put(`/like`, data)
// 回答按照赞数排序
export const sortAnswers = (question_id, data) => uniRequest.get(`/orderByLike/${question_id}`, data)
// 24小时内获得回答最多的问题热榜
export const getHotList = (data) => uniRequest.get(`/getHotList`, data)
export const editHotList = (data) => uniRequest.post(`/editHotList`, data)
// 封禁用户点赞或回答功能
export const banUser = (data) => uniRequest.put(`/banUser`, data)
export const delAnswer = (data) => uniRequest.delete(`/delAnswer/:answer_id`, data)
// 获取登录用户的数据
export const getUserData = data => uniRequest.get(`/getUserData`, data)