import { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/gql/queries";
import { InventoryList } from "../components";
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
  const inventory = data?.me?.inventory || [];
  console.log(inventory)

  // Dropdown active onclick
  const [activeDropdown, setActiveDropdown] = useState(null);
  const handleDropdownClick = (key) => {
    setActiveDropdown((prevKey) => (prevKey === key ? null : key));
  };

  // loading and errors
  if (loading) {
    return <div>Loading...</div>;
  } else if (data) {
    console.log(data);
  } else {
    console.log(JSON.parse(JSON.stringify(error)))
  }


  const callKey = (key) => {
    if (key === "weapon") {
      return (`Weapon: ${inventory.weapon.name}`)
    }
    else if (key === "armor"){
      return (`Armor: ${inventory.armor.name}`)
    }
    else if (key === "slot1"){
      return (`Slot1: ${inventory.slot1.name}`)
    }
    else if (key === "slot2"){
      return (`Slot2: ${inventory.slot2.name}`)
    }
    else if (key === "slot3"){
      return (`Slot3: ${inventory.slot3.name}`)
    }
    else if (key === "slot4"){
      return (`Slot4: ${inventory.slot4.name}`)
    }
  }

  return (
    <div>
    {Object.keys(inventory).map((key, index) => {
      if (index > 0 && index < 7) {
        return (
          <div className={`dropdown ${activeDropdown === key ? 'is-active' : ''}`} key={key._id}>
            <div className="dropdown-trigger">
              <button className="button" onClick={() => handleDropdownClick(key)}>
                <span>{callKey(key)}</span>
                <span className="icon is-small">
                  <i className="fas fa-angle-down" aria-hidden="true"></i>
                </span>
              </button>
            </div>
            <div className="dropdown-menu" id="dropdown-menu" role="menu">
              <div className="dropdown-content">
                {/* {inventory[key].map((item) => (
                  <a href="#" className="dropdown-item" key={item._id}>
                    <img src={item.icon} alt={item.name} width="32" height="32" /> {item.name}
                  </a>
                ))} */}
              </div>
            </div>
          </div>
        );
      }
      return null; 
    })}
    <div><InventoryList inventory={inventory} /></div>
  </div>
  );
}

export default Inventory;
