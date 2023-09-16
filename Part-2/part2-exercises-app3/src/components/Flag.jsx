const Flag = ({ country }) => {
  return (
    <>
      <img className="flag-border" src={country[0].flags.png} width="170"></img>
    </>
  )
}

export default Flag