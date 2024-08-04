import { useEffect } from "react";
import { RouterProvider, useRouterContext } from "../../provider/router";
import Header from "./Header";
import { Outlet } from 'react-router-dom';

const Layout = ({ children, isDark }) => {
  const { user } = useRouterContext();

  useEffect(() => {
    console.log(user)
  }, [user]);
  return (
    <div className={`page-content ${isDark ? 'dark': ''}`}>
      <Header />
      <Outlet />
    </div>
  );
};

const LayoutWithRouter = () => {
  return (
    <RouterProvider>
      <Layout />
    </RouterProvider>
  );
};

export default LayoutWithRouter;