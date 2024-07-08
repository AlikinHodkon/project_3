import { useRef } from "react"
import "../styles/Main.css"
export default function Navbar({changeCity}) {
  const inputCity = useRef(null);
  return (
    <div className='flex w-full max-h-[70px] glass rounded-none bg-black text-white'>
        <ul className='flex w-full text-[24px] font-semibold font-Roboto items-center justify-center'>
            <li className="mr-auto ml-[5vw]">Your Weather</li>
            <li className="p-1 mr-[5vw]"><input ref={inputCity} type='text' className='h-1/2 p-15 border-[2px] border-grey rounded-2xl bg-transparent text-[32px] placeholder:text-white' placeholder='City' /></li>
            <li className="mr-[5vw]"><button onClick={() => {changeCity(inputCity.current.value); inputCity.current.value=""}} className='border-[2px] rounded-xl p-1 border-white w-[6vw]'>Search</button></li>
            <li className="mr-[5vw] h-full flex items-center justify-center"><a href="/" className="text-center">Home</a></li>
            <li className="mr-[5vw] h-full flex items-center justify-center"><a href="/Cities" className="text-center">Cities</a></li>
            <li className="mr-[5vw] h-full flex items-center justify-center"><a href="/seetings">Settings</a></li>
        </ul>
    </div>
  )
}
