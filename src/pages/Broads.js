import React, { useEffect, useState } from "react";
import { getBroads } from "../api";
import { Popover } from "antd";
import CreateBroad from "../components/CreateBroad";
import { Link } from "react-router-dom";

const Broads = () => {

  const [broads, setBroads] = useState([]);

  useEffect(() => {
    fetchBroads();
  }, []);

  const fetchBroads = async () => {
    const response = await getBroads();
    console.log(response)
    setBroads(response.broads || []);
  }

  
  return (
    <div className="page broads-page">
      <div className="broads-body">
        <div className="list-title">
          YOUR WORKSPACES
        </div>
        <div className="list-broad">
          {broads.map((broad, index) => {
            return (
              <Link 
                key={index}
                className="list-broad-item"
                to={`/broad/${broad._id}`}
              >
                {broad.title}
              </Link>
          )})}
          <Popover
              placement="rightTop"
              trigger={"click"}
              arrow={false}
              content={<CreateBroad />}
            >
            <div className="broad-list-create">
              <button>Create new broad</button>
            </div>
          </Popover>
        </div>
      </div>
    </div>
  );
}

export default Broads;