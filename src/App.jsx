import "./App.css"
import Main from './pages/Main.jsx';
import Navbar from './components/Navbar.jsx';
import Cities from "./pages/Cities.jsx";
import Error from "./pages/Error.jsx"
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {

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

  return(
    <div className="bg-cloudsAbove bg-cover min-h-[100vh] bg-no-repeat">
      <Navbar />
      <RouterProvider router={router} />
    </div>
  )
}

export default App
