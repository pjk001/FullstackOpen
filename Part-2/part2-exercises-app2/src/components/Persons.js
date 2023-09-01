import Contact from '../components/Contact'

const Persons = ({persons, searchPerson}) => {
  return (
    <>
      {persons.filter(person => person.name.toLowerCase().includes(searchPerson)).map(person => (
        <Contact key={person.id} contact={person} />  //memorize this if you have to
      ))}
    </>
  )
}

export default Persons