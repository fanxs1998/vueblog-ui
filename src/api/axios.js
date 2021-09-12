import axios from "axios";
import Element from 'element-ui'
import router from '../router'
import store from '../store'

axios.defaults.baseURL = 'http://localhost:8088'
axios.defaults.timeout =10000

axios.interceptors.request.use(config => {
  return config
})

axios.interceptors.response.use(response => {
  let res = response.data

  if(res.code === 200) {
    return response
  } else {
    Element.Message.error(res.msg, {duration: 3* 1000})
    return Promise.reject(response.data.msg)
  }
},error => {
  console.log(error.response.data)
  if(error.response.data) {
    error.message = error.response.data.msg
  }
  // 根据请求状态觉得是否登录或者提示其他
  if (error.response.status === 401) {
    store.commit('REMOVE_INFO');
    router.push({
      path: '/login'
    });
    error.message = '请重新登录';
  }
  if (error.response.status === 403) {
    error.message = '权限不足，无法访问';
  }
  Element.Message({
    message: error.message,
    type: 'error',
    duration: 3 * 1000
  })
  return Promise.reject(error.message)
})