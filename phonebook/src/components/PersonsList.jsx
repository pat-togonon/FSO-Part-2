const PersonsList = (props) => {
    
    return (
      <div>
        {props.persons.map(person => 
          <li key={person.id}>{person.name} {person.number} 
          <button onClick={() => props.onClick(person.id)}>delete</button></li>       
        )}
      </div>
    );
};

export default PersonsList; 