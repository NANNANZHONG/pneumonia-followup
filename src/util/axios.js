import axios from 'axios'
import { router } from '@/router';

const instance = axios.create({
  timeout: 60000,
  baseURL: 'http://120.55.50.132:9096/'
})

instance.interceptors.response.use(res => {
  const { data } = res
  return Promise.resolve(data)
}, () => {
  router.push('/error')
})

export default {
  install: (Vue) => {
    Object.defineProperty(Vue.prototype, '$axios', { value: instance })
  }
}
