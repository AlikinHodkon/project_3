import { useRef, useState } from "react"
import Modal from "react-modal";
import "../styles/Main.css"

Modal.setAppElement("#root");

export default function Navbar({changeCity, settings, setSettings, openSideBar}) {
  const inputCity = useRef(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [wind, setWind] = useState("On");
  const [sun, setSun] = useState("On");
  const [temp, setTemp] = useState("On"); 

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const modalContent = (
    <div className="font-Robot flex flex-col items-center">
      <h2 className="text-center font-bold text-[64px]">Settings</h2>
      <p className="text-center font-semibold text-[32px]">Choose what kind of data do you want to display</p>
      <ul className="flex flex-col text-[32px] font-semibold w-1/2">
        <li className="flex justify-between mb-2 p-1">Wind<button onClick={() => {setSettings({wind: !settings.wind, sun: settings.sun, temp: settings.temp}); wind == "On" ? setWind("Off") : setWind("On")}} className="border-black border-[2px] rounded-xl w-[70px]">{wind}</button></li>
        <li className="flex justify-between mb-2 p-1">Sunset & Sunrise<button onClick={() => {setSettings({wind: settings.wind, sun: !settings.sun, temp: settings.temp}); sun == "On" ? setSun("Off") : setSun("On")}} className="border-black border-[2px] rounded-xl w-[70px]">{sun}</button></li>
        <li className="flex justify-between mb-2 p-1">Temperature<button onClick={() => {setSettings({wind: settings.wind, sun: settings.sun, temp: !settings.temp}); temp == "On" ? setTemp("Off") : setTemp("On")}} className="border-black border-[2px] rounded-xl w-[70px]">{temp}</button></li>
      </ul>
      <button onClick={closeModal} className="border-[3px] p-1 border-black text-[32px] font-semibold rounded-2xl">Close</button>
    </div>
  );
  return (
    <div className='flex w-full max-h-[70px] glass rounded-none bg-black text-white'>
        <ul className='flex w-full text-[24px] font-semibold font-Roboto items-center justify-center'>
            <li className="mr-auto ml-[5vw]">Your Weather</li>
            <li className="p-1 mr-[5vw]"><input ref={inputCity} type='text' className='h-1/2 p-15 border-[2px] border-grey rounded-2xl bg-transparent text-[32px] placeholder:text-white' placeholder='City' /></li>
            <li className="mr-[5vw]"><button onClick={() => {changeCity(inputCity.current.value); inputCity.current.value=""}} className='border-[2px] rounded-xl p-1 border-white w-[6vw]'>Search</button></li>
            <li className="mr-[5vw] h-full flex items-center justify-center cursor-pointer" onClick={() => {changeCity("")}}>Home</li>
            <li className="mr-[5vw] h-full flex items-center justify-center cursor-pointer" onClick={() => {openSideBar()}}>Cities</li>
            <li onClick={openModal} className="mr-[5vw] h-full flex items-center justify-center cursor-pointer">Settings</li>
        </ul>
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>{modalContent}</Modal>
    </div>
  )
}
