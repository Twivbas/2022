const host = `https://www.twivbas.com:8081`
// const host = 'https://localhost:8081'

// let baseUrl = `${host}/zhizhi`
let baseUrl = `${host}`

const Request = ({ url, method, data}) => {
  return new Promise(async (resolve, reject) => {
    let header = {}
    const access_token = uni.getStorageSync('access_token')
    if (access_token) {
      header = Object.assign({
        "Authorization": `Bearer ${access_token}`
      }, header)
    }
    const [err, res] = await uni.request({
    	url: `${baseUrl}${url}`,
    	method,
    	header,
    	data,
    })
    // console.log(err, res)
    
    // 简单处理版
    if (res.statusCode === 200) {
      resolve(res.data)
    } else {
      const msg = res.data.message || res.data
      reject(new Error(res.statusCode + ' ' + msg))
    }
  })
}

const uniRequest = {
  get(url, data = {}) {
    return Request({url, data, method: 'GET'})
  },
  post(url, data = {}) {
    return Request({url, data, method: 'POST'})
  },
  put(url, data = {}) {
    return Request({url, data, method: 'PUT'})
  },
  delete(url, data = {}) {
    return Request({url, data, method: 'DELETE'})
  }
}

export default uniRequest