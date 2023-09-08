const PersonForm = ({addNewContact, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return (
    <form onSubmit={addNewContact}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>

        <br/>

        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>

        <br/>
      {/* add the contacts onSubmit*/}
        <div>
          <button type="submit">add contact</button>
        </div>
      </form>

  )
}

export default PersonForm