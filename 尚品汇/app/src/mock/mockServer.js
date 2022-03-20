import Mock from 'mockjs'

// JSON数据格式默认没有对外暴露，但可以引入
// webpack默认对外暴露图片、JSON数据
import banner from './banner'
import floor from './floor'

// mock数据参数：（请求地址，请求数据）
Mock.mock('/mock/banner', {code: 200, data: banner})
Mock.mock('/mock/floor', {code: 200, data: floor})