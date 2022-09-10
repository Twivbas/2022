import Vue from 'vue'

Vue.filter('formatTime', function (value) {
  const nowTime = Date.now()
  const timeMinus = Math.ceil((nowTime - value) / 3600000)
  let r
  if (timeMinus < 24) {
    r = `${timeMinus}小时前`
  } else {
    const year = new Date(+value).getFullYear()
    const month = new Date(+value).getMonth() + 1
    const day = new Date(+value).getDate()
    r = `${year}-${month}-${day}`
  }
  return r
})

Vue.filter('htmlPaser', function (string) {
  
})