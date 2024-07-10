import Body from "../components/Body";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Main() {
    const [city, setCity] = useState("");
    const [position, setPosition] = useState(null);
    const [settings, setSettings] = useState({
        wind: JSON.parse(localStorage.getItem('settingsWind')) === null ? true : JSON.parse(localStorage.getItem('settingsWind')), 
        sun: JSON.parse(localStorage.getItem('settingsSun')) === null ? true : JSON.parse(localStorage.getItem('settingsSun')), 
        temp: JSON.parse(localStorage.getItem('settingsTemp')) === null ? true : JSON.parse(localStorage.getItem('settingsTemp'))
    })

    function openSideBar(){
        document.getElementById("sideBar").classList.toggle('hidden');
    }

    function changeCity(newCity){
        setCity(newCity);
    }

    useEffect(() => {
        if (city == "") {setPosition(null); return;}    
        const API_key = "3f0661a993a1df77691d6bc7819ae9ed";
        axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${API_key}`).then((response) => {
        setPosition({lat: response.data[0].lat, lon: response.data[0].lon }) 
    })}, [city]);

    return (
        <div>
            <Navbar changeCity={changeCity} settings={settings} setSettings={setSettings} openSideBar={openSideBar} />
            <Body position={position} settings={settings} changeCity={changeCity} />
        </div>
  )
}
