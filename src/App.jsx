import "./App.css"
import Main from './pages/Main.jsx';
import Error from "./pages/Error.jsx"
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {

  const router = createBrowserRouter([
    {
      path: "/project_3/",
      element: <Main />,
      errorElement: <Error />,
    }
  ])
  // bg-[#111015] 
  return(
    <div className="bg-cover gif min-h-[100vh] bg-no-repeat">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
