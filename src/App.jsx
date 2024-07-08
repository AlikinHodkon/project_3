import "./App.css"
import Main from './pages/Main.jsx';
import Navbar from './components/Navbar.jsx';
import Cities from "./pages/Cities.jsx";
import Error from "./pages/Error.jsx"
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [city, setCity] = useState("");
  const [position, setPosition] = useState(null);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      errorElement: <Error />,
    },
    {
      path: "/cities",
      element: <Cities />,
    }
  ])

  function changeCity(newCity){
    setCity(newCity);
  }

  useEffect(() => {    
    const API_key = "3f0661a993a1df77691d6bc7819ae9ed";
    axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${API_key}`).then((response) => {
      setPosition({lat: response.data[0].lat, lon: response.data[0].lon }) 
    })}, [city]);

  return(
    <div className="bg-cloudsAbove bg-cover min-h-[100vh] bg-no-repeat">
      <Navbar changeCity={changeCity} change />
      <Main position={position} />
    </div>
  )
}

export default App
