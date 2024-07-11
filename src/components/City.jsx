import { useEffect, useState } from "react"

/* eslint-disable react/prop-types */
export default function City({city, removeCity, changeCity, currentCity}) {
  const [current, setCurrent] = useState("");
  useEffect(() => {
    if (currentCity === city.name){
      setCurrent("text-gray-700")
    }else{
      setCurrent("");
    }
  },[currentCity])
  return (
    <div className="flex justify-between border border-white">
        <p className={`ml-5 text-[24px] ${current} hover:text-gray-700 cursor-pointer`} onClick={() => {changeCity(city.real_name)}}>{city.name}</p>
        <button className="mr-5 text-[24px] rounded-md h-5" onClick={() => {removeCity(city)}}><img className="max-h-10" src="./crossWhite.svg" alt="" /></button>
    </div>
  )
}
