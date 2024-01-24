import axios from 'axios'
const baseUrl = 'http://localhost:3000'

axios.defaults.withCredentials = true

const getTrackers = async () => {
  try {
    const response = await axios.get(baseUrl + '/api/trackers')
    return response.data
  } catch (error) {
    return error.response.data
  }
}

export default { getTrackers }