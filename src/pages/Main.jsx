import { useEffect, useState  } from 'react'
import axios from 'axios'
import "../styles/Main.css"

export default function Main() {
  const [data, setData] = useState(null);
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const API_key = "3f0661a993a1df77691d6bc7819ae9ed";
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`).then((response) => {
        setData(response.data);
        setIcon("./"+response.data.weather[0].icon+".svg");
        console.log(response.data);
      })
    });
  }, [])

  return (
    <div className='flex flex-col min-h-[93vh] font-Roboto'>
        <h1 className='text-[64px] text-center font-bold'>Weather in your location</h1>
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
            <div className='flex items-center justify-center flex-col ml-2 glass w-[20vw] h-[25vh] mt-5'>
              <h3 className='text-[40px]'>Wind</h3>
              <div className='flex flex-row'>
                <p className='text-[20px]'>{data?.wind.deg}</p>
                <p className='text-[20px]'>{data?.wind.gust}</p>
                <p className='text-[20px]'>{data?.wind.speed}</p>
              </div>
            </div>
            <div className='flex items-center justify-center flex-col ml-2 glass w-[20vw] h-[25vh] mt-5'> 
              <h3 className='text-[40px]'>Sun</h3>
              <div className='flex flex-row'>
                <p className='text-[20px]'>{new Date(data?.sys.sunrise * 1000).toUTCString().slice(-12, -4)}</p>
                <p className='text-[20px] ml-1'>{new Date(data?.sys.sunset * 1000).toUTCString().slice(-12, -4)}</p>
              </div>
            </div>
          </div>
          <div className='flex flex-col ml-[5vw] mr-[5vw] mt-5 min-h-[25vh] items-center justify-center glass'>
            <h3 className='text-[40px] text-center'>Temperature</h3>
            <div className='flex justify-center'>
              <p className='text-[20px]'>{(Math.round((data?.main.temp-273.15) * 100) / 100).toString()}</p>
              <p className='text-[20px] ml-2'>{(Math.round((data?.main.feels_like-273.15) * 100) / 100).toString()}</p>
            </div>
          </div>
      </div>
  )
}
