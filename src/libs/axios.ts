import axios from 'axios'
import cookies from './cookies'

const api = axios.create({baseURL: 'http://192.168.15.50:3333'})

api.defaults.headers.common = {'Authorization': `Bearer ${cookies.get('token')}`}

export default api