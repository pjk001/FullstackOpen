import Header from '../components/Header'
import CapitalArea from '../components/CapitalArea'
import Languages from '../components/Languages'
import Flag from '../components/Flag'

const OneCountry = ({ countryInfo }) => {
  return (
    <>
      <Header header={countryInfo} />
      <CapitalArea capitalArea={countryInfo} />
      <Languages country={countryInfo} />
      <Flag country={countryInfo} />
  </>
  )
}

export default OneCountry