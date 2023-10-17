import { useState, useEffect } from 'react'

//import Persons from './components/Persons'
//import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personsTask from './services/persons'
import GoodNotification from './components/GoodNotification'
import BadNotification from './components/BadNotification'
import FilteredResults from './components/FilteredResults'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchPerson, setSearchPerson] = useState('')
  const [contactAddedMessage, setContactAddedMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)


  useEffect(() => {
    personsTask
      .getAll() //gets baseUrl (persons.js)
      .then(response => {
        console.log('promise fulfilled')
        console.log(response)

        setPersons(response.data)
      })
  }, []);  //remember useEffect takes in two params: the effect itself, and how often the effect is run
          //in this case, it is empty because we want in to only run along w/ the first render of the component
 console.log(persons)




  const deleteContactOf = id => {
    const contact = persons.find(p => p.id === id) //first find the contact that has the same id

    const confirm = window.confirm(`Are you sure you want to delete ${contact.name} ?`)

    if (confirm) {
      const updatedContacts = persons.filter(p => p.id !== id)

      personsTask
        .remove(id)
        .then (() => {
          setPersons(updatedContacts)
        })
    } else {
      //do nothing
    }
  }


  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }


  const replaceNumberOf = id => {
    const contact = persons.find(person => person.name === newName)
    const changedContact = {...contact, number: newNumber}

    personsTask
      .update(id, changedContact)
      .then(response => {
        setPersons(persons.map(p => p.id !== id ? p : response.data))
      })
      .catch(error => {
        setErrorMessage(
          `The information of ${newName} has already been removed from the server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 2000)
        setPersons(persons.filter(p => p.id != id))
      })
  }



  const addNewContact = (event) => {
    event.preventDefault()  //prevent from default reloading on submit

    if (persons.find(person => person.name === newName)) { 

      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const personFound = persons.find(person => person.name === newName)
        replaceNumberOf(personFound.id)
      }

    } else {
      const newContact = {
        //id: persons.length + 1,   (now, let's have the server generate our ids, instead!)
        name: newName,
        number: newNumber
      }

      //contacts are now saved to the backend server and rendered on the page
      personsTask
        .create(newContact)
        .then(response => {
          setContactAddedMessage(
            `Added ${newName}`
          )
          setPersons(persons.concat(response.data)) //we are concatenating the response data from server WITH the new added contact
          setNewName('')                            //effectively updating the entire persons array with the updated data
          setNewNumber('')
        })
        .catch(error => {
          console.log(error.response.data.error)
          setErrorMessage(error.response.data.error)

          setTimeout(() => {
            setErrorMessage(null)
          }, 2000)
        })

      
        setTimeout(() => {
          setContactAddedMessage(null)
        }, 2000)
    }
  }


  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  
  return (
    <div>
      <h2>Phonebook</h2>

      <GoodNotification message={contactAddedMessage} />
      <BadNotification message={errorMessage} />

      <Filter 
      searchValue={searchPerson} 
      onChangeSearch={event => setSearchPerson(event.target.value)}
      />

      <h3>add new contact</h3>


      <PersonForm 
      addNewContact={addNewContact} 
      newName={newName} 
      handleNameChange={handleNameChange}
      newNumber={newNumber}
      handleNumberChange={handleNumberChange}
      />
   
      <h2>Numbers</h2>

    
    <FilteredResults 
    persons={persons} 
    searchPerson={searchPerson} 
    deleteContactOf={deleteContactOf}
    />

    </div>
  )
}

export default App