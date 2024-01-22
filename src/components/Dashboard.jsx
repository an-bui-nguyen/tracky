import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import trackerService from '../services/trackers'

const Dashboard = () => {
  useEffect(() => {
    const getTrackers = async () => {
      const trackers = await trackerService.getTrackers()
      console.log(trackers)
    }

    getTrackers()
  }, [])

  return (
    <>
      <div className="px-4 py-5 my-5 text-start display-5">
        <h1 className="display-5 fw-bold text-body-emphasis">Dashboard</h1>
      </div>
    </>
  )
}

export default Dashboard