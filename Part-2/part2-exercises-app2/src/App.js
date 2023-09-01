import { useState } from 'react'

//import Contact from './components/Contact'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'


const App = (props) => {
  const [persons, setPersons] = useState(props.persons)
  


  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchPerson, setSearchPerson] = useState('')


  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }



  const addNewContact = (event) => {
    event.preventDefault()  //prevent from default reloading on submit

    //if we are able to find a person in the person array with the same name as the newName curr state
    //initiate window alert prohibiting addition of duplicate names
    if (persons.find(person => person.name === newName)) { 
      alert(`${newName} is already added to phonebook`)
    } else {
      const contact = {
        name: newName,
        id: persons.length + 1,
        number: newNumber
      }
  
      setPersons(persons.concat(contact))
      setNewName('')
      setNewNumber('')
    }
  }



  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  


  return (
    <div>
      <h2>Phonebook</h2>

      <Filter searchValue={searchPerson} onChangeSearch={event => setSearchPerson(event.target.value)}/>

      <h3>add new contact</h3>

    {/* contact input form */}
      <PersonForm 
      addNewContact={addNewContact} 
      newName={newName} 
      handleNameChange={handleNameChange}
      newNumber={newNumber}
      handleNumberChange={handleNumberChange}
      />
   
      <h2>Numbers</h2>

      <Persons persons={persons} searchPerson={searchPerson} />

    </div>
  )
}



export default App;
