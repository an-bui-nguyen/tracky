import CalHeatmap from "cal-heatmap"
import 'cal-heatmap/cal-heatmap.css'
import Tooltip from 'cal-heatmap/plugins/Tooltip';

const Cal = () => {
  const cal = new CalHeatmap()

  console.log('hehe')

  cal.paint({ range: 1,
              domain: { type: 'month', sort: 'asc' },
              subDomain: { type: 'xDay', date: '%Y-%m-%d' },
              rowLimit: 3,
            })

  return (
    <div id='cal-heatmap'></div>
  )
}

const Options = (props) => {
  return(
    <div>
      <h3>{props.name}</h3>
      <div>
        {props.entries.map((entry) => <p key={entry.id}>{entry.updatedAt}</p>)}
      </div>
    </div>
  )
}

const Tracker = (props) => {
  return (
      <div className="tracker">
      <h1>{props.name}</h1>
      <h2>{props.note}</h2>
      {props.options.map((option) => <Options key={option.id} name={option.name} entries={option.entries} />)}
    </div>
  )
}

export default Tracker