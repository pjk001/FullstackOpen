/*
import Contact from '../components/Contact'
import { persons, setPersons } from '../App'

const deleteContactOf = id => {
  //const contact = persons.find(p => p.id === id)
  const updatedContacts = persons.filter(p => p.id !== id)
  setPersons(updatedContacts)
}


const Persons = ({persons, searchPerson}) => {
  return (
    <>
      {persons.filter(person => person.name.toLowerCase().includes(searchPerson.toLowerCase())).map(person => (
        <Contact key={person.id} contact={person} deleteContact={() => deleteContactOf(person.id)} />  //memorize this if you have to
      ))}
    </>
  )
}

export default Persons
*/