const Filter = ({searchValue, onChangeSearch}) => {
  return (
    <div>
        find contact: <input value={searchValue} onChange={onChangeSearch}/>
    </div>
  )
}

export default Filter