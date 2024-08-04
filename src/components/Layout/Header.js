import React, { useEffect } from "react";
import { Popover } from "antd";
import CreateBroad from "../CreateBroad";
import { Link } from "react-router-dom";
import { useLocation  } from "react-router-dom";
import { useRouterContext } from "../../provider/router";

const Header = () => {

  const location = useLocation ();

  if (location.pathname === '/') {
    return (
      <header className="header header-home">
        <Link className="header-logo" to={'/'}>
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" role="img" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><title></title><path d="M21 0H3C1.343 0 0 1.343 0 3v18c0 1.656 1.343 3 3 3h18c1.656 0 3-1.344 3-3V3c0-1.657-1.344-3-3-3zM10.44 18.18c0 .795-.645 1.44-1.44 1.44H4.56c-.795 0-1.44-.646-1.44-1.44V4.56c0-.795.645-1.44 1.44-1.44H9c.795 0 1.44.645 1.44 1.44v13.62zm10.44-6c0 .794-.645 1.44-1.44 1.44H15c-.795 0-1.44-.646-1.44-1.44V4.56c0-.795.646-1.44 1.44-1.44h4.44c.795 0 1.44.645 1.44 1.44v7.62z"></path></svg>
          Trello clone
        </Link>
        <div className="flex gap-4">
          <Link className="header-item" to={'/login'}>
            Log in
          </Link>
          <Link className="header-item header-sign-up" to={'/register'}>
            Sign up
          </Link>
        </div>
      </header>
    );
  }

  return (
    <header className="header">
      <Link className="header-logo" to={'/'}>
        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" role="img" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><title></title><path d="M21 0H3C1.343 0 0 1.343 0 3v18c0 1.656 1.343 3 3 3h18c1.656 0 3-1.344 3-3V3c0-1.657-1.344-3-3-3zM10.44 18.18c0 .795-.645 1.44-1.44 1.44H4.56c-.795 0-1.44-.646-1.44-1.44V4.56c0-.795.645-1.44 1.44-1.44H9c.795 0 1.44.645 1.44 1.44v13.62zm10.44-6c0 .794-.645 1.44-1.44 1.44H15c-.795 0-1.44-.646-1.44-1.44V4.56c0-.795.646-1.44 1.44-1.44h4.44c.795 0 1.44.645 1.44 1.44v7.62z"></path></svg>
        Trello clone
      </Link>
      <Link className="header-item" to={'/'}>
        broads
      </Link>
      <Popover
        placement="bottomLeft"
        trigger={'click'}
        arrow={false}
        content={<CreateBroad />}
      >
        <div className="header-create">
          Create
        </div>
      </Popover>
      
    </header>
  );
}

export default Header;