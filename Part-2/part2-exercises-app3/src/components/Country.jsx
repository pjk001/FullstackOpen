const Country = ({ country, showCountryInfo }) => {
  return (
    <div>{country.name.common}<button className="showButton" onClick={showCountryInfo}>show</button></div>
  )
}

export default Country