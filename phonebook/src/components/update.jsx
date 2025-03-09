const UpdateForm = (props) => {

    return (
        <div>
          <h2>update {props.nameToUpdate}'s contact number</h2>
          <form onSubmit={props.onSubmit}>
            <div>
              enter updated number: <input value={props.valueNumber} onChange={props.onUpdateNumber} />
            </div>
            <div>
              <button type="submit">update</button>
            </div>
          </form>
        </div>
    );

};

export default UpdateForm;