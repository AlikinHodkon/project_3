import "../styles/Main.css"
export default function Navbar() {
  return (
    <div className='flex w-full max-h-[70px] glass rounded-none bg-black text-white'>
        <ul className='flex w-full text-[24px] font-semibold font-Roboto items-center justify-center'>
            <li className="mr-auto ml-[5vw]">Your Weather</li>
            <li className="mr-[5vw] h-full"><a href="/" className="text-center">Home</a></li>
            <li className="mr-[5vw] h-full"><a href="/Cities" className="text-center">Cities</a></li>
            <li className="mr-[5vw] h-full"><a href="/seetings">Settings</a></li>
        </ul>
    </div>
  )
}
