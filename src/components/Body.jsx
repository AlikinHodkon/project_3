/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState, useRef  } from 'react'
import axios from 'axios'
import City from './City';
import "../styles/Main.css"

export default function Body({position, settings, changeCity, realCity, changeBg}) {
  const [data, setData] = useState(null);
  const [icon, setIcon] = useState(null);
  const [cities, setCities] = useState(JSON.parse(localStorage.getItem("cities")) !== null ? JSON.parse(localStorage.getItem("cities")) : []);
  const [staticCities, setStaticCities] = useState(JSON.parse(localStorage.getItem("cities")) !== null ? JSON.parse(localStorage.getItem("cities")) : []);
  const [inputSearch, setInputSearch] = useState("");
  const search = useRef(null);
  const wind = useRef(null);
  const sun = useRef(null);
  const temp = useRef(null);
  const h = new Date().getHours() - new Date().getUTCHours();

  useEffect(() => {
    const API_key = "3f0661a993a1df77691d6bc7819ae9ed";
    if (position === null){
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`).then((response) => {
          setData(response.data);
          setIcon("./"+response.data.weather[0].icon+".svg");
          changeBg("gif_"+response.data.weather[0].icon)
        })
      });
    }else{
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${position.lat}&lon=${position.lon}&appid=${API_key}`).then((response) => {
        setData(response.data);
        setIcon("./"+response.data.weather[0].icon+".svg");
        changeBg("gif_"+response.data.weather[0].icon)
        search.current.value = "";
        setInputSearch("");
        if (cities.filter((c) => (c.name === response.data.name)).length == 0) setCities([...cities, {id: Date.now(), real_name: realCity, name: response.data.name}])
        setStaticCities([...cities, {id: Date.now(), real_name: realCity, name: response.data.name}]);
        localStorage.setItem("cities", JSON.stringify([...cities, {id: Date.now(), real_name: realCity, name: response.data.name}]));
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
    if (settings.wind === true){
      wind.current.classList.remove('hidden');
    }else{
      wind.current.classList.add('hidden');
    }
  }, [settings.wind])

  useEffect(() => {
    if (settings.sun === true){
      sun.current.classList.remove('hidden');
    }else{
      sun.current.classList.add('hidden');
    }
  }, [settings.sun])

  useEffect(() => {
    if (settings.temp === true){
      temp.current.classList.remove('hidden');
    }else{
      temp.current.classList.add('hidden');
    } 
  }, [settings.temp])
  // bg-[#1B1B1D]
  return (
    <div className='flex flex-col xl:flex-row xl:min-h-[93vh] font-Mont text-white'>
        <div className='flex flex-col w-full'>
          <h1 className='xl:text-[64px] text-[24px] text-center font-bold'>Weather in {data?.name}</h1>
            <div className='flex flex-wrap xl:flex-row flex-col-reverse'>
              <div className='flex flex-col xl:w-[20vw] min-h-[15vh] xl:ml-[5vw] xl:mr-0 mr-5 ml-5 p-1 glass rounded-[15px] xl:h-[25vh] items-center justify-center glass'>
                <p className='xl:text-[40px] text-[30px] text-center'>{data?.name}</p>
                <p className='xl:text-[40px] text-[20px] text-center'>{data?.sys.country}</p>
              </div>
              <img className='xl:ml-auto xl:mr-[5vw] xl:min-w-[20vw] xl:max-h-[25vh] xl:object-contain object-contain h-[35vh]' src={icon}></img>
            </div> 
            <div className='min-w-[70vw] flex flex-wrap'>
              <div className='flex flex-col glass xl:w-[20vw] w-full ml-[5vw] min-h-[15vh] xl:mr-0 mr-5 mt-5 xl:h-[25vh] rounded-[15px] items-center justify-center'>
                <p className='xl:text-[40px] text-[30px] text-center'>{data?.weather[0].main}</p>
                <p className='xl:text-[20px] text-[20px] text-center'>{data?.weather[0].description}</p>
              </div>
              <div ref={wind} className='flex items-center justify-center flex-col ml-5 xl:mr-0 min-h-[15vh] mr-5 glass rounded-[15px] w-full xl:w-[20vw] xl:h-[25vh] mt-5 hidden'>
                <h3 className='xl:text-[40px] text-[30px]'>Wind</h3>
                <div className='flex xl:flex-col'>
                  <p className='xl:text-[20px] text-[20px] xl:mr-0 mr-1 text-center'>deg: {data?.wind.deg} </p>
                  <p className='xl:text-[20px] text-[20px] xl:mr-0 mr-1 text-center'>gust: {data?.wind.gust} </p>
                  <p className='xl:text-[20px] text-[20px] xl:mr-0 mr-1 text-center'>spd: {data?.wind.speed} m/s</p>
                </div>
              </div>
              <div ref={sun} className='flex items-center justify-center flex-col ml-5 xl:mr-0 min-h-[15vh] mr-5 glass rounded-[15px] w-full xl:w-[20vw] xl:h-[25vh] mt-5 hidden'> 
                <h3 className='xl:text-[40px] text-[30px]'>Sun</h3>
                <div className='flex flex-row'>
                  <div className='xl:text-[20px] text-[20px] text-center'>
                    <p>sunrise: {new Date(data?.sys.sunrise * 1000 + (h*60*60*1000)).toUTCString().slice(-12, -4)}</p>
                    <p>sunset: {new Date(data?.sys.sunset * 1000 + (h*60*60*1000)).toUTCString().slice(-12, -4)}</p>
                  </div>
                </div>
              </div>
            </div>
            <div ref={temp} className='flex flex-col ml-[5vw] mr-[5vw] mt-5 xl:mb-0 mb-5 xl:min-h-[25vh] min-h-[15vh] items-center justify-center glass rounded-[15px] hidden'>
              <h3 className='xl:text-[40px] text-[30px] text-center'>Temperature</h3>
              <div className='flex justify-center'>
                <p className='xl:text-[20px] text-[20px] text-center'>real: {(Math.round((data?.main.temp-273.15) * 100) / 100).toString()} </p>
                <p className='xl:text-[20px] text-[20px] text-center ml-2'>feels like: {(Math.round((data?.main.feels_like-273.15) * 100) / 100).toString()}</p>
              </div>
            </div>
        </div>
        <div id="sideBar" className='glass rounded-[15px] w-full max-h-[35vh] xl:w-2/12 xl:max-h-[93vh] text-white font-Mont overflow-auto hidden'>
          <input ref={search} onChange={() => {setInputSearch(search.current.value)}} className='pl-10 w-full glass outline-none search placeholder:text-white text-white text-[24px]' placeholder='Search City' />
          {cities.map((city) => <City city={city} removeCity={removeCity} changeCity={changeCity} key={city.id}/>)}
        </div>
    </div>
  )
}
