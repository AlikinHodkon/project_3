/* eslint-disable react/prop-types */
import { useRef, useState } from "react"
import Modal from "react-modal";
import "../styles/Main.css"

Modal.setAppElement("#root");

export default function Navbar({changeCity, settings, setSettings, openSideBar}) {
  const inputCity = useRef(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [wind, setWind] = useState(localStorage.getItem('wind') === null ? "On" : localStorage.getItem('wind'));
  const [sun, setSun] = useState(localStorage.getItem('sun') === null ? "On" : localStorage.getItem('sun'));
  const [temp, setTemp] = useState(localStorage.getItem('temp') === null ? "On" : localStorage.getItem('temp')); 

  function changeWind(){
    if (wind === "On") {
      setWind("Off");
      localStorage.setItem('wind', 'Off')
    }else{
      setWind('On');
      localStorage.setItem('wind', 'On');
    }
  }

  function changeSun(){
    if (sun === "On") {
      setSun("Off");
      localStorage.setItem('sun', 'Off')
    }else{

      setSun('On');
      localStorage.setItem('sun', 'On');
    }
  }

  function changeTemp(){
    if (temp === "On") {
      setTemp("Off");
      localStorage.setItem('temp', 'Off')
    }else{
      setTemp('On');
      localStorage.setItem('temp', 'On');
    }
  }

  function handleKeyPressed(event){
    if (event.key === "Enter") {
      changeCity(inputCity.current.value); 
      inputCity.current.value="";
    }
  }

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const modalContent = (
    <div className="font-Mont flex flex-col items-center">
      <h2 className="text-center font-bold xl:text-[64px] md:text-[52px] text-[40px]">Settings</h2>
      <p className="text-center font-semibold xl:text-[32px] md:text-[26px] text-[20px]">Choose what kind of data do you want to display</p>
      <ul className="flex flex-col xl:text-[32px] mt-5 mb-5 md:text-[26px] text-[20px] font-semibold xl:w-1/2 w-full pl-3 xl:pl-0 xl:pr-0 pr-3">
        <li className="flex xl:justify-between justify-center items-center mb-2 p-1 xl:flex-row flex-col">Wind<button onClick={() => {setSettings({wind: !settings.wind, sun: settings.sun, temp: settings.temp}); localStorage.setItem('settingsWind', JSON.stringify(!settings.wind)); changeWind()}} className="border-black border-[2px] rounded-xl xl:w-[70px] w-1/2">{wind}</button></li>
        <li className="flex xl:justify-between justify-center items-center mb-2 p-1 xl:flex-row flex-col">Sunset & Sunrise<button onClick={() => {setSettings({wind: settings.wind, sun: !settings.sun, temp: settings.temp}); localStorage.setItem('settingsSun', JSON.stringify(!settings.sun)); changeSun()}} className="border-black border-[2px] rounded-xl xl:w-[70px] w-1/2">{sun}</button></li>
        <li className="flex xl:justify-between justify-center items-center mb-2 p-1 xl:flex-row flex-col">Temperature<button onClick={() => {setSettings({wind: settings.wind, sun: settings.sun, temp: !settings.temp}); localStorage.setItem('settingsTemp', JSON.stringify(!settings.temp)); changeTemp()}} className="border-black border-[2px] rounded-xl xl:w-[70px] w-1/2">{temp}</button></li>
      </ul>
      <button onClick={closeModal} className="border-[3px] p-1 border-black xl:text-[32px] md:text-[26px] text-[20px] font-semibold rounded-2xl">Close</button>
    </div>
  );
  return (
    <div className='flex max-h-[70px] text-white'>
        <ul className='flex w-full text-[14px] lg:text-[32px] xl:text-[24px] font-semibold font-Mont items-center justify-center'>
            <li className="xl:mr-auto md:mr-auto lg:ml-[5vw] xl:ml-[5vw] md:text-[32px] xl:text-[32px]">Your Weather</li>
            <li className="p-1 md:mr-[3vw] lg:mr-0 xl:mr-[5vw]"><input ref={inputCity} onKeyDownCapture={handleKeyPressed} type='text' className='h-1/2 outline-none bg-transparent text-[14px] md:min-w-[30vw] md:text-[32px] max-w-[100px] xl:min-w-[30vw] xl:text-[32px] search placeholder:text-white pl-4 md:pl-10 xl:pl-10' placeholder='Search City' /></li>
            {/* <li className="mr-[5vw]"><button className='border-[2px] rounded-xl p-1 border-white w-[6vw]'>Search</button></li> */}
            <li className="xl:mr-[5vw] mr-1 md:mr-2 lg:mr-5 h-full flex items-center lg:text-[32px] justify-center cursor-pointer text-[14px] md:text-[24px] hover:text-gray-700" onClick={() => {changeCity("")}}>Home</li>
            <li className="xl:mr-[5vw] mr-1 md:mr-2 h-full lg:mr-5 flex items-center lg:text-[32px] justify-center cursor-pointer text-[14px] md:text-[24px] hover:text-gray-700" onClick={() => {openSideBar()}}>Cities</li>
            <li onClick={openModal} className="xl:mr-[5vw] md:mr-2 lg:mr-5 md:text-[24px] lg:text-[32px] h-full flex items-center justify-center cursor-pointer hover:text-gray-700">Settings</li>
        </ul>
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>{modalContent}</Modal>
    </div>
  )
}
