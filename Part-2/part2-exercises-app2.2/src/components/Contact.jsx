const Contact = ({contact, deleteContact}) => {
  return (
    <div>
      {contact.name} {contact.number} <button onClick={deleteContact}>delete</button>
    </div>
  )
}


export default Contact