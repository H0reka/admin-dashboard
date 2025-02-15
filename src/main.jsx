import { createContext, StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import Cookies from "js-cookie";

export const server = "https://api.horeka.app";
const initToken = Cookies.get("dev.admin.horeka");
export const Context = createContext({
  isAuthenticated: initToken ? true : false,
});

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    initToken ? true : false
  );
  return (
    <Context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <App />
    </Context.Provider>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>
);
