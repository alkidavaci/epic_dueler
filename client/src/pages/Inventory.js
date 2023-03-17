import { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/gql/queries";

const Inventory = () => {
  const { loading, data: dateInv, error:errorInv } = useQuery(QUERY_ME);
  const userInv = dateInv?.me || [];
  const inventory = userInv.character.inventory || [];
console.log(dateInv)
  if (loading) {
    return <div>Loading...</div>;
  } else if (dateInv) { 
    console.log(dateInv);
  }else {
    console.log(JSON.parse(JSON.stringify(errorInv)))
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
