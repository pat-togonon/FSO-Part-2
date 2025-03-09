const Filter = (props) => {

    return (
      <div>
        <div>
          search for <input value={props.value} onChange={props.onChange} />
        </div>
        <button onClick={props.onClick}>search now</button>
        
      </div>
    );


};

export default Filter;