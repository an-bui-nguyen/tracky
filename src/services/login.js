import axios from 'axios'

const baseUrl = 'http://localhost:3000'

const login = async (username, password) => {
  try {
    const response = await axios.post(baseUrl + '/api/users/login', { username, password })
    console.log(response.headers)
    return response.data
  } catch (error) {
    return error.response.data
  }
  // get jwt cookie from response data
}

const signup = async (name, username, password) => {
  try {
    const response = await axios.post(baseUrl + '/api/users/signup', { name, username, password })
    return response.data
  } catch (error) {
    return error.response.data
  }
}
export default { login, signup }