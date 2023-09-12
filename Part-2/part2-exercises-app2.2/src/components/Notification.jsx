const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='contactAdded'>
      {message}
    </div>
  )
}

export default Notification