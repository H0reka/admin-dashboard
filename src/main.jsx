import { createContext, StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import Cookies from "js-cookie";

export const server = "15.206.209.231:8080";
// const initToken = Cookies.get("dev.admin.horeka");
const initToken = "eyJhbGciOiJIUzUxMiJ9.eyJlbWFpbF9pZCI6ImhhcnNoMThscHNAZ21haWwuY29tIiwiYWNjZXNzX3R5cGUiOiJBRE1JTiIsImlzVmVyaWZpZWQiOiJ0cnVlIiwibW9iaWxlX25vIjoiKzkxOTY1NDYzMzc1NiIsIm5hbWUiOiJIYXJzaCBBZ2Fyd2FsIiwiaWQiOiIyMTAiLCJzdWIiOiIrOTE5NjU0NjMzNzU2IiwiaWF0IjoxNzM3MDMxOTg2LCJleHAiOjE3Njg1Njc5ODZ9.auKX7ukFfPgDdjh7yx8mCk2YKWkk_IizogDd0rI99Q63gykR39N7pBFZ-gHPXDOEh0zT5yHiqzfUm9mkOgQXPg";
Cookies.set("dev.admin.horeka", initToken);
export const Context = createContext({ isAuthenticated: initToken?true:false});

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(initToken?true:false);
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
