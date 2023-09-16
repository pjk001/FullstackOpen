import axios from 'axios'



const Weather = ({ lat, lon }) => {
  axios
    .get('https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid={}')
}

export default Weather