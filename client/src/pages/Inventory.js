import { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/gql/queries";
// import { InventoryList } from "../components";
// const [selectedItem, setSelectedItem] = useState({
//   item: {
//     _id: '',
//     name: '',
//     icon: '',
//     price: '',
//     value: '',
//     description: ''
//   }
// });

const Inventory = () => {
  const { loading, data, error } = useQuery(QUERY_ME);
  const profile = data?.me || [];
  const inventory = profile.inventory || [];
  console.log(inventory.weapon)
  // const inventory ={
  //   weapon: {
  //     name: "Knife",
  //     icon: "🔪",
  //     itemtype: "weapon",
  //     price: 50,
  //     value: "range.2",
  //     description: "A short bladed weapon. Damage: 1-6"
  // }
  // }
  if (loading) {
    return <div>Loading...</div>;
  } else if (data) {
    console.log(data);
  } else {
    console.log(JSON.parse(JSON.stringify(error)))
  }

  return (
    <>
      <div>
        {inventory.length > 0 &&
          inventory.map((elem) => (
            <div className="dropdown is-active" >
              <div className="dropdown-trigger">
                <button
                  className="button"
                  aria-haspopup="true"
                  aria-controls="dropdown-menu"
                >
                </button>
              </div>
              <div className="dropdown-menu" id="dropdown-menu" role="menu">
                <div className="dropdown-content">
                      <a href="#" className="dropdown-item" key={elem}>
                        {elem.name}
                      </a>
                  <span>{elem.icon}</span>
                    
                </div>
              </div>
            </div>
          ))}
      </div>
      {/* <div><InventoryList /></div> */}
    </>
  );
};

export default Inventory;
