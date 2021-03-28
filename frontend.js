import axios from "axios";

// -- login
const {data} = await axios.post('/login', payload)
const token = data
localStorage.setItem('token', token)

// api

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config;
  }
)
axios.interceptors.response.use(
  (response => response),
  (error) => {
    if(error.response.data.status === 401 || 400) {
      localStorage.removeItem('token');
      window.location = '/';
    }
  }

  return config;
)
