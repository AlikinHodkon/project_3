/* eslint-disable react/prop-types */
export default function City({city, removeCity, changeCity}) {
  return (
    <div className="flex justify-between border border-white">
        <p className="ml-5 text-[24px] cursor-pointer" onClick={() => {changeCity(city.name)}}>{city.name}</p>
        <button className="mr-5 text-[24px] rounded-md h-5" onClick={() => {removeCity(city)}}><img className="max-h-10" src="./crossWhite.svg" alt="" /></button>
    </div>
  )
}
