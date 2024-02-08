import DashBoard from "./components/Home"
import Form from "./pages/Form"
import {Outlet, createBrowserRouter} from 'react-router-dom'
import Screen from "./pages/Screen"
import { useEffect, useState } from "react"
import AfterSplash from "./pages/AfterSplash"

const App = () => {
  const [showSplash , setSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSplash(false); // Hide splash screen after timeout
    }, 3000); // 3000 milliseconds (3 seconds)

    return () => clearTimeout(timer); // Clear the timer on component unmount
  }, []); // Run only once on component mount


  return (
    <div className="">
      {showSplash ? (
        <Screen />
      ) : (
        <Outlet />
      )}
     
    </div>
  )
}

export default App;

 export const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
     children: [
       {
        path: '/',
        element: <AfterSplash />,
       },
       {
        path: '/home',
        element: <DashBoard />,
       },
       {
        path:'/createaccount',
        element:<Form/>
       }
     ],
  }
])