import DashBoard from "./components/Home";
import { Outlet, createBrowserRouter } from "react-router-dom";
import Screen from "./pages/Screen";
import { useEffect, useState } from "react";
import AfterSplash from "./pages/AfterSplash";
import LoginPage from "./pages/LoginPage";
import Registration from "./pages/Registration";

export const App = () => {
  const [showSplash, setSplash] = useState(true);


  useEffect(() => {
    const timer = setTimeout(() => {
      setSplash(false); // Hide splash screen after timeout
    }, 2000); // 2000 milliseconds (2 seconds)

    return () => clearTimeout(timer); // Clear the timer on component unmount
  }, []); // Run only once on component mount

  return <div className="">{showSplash ? <Screen /> : <Outlet />}</div>;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <AfterSplash />,
      },
      {
        path: "/home",
        element: <DashBoard />,
      },
      {
        path: "/register",
        element:<Registration/>,
      },
      {
        path: "/login",
        element:<LoginPage/>,
      },
    ],
  },
]);

export default router;
