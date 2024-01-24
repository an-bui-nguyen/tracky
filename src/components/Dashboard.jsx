import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import trackerService from '../services/trackers'
import Tracker from './Tracker'

const Dashboard = () => {
  const [trackers, setTrackers] = useState([])
  useEffect(() => {
    const getTrackers = async () => {
      const trackers = await trackerService.getTrackers()
      console.log(trackers)
      setTrackers(trackers)
    }

    getTrackers()
  }, [])

  return (
    <>
      <div className="px-4 py-5 my-5 text-center col-12">
        <h1 className="display-5 fw-bold text-body-emphasis lead mb-4">Dashboard</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
          {trackers.map((tracker) => <Tracker key={tracker.id} name={tracker.name} note={tracker.note} options={tracker.options} />)}
        </div>
      </div>
    </>
  )
}

export default Dashboard