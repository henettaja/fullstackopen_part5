import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null;
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const saveBlog = (newBlog) => {
  const request = axios.post(baseUrl, newBlog, { headers: { Authorization: token } })
  return request.then(response => response.data)
}

const setToken = (newToken) => {
    token = `Bearer ${newToken}`
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, saveBlog, setToken }
