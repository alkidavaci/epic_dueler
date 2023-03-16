import { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/gql/queries";

const Inventory = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const profiles = data?.profiles || [];
  const inventory = profiles.inventory || [];

  if (loading) {
    return <div>Loading...</div>;
  } else {
    console.log(data);
  }

  return (
    <>
      {inventory.length > 0 &&
        inventory.map((elem) => (
          <div className="dropdown is-active" key={elem}>
            <div className="dropdown-trigger">
              <button
                className="button"
                aria-haspopup="true"
                aria-controls="dropdown-menu"
              >
                <span>{elem}</span>
              </button>
            </div>
            <div className="dropdown-menu" id="dropdown-menu" role="menu">
              <div className="dropdown-content">
                {elem.items &&
                  elem.items.map((item) => (
                    <a href="#" className="dropdown-item" key={item.id}>
                      {item.name}
                    </a>
                  ))}
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default Inventory;
