import axios from 'axios'

const baseUrl = 'http://localhost:3000'

const login = async (username, password) => {
  const response = await axios.post(baseUrl + '/api/login', { username, password })
  // get jwt cookie from response data

  return response.data
}

export default { login }