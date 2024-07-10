import { useEffect, useState, useRef  } from 'react'
import axios from 'axios'
import City from './City';
import "../styles/Main.css"

export default function Body({position, settings, changeCity, city}) {
  const [data, setData] = useState(null);
  const [icon, setIcon] = useState(null);
  const [cities, setCities] = useState([]);
  const [staticCities, setStaticCities] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const search = useRef(null);
  const wind = useRef(null);
  const sun = useRef(null);
  const temp = useRef(null);
  // JSON.parse(localStorage.getItem("cities"))
  // JSON.parse(localStorage.getItem("cities"))

  useEffect(() => {
    const API_key = "3f0661a993a1df77691d6bc7819ae9ed";
    if (position == null){
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`).then((response) => {
          setData(response.data);
          setIcon("./"+response.data.weather[0].icon+".svg");
        })
      });
    }else{
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${position.lat}&lon=${position.lon}&appid=${API_key}`).then((response) => {
        setData(response.data);
        setIcon("./"+response.data.weather[0].icon+".svg");
        search.current.value = "";
        setInputSearch("");
        if (cities.filter((c) => c.name == city).length == 0) setCities([...cities, {id: Date.now(), name: city}])
        setStaticCities([...cities, {id: Date.now(), name: city}]);
        localStorage.setItem("cities", JSON.stringify([...cities, {id: Date.now(), name: city}]));
        console.log(JSON.parse(localStorage.getItem("cities")));
      })
    }
  }, [position])

  useEffect(() => {
    if (search.current.value === "") setCities(staticCities);
    else setCities(staticCities.filter((c) => search.current.value === c.name.substring(0, search.current.value.length)));
  },[inputSearch])

  function removeCity(city){
    setCities(cities.filter((c) => c.id != city.id));
    localStorage.setItem("cities", JSON.stringify(cities.filter((c) => c.id != city.id)))
  }

  useEffect(() => {
    wind.current.classList.toggle('hidden');
  }, [settings.wind])

  useEffect(() => {
    sun.current.classList.toggle('hidden');
  }, [settings.sun])

  useEffect(() => {
    temp.current.classList.toggle('hidden'); 
  }, [settings.temp])

  return (
    <div className='flex flex-row min-h-[93vh] font-Roboto text-gray-300'>
        <div className='flex flex-col w-full'>
          <h1 className='text-[64px] text-center font-bold'>Weather in {data?.name}</h1>
            <div className='flex'>
              <div className='flex flex-col w-[20vw] ml-[5vw] glass h-[25vh] items-center justify-center'>
                <p className='text-[40px]'>{data?.name}</p>
                <p className='text-[40px]'>{data?.sys.country}</p>
              </div>
              <img className='ml-auto mr-[5vw] min-w-[20vw] max-h-[25vh] object-cover' src={icon}></img>
            </div> 
            <div className='min-w-[70vw] flex'>
              <div className='flex flex-col glass w-[20vw] ml-[5vw] mt-5 h-[25vh] items-center justify-center'>
                <p className='text-[40px]'>{data?.weather[0].main}</p>
                <p className='text-[20px]'>{data?.weather[0].description}</p>
              </div>
              <div ref={wind} className='flex items-center justify-center flex-col ml-2 glass w-[20vw] h-[25vh] mt-5 hidden'>
                <h3 className='text-[40px]'>Wind</h3>
                <div className='flex flex-row'>
                  <p className='text-[20px]'>{data?.wind.deg}</p>
                  <p className='text-[20px]'>{data?.wind.gust}</p>
                  <p className='text-[20px]'>{data?.wind.speed}</p>
                </div>
              </div>
              <div ref={sun} className='flex items-center justify-center flex-col ml-2 glass w-[20vw] h-[25vh] mt-5 hidden'> 
                <h3 className='text-[40px]'>Sun</h3>
                <div className='flex flex-row'>
                  <p className='text-[20px]'>{new Date(data?.sys.sunrise * 1000).toUTCString().slice(-12, -4)}</p>
                  <p className='text-[20px] ml-1'>{new Date(data?.sys.sunset * 1000).toUTCString().slice(-12, -4)}</p>
                </div>
              </div>
            </div>
            <div ref={temp} className='flex flex-col ml-[5vw] mr-[5vw] mt-5 min-h-[25vh] items-center justify-center glass hidden'>
              <h3 className='text-[40px] text-center'>Temperature</h3>
              <div className='flex justify-center'>
                <p className='text-[20px]'>{(Math.round((data?.main.temp-273.15) * 100) / 100).toString()}</p>
                <p className='text-[20px] ml-2'>{(Math.round((data?.main.feels_like-273.15) * 100) / 100).toString()}</p>
              </div>
            </div>
        </div>
        <div id="sideBar" className='bg-white w-2/12 max-h-[93vh] rounded-lg text-black font-Roboto overflow-overlay hidden'>
          <input ref={search} onChange={() => {setInputSearch(search.current.value)}} className='pl-5 w-full border border-black' placeholder='City' />
          {cities.map((city) => <City city={city} removeCity={removeCity} changeCity={changeCity} key={city.id}/>)}
        </div>
    </div>
  )
}
