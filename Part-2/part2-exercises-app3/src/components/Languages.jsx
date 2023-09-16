const Languages = ({ country }) => {

  return (
    <>
      <h3>languages:</h3>

      <ul>
        {Object.values(country[0].languages).map((language,index) => {
          return <li key={index}>{language}</li>
        })}
      </ul>

    </>
   
  )
}

export default Languages