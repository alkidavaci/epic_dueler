import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../utils/gql/queries";
import { UPDATE_INVENTORY } from '../utils/gql/mutations';
import { InventoryList, UserCharacter } from "../components";
import Auth from '../utils/Auth';
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
  const [equipItem, { error: equipError, data: equipData }] = useMutation(UPDATE_INVENTORY);
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
  const handleItemClick = async (item, slot) => {
    console.log(item._id, slot)
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      var action = 'equip';
      const { data } = await equipItem({
        variables: { itemId: item._id, action: action, slot: slot},
      });

    } catch (err) {
      console.error(JSON.parse(JSON.stringify(err)));
    }
    // setSelectedItem(item);
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
      return (`${inventory.weapon.icon} ${inventory.weapon.name}`)
    }
    else if (key === "armor") {
      return (`${inventory.armor.icon} ${inventory.armor.name}`)
    }
    else if (key === "slot1") {
      return (`${inventory.slot1.icon} ${inventory.slot1.name}`)
    }
    else if (key === "slot2") {
      return (`${inventory.slot2.icon} ${inventory.slot2.name}`)
    }
    else if (key === "slot3") {
      return (`${inventory.slot3.icon} ${inventory.slot3.name}`)
    }
    else if (key === "slot4") {
      return (`${inventory.slot4.icon} ${inventory.slot4.name}`)
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
                      console.log(key);
                      return (
                        <button className="dropdown-item" key={`${item.name}-${key}`} onClick={() => handleItemClick(item, key)}>
                          {item.icon}  {item.name}
                        </button>
                      );
                    } else if (inventory.bag[i].itemtype === 'trinket' && (key === 'slot1' || key === 'slot2' || key === 'slot3' || key === 'slot4')){
                      return (
                        <button className="dropdown-item" key={`${item.name}-${key}`} onClick={() => handleItemClick(item, key)}>
                          {item.icon}  {item.name}
                        </button>
                      );
                    } else {
                      return null;
                    };
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
