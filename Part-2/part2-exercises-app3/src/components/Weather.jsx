import { useEffect } from 'react'
import axios from 'axios'


const Weather = ({ country, weather, setWeather }) => {


  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${country[0].capital}&appid=${import.meta.env.VITE_OPEN_WEATHER_API}`)
      .then(response => {
        setWeather(response.data)
        console.log(response.data)
      })
  }, [])


  return (
    <>
      <h2>Weather in {country[0].capital}</h2>
      {weather ? (
        <>
          <div>Temperature: {((weather.main.temp - 273.15) * 9/5 + 32).toFixed(2)} Fahrenheit</div>
          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}></img>
        </>
      ) : (
        null
      )}
    </>
  )
}

export default Weather