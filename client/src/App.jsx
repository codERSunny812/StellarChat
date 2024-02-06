import DashBoard from "./components/Home"
import Form from "./pages/Form"
import {Outlet, createBrowserRouter} from 'react-router-dom'

const App = () => {
  return (
    <div className="">
      <Outlet/>
     
    </div>
  )
}

export default App

 export const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'/',
        element:<Form/>
      },{
        path:'/home',
        element:<DashBoard/>
      }
    ]
  }
])