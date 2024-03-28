import ReactDOM from "react-dom/client";
import router from "./App.jsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import UserStatusContextProvider from "./Context/Auth.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <UserStatusContextProvider>
      <RouterProvider router={router} />
    </UserStatusContextProvider>
  </>
);
