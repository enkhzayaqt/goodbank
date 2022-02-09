export default function Card(props) {
  const headerClass = "card-header text-white bg-" + props.headerbg;
  const cardStyle = props.maxWidth
    ? { maxWidth: props.maxWidth }
    : { maxWidth: 500 };
  const classes = () => {
    const bg = props.bgcolor ? " bg-" + props.bgcolor : " ";
    const txt = props.txtcolor ? " text-" + props.txtcolor : " text-dark";
    return "card mb-3 shadow " + bg + txt;
  };

  return (
    <div className={classes()} style={cardStyle}>
      <div className={headerClass}>
        <h4>{props.header}</h4>
      </div>
      <div className="card-body">
        {props.title && <h5 className="card-title">{props.title}</h5>}
        {props.text && <p className="card-text">{props.text}</p>}
        {props.body}
        {props.status && <div id="createStatus">{props.status}</div>}
        {props.warn && (
          <div id="createStatus" style={{ color: "red" }}>
            {props.warn}
          </div>
        )}
      </div>
    </div>
  );
}
