import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import "./App.css"
import List from "./components/List.jsx"
import ListCity from './components/ListCity.jsx';

function App() {
  const [city, setCity] = useState("");
  const [cities, setCities] = useState([]);

  const cityInput = useRef(null);

  useEffect(() => {    
    const API_key = "3f0661a993a1df77691d6bc7819ae9ed";
    axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${API_key}`).then((response) => {
      setCities([...cities, {id: Date.now(), lat: response.data[0].lat, lon: response.data[0].lon }]) 
    })}, [city]);

  function handleButton(e){
    e.preventDefault();
    setCity(cityInput.current.value);
    cityInput.current.value = "";
  }

  function removeCity(city){
    setCities(cities.filter(c => c.id != city.id));
  }

  return(
    <div>
      <List />
      {cities.map((city) => <ListCity city={city} key={city.id} removeCity={removeCity} />)}
      <div className='flex flex-col items-center justify-center mt-2'>
        <input ref={cityInput} type='text' className='w-2/12 border-[2px] border-black' placeholder='City' />
        <button onClick={handleButton} className='border-[2px] border-black w-1/12 mt-2'>Add</button>
      </div>
    </div>
  )
}

export default App
