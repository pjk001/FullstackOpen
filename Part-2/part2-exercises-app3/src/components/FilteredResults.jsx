import Country from '../components/Country'


const FilteredResults = ({ country, searchValue, showCountryInfoOf}) => {
  return (
    <>
        {country
          .filter(country => country.name.common.toLowerCase().includes(searchValue.toLowerCase()))
          .map(country => (
            <Country key={country.name.common} country={country} showCountryInfo={() => showCountryInfoOf(country.name.common)} />
          ))}
      </>
  )
}

export default FilteredResults