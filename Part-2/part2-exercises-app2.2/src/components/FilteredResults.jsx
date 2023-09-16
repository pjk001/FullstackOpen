import Contact from '../components/Contact'

const FilteredResults = ({ persons, searchPerson, deleteContactOf}) => {
  return (
    <>
    {persons.filter(person => person.name.toLowerCase().includes(searchPerson.toLowerCase())).map(person => (
      <Contact key={person.id} contact={person} deleteContact={() => deleteContactOf(person.id)} />  //memorize this if you have to
    ))}
  </>
  )
}

export default FilteredResults