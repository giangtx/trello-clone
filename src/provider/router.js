import { createContext, useContext, useEffect, useState } from "react";
import { getInfo } from "../api/auth";
import { useLocation } from "react-router-dom";

const RouterContext = createContext(null);

export const RouterProvider = ({ children }) => {

  const location = useLocation();

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    if (location.pathname === "/login" || location.pathname === "/register" || location.pathname === "/") {
      return;
    }
    try {
      const response = await getInfo();
      if (!response.id) {
        window.location.href = "/login";
        return;
      }
      setUser(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <RouterContext.Provider value={{
      user
    }}>
      {children}
    </RouterContext.Provider>
  )
};

export const useRouterContext = () => useContext(RouterContext);