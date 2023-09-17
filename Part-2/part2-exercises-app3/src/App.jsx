import { useState, useEffect } from 'react'
import countryTasks from './services/countries'
import OneCountry from './components/OneCountry'
import FilteredResults from './components/FilteredResults'
import SearchFilter from './components/SearchFilter'

//import axios from 'axios'


const App = () => {
  const [searchValue, setSearchValue] = useState('')
  const [country, setCountry] = useState([])
  const [countryInfo, setCountryInfo] = useState([])


  
  //need to utilize useEffect to fetch countries data
  useEffect(() => {
    countryTasks
      .getAll()
      .then(response => {
        setCountry(response.data) //setting immediately without creating copy of country array is specific to the context of useEffect
      })
  }, [])



  /*this is no longer needed...(at the moment)
  useEffect(() => { //this is to update the countryInfo state immediately whenever it is changed
    //console.log(countryInfo.length)
  }, [countryInfo])
  */
  


  const handleSearchChange = (event) => {
    setSearchValue(event.target.value)
    
    if (countryInfo.length === 0) {
      return
    } else {
      setCountryInfo([]) //whenever there is an object in countryInfo and the user begins searching again, set it back to empty
    }
  }
  


  const showCountryInfoOf = (countryName) => {

    const foundCountry = country.find(country => country.name.common === countryName)
    const updatedCountryInfo = [...countryInfo, foundCountry] //remember, always create a new copy before updating state besides useEffect (in certain situations)

    setCountryInfo(updatedCountryInfo)
  }
  


  const count = country.filter(country => 
    country.name.common.toLowerCase().includes(searchValue.toLowerCase())
    )


  //make the below into a component except for the country.filter part
  return (
    <>
    <SearchFilter searchValue={searchValue} handleSearchChange={handleSearchChange} />


    {searchValue === '' ? null : count.length > 10 ? (
      <p>Too many countries, specify another filter</p>

    ) : count.length !== 1 && countryInfo.length !== 0 ? (

      <OneCountry countryInfo={countryInfo} />

    ) : count.length === 1 ? (

      <OneCountry countryInfo={count} />

    ) : (

       <FilteredResults 
        country={country} 
        searchValue={searchValue} 
        showCountryInfoOf={showCountryInfoOf}
        />
  
    )}
  </>
  )
}

export default App
