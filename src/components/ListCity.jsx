import { useEffect, useState  } from 'react'
import axios from 'axios'
import "../styles/Main.css"

export default function ListCity({city, removeCity}) {
  const [data, setData] = useState(null);

  useEffect(() => {
      const API_key = "3f0661a993a1df77691d6bc7819ae9ed";
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${API_key}`).then((response) => {
        setData(response.data);
      }).catch(() => {console.log("gotSomeProblemList");})
    }, [])

  return (
    <div className='flex flex-col w-1/2 items-center justify-center glass mb-2 p-1'>
        <div className='flex items-center w-full justify-between'>
          <p className='text-[32px]'>{data?.name} {data?.sys.country}</p>
          <div className='flex flex-col ml-2 items-center'>
            <p className='text-[32px]'>{data?.weather[0].main}</p>
            <p className='text-[16px]'>{data?.weather[0].description}</p>
          </div>
          <div className='flex items-center flex-col ml-2'>
            <h3 className='text-[32px]'>Wind</h3>
            <div className='flex flex-row'>
              <p className='text-[16px]'>{data?.wind.deg}</p>
              <p className='text-[16px]'>{data?.wind.gust}</p>
              <p className='text-[16px]'>{data?.wind.speed}</p>
            </div>
          </div>
          <div className='flex items-center flex-col ml-2'> 
            <h3 className='text-[32px]'>Sun</h3>
            <div className='flex flex-row'>
              <p className='text-[16px]'>{new Date(data?.sys.sunrise * 1000).toUTCString().slice(-12, -4)}</p>
              <p className='text-[16px] ml-1'>{new Date(data?.sys.sunset * 1000).toUTCString().slice(-12, -4)}</p>
            </div>
          </div>
          <div className='flex flex-col ml-2'>
            <h3 className='text-[32px]'>Temperature</h3>
            <div className='flex justify-center'>
              <p className='text-[16px]'>{(Math.round((data?.main.temp-273.15) * 100) / 100).toString()}</p>
              <p className='text-[16px] ml-2'>{(Math.round((data?.main.feels_like-273.15) * 100) / 100).toString()}</p>
            </div>
          </div>
          <button className='border border-black text-[24px] rounded ml-5' onClick={() => {removeCity(city)}}>Delete</button>
        </div>
    </div>
  )
}
