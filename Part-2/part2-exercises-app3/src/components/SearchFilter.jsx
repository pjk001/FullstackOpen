const SearchFilter = ({ searchValue, handleSearchChange}) => {
  return (
    <p>Find countries <input className="searchCountry" value={searchValue} onChange={handleSearchChange}></input></p>
  )
}

export default SearchFilter