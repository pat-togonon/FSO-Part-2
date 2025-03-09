const TwoToTen = (props) => {
  
  if (props.array === null) {
    return null;
  }
    return (
        <div>
            {props.array.map(a => <li key={a.name.common}>{a.name.common} <button onClick={() => props.onClick(a.name.common)}>Show</button></li>)}
        </div>
    );
};

export default TwoToTen;