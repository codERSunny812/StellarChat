import DashBoard from "./components/Home"
import Form from "./pages/Form"
import {Outlet, createBrowserRouter, useParams} from 'react-router-dom'
import Screen from "./pages/Screen"
import { useEffect, useState } from "react"
import AfterSplash from "./pages/AfterSplash"

export const App = () => {
  const [showSplash , setSplash] = useState(true);
  const {id} = useParams();
  console.log(id);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSplash(false); // Hide splash screen after timeout
    }, 2000); // 2000 milliseconds (2 seconds)

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

const router = createBrowserRouter([
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
]);

export default router;