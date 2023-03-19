import { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/gql/queries";
import { InventoryList, UserCharacter } from "../components";
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
  console.log(inventory.bag)

  // Dropdown active onclick
  const [activeDropdown, setActiveDropdown] = useState(null);
  const handleDropdownClick = (key) => {
    setActiveDropdown((prevKey) => (prevKey === key ? null : key));
  };

  // Handle item selection
  const [selectedItem, setSelectedItem] = useState({

  });
  const handleItemClick = (item) => {
    setSelectedItem(item);
  };
  // const [userInfo, setUserInfo] = useState({});
console.log(data)
// Handle user info
// const newUserInfo = {
//   name: data.me.name,
//   gold: data.me.gold,
//   wins: data.me.wins,
//   deaths: data.me.deaths,
// };

// setUserInfo(newUserInfo);

// console.log({userInfo});
  // setUserCharacter(data.me);

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
    else if (key === "armor") {
      return (`Armor: ${inventory.armor.name}`)
    }
    else if (key === "slot1") {
      return (`Slot1: ${inventory.slot1.name}`)
    }
    else if (key === "slot2") {
      return (`Slot2: ${inventory.slot2.name}`)
    }
    else if (key === "slot3") {
      return (`Slot3: ${inventory.slot3.name}`)
    }
    else if (key === "slot4") {
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
                  {inventory.bag.map((item, i) => {
                    if (inventory.bag[i].itemtype === key) {
                      return (
                        <a href="#" className="dropdown-item" key={item.name} onClick={() => handleItemClick(item)}>
                          {item.icon}  {item.name}
                        </a>
                      );
                    } else {
                      return null;
                    }
                  })}
                </div>
              </div>
            </div>
          );
        }
        return null;
      })}
      <div className="columns">

      <div className="column is-three-fifths">
        <InventoryList data={data} />
      </div>

      <div className="column is-two-fifths">
        <UserCharacter data={data} />
      </div>
      
      </div>
    </div>
  );
}

export default Inventory;
