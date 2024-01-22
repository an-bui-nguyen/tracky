import axios from 'axios'
import Cookies from 'js-cookie'
const baseUrl = 'http://localhost:3000'

axios.defaults.withCredentials = true

const getTrackers = async () => {
  try {
    console.log(Cookies.get('jwt'))
    const response = await axios.get(baseUrl + '/api/trackers')
    return response.data
  } catch (error) {
    return error.response.data
  }
}

export default { getTrackers }