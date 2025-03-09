import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import PersonsList from './components/PersonsList';
import personService from './services/person';
import UpdateForm from './components/update';
import Notification from './components/Notification';
import ErrorNotification from './components/ErrorNotification';

const Header = (props) => <h2>{props.header}</h2>;

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchFor, setSearchFor] = useState('');
  const [filter, setFilter] = useState([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [nameToUpdate, setNameToUpdate] = useState('');
  const [numberToUpdate, setNumberToUpdate] = useState('');
  const [messageNotification, setMessageNotification] = useState(null);
  const [errorNotification, setErrorNotification] = useState(null);

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      })   
  }, []);


  const handleInputName = (event) => {
    setNewName(event.target.value);

  };

  const handleInputNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleNewPerson = (event) => {
    event.preventDefault();
    
    const addedName = newName;
    const addedNumber = newNumber;
    
    if (!addedName || !addedNumber) {
      setErrorNotification("Please enter both the person's name and contact number.");
      setTimeout(() => {
        setErrorNotification(null);
      }, 3000);
      
    } else {
      if (persons.map(person => person.name.toLowerCase()).includes(addedName.toLowerCase())) {
        let isConfirmedForUpdate = confirm(`${addedName} is already added to your phonebook. Do you want to update the contact number with a new one?`);

          if (isConfirmedForUpdate) {
            setShowUpdateForm(isConfirmedForUpdate);
            setNameToUpdate(addedName);
            
          } else {
            setMessageNotification(`No update has been made for ${addedName}.`);
            setTimeout(() => {
              setMessageNotification(null);
            }, 5000);
            
          }
    
      } else {
        const newPerson = {name: newName,
                         number: newNumber
                         };
        
        personService
          .create(newPerson)
          .then(returnedList => {
            setPersons(persons.concat(returnedList));
          });

          setMessageNotification(`${addedName} has been successfully added to your phonebook!`);
            setTimeout(() => {
              setMessageNotification(null);
            }, 5000);
                  
    }
  };

    setNewName('');
    setNewNumber('');     
    
  };

  const searchFilter = (event) => {
    setSearchFor(event.target.value);
  };

  const handleSearch = (event) => {
    
    const searchName = searchFor.toLowerCase();

    if(!searchFor) {
      setErrorNotification("Please enter your contact's name");
      setTimeout(() => {
        setErrorNotification(null);
      }, 3000);
      setFilter('');
    } else {        
      if (persons.map(person => person.name.toLowerCase()).includes(searchName)) {
        const filtered = persons.filter(person => (person.name.toLowerCase() === searchName));
        setFilter({ name: filtered[0].name,
                    number: filtered[0].number}); 
               
        setMessageNotification(`${filtered[0].name}'s contact is ${filtered[0].number}`);
        setTimeout(() => {
          setMessageNotification(null);
        }, 7000);
                     
      } else {
        setErrorNotification(`${searchFor} is not found.`);
        setTimeout(() => {
          setErrorNotification(null);
        }, 3000);
        setFilter('');
    };
  }
    
    setSearchFor('');

  };

  const handleDelete = (id) => {
    const personToDelete = persons.find(person => person.id === id);
    
    if (personToDelete) {
      let isConfirmed = confirm(`Delete ${personToDelete.name} ?`);
      
      if (isConfirmed) {
           
          personService
            .deletion(id)
            .then(returned => {
                  setMessageNotification(`${personToDelete.name}'s contact is deleted successfully.`);
                  setTimeout(() => {
                      setMessageNotification(null);
                   }, 5000);

                 setPersons(persons.filter(person => person.id !== returned.id));
              })
              .catch(error => {        
                 setErrorNotification(`${personToDelete.name} is already deleted from your phonebook.`);
                 setTimeout(() => {
                 setErrorNotification(null);
                }, 5000);
               })
        } else {
           setMessageNotification(`Delete request is cancelled. No changes made for ${personToDelete.name}`);
           setTimeout(() => {
             setMessageNotification(null);
            }, 5000);
        }     
    } 
      
};

  const handleUpdateNumber = (event) => {
    const updatedNumber = event.target.value;
    
    setNumberToUpdate(updatedNumber);
  };

  const handleUpdates = (event) => {
    event.preventDefault();
    
    if (!numberToUpdate) {    
        setErrorNotification("Please enter the updated number.");
        setTimeout(() => {
          setErrorNotification(null);
        }, 3000);
        
    } else {
       const person = persons.find(p => p.name === nameToUpdate);
       const updatedPerson = { ...person, number: numberToUpdate};
    
       personService
        .update(updatedPerson.id, updatedPerson)
        .then(returned => {
          setMessageNotification(`${updatedPerson.name}'s contact is updated successfully.`);
          setTimeout(() => {
            setMessageNotification(null);
          }, 5000);
          setPersons(persons.map(p => p.id === updatedPerson.id ? returned : p));
        })
        .catch(error => {
          setErrorNotification(`${nameToUpdate} is already deleted from your phonebook.`);
          setTimeout(() => {
          setErrorNotification(null);
          }, 3000);         
        });

      setNumberToUpdate('');
      setShowUpdateForm(!showUpdateForm); 
    }
   };

  return (
    <div>
      <Header header="Phonebook" />
      <Notification message={messageNotification} />
      <ErrorNotification message={errorNotification} />
      <Filter value={searchFor} onChange={searchFilter} onClick={handleSearch} />
                       
      {showUpdateForm 
      ? 
       <UpdateForm nameToUpdate={nameToUpdate} onUpdateNumber={handleUpdateNumber} onSubmit={handleUpdates} valueNumber={numberToUpdate} /> 
          
      : <PersonForm onSubmit={handleNewPerson} valueName={newName} onChangeName={handleInputName} onChangeNumber={handleInputNumber} valueNumber={newNumber} /> 
        
      }

      <Header header="Numbers" />
      <PersonsList persons={persons} onClick={handleDelete} />
    </div>
  );
};

export default App;