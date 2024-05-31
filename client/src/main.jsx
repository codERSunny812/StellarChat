
import ReactDOM from "react-dom/client";
import router from "./App.jsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import UserStatusContextProvider from "./Context/Auth.jsx";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <UserStatusContextProvider>
      <ToastContainer/>
      <RouterProvider router={router} />
    </UserStatusContextProvider>
  </>
);
