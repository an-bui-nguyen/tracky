const Tracker = (props) => {
  return (
    <div className="tracker">
      <h1>{props.name}</h1>
      <h2>{props.note}</h2>
      {props.options.map((option) => <p key={option.id}>{option.name}{option.entries.map(entry => <p>{entry.updatedAt}</p>)}</p>)}
    </div>
  )
}

export default Tracker