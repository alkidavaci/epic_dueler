import { useMutation } from '@apollo/client';
import { UPDATE_INVENTORY } from "../../utils/gql/mutations";
import './style.css';

const SellItem = ({ itemId, inventoryId, itemValue }) => {
  const [updateInventory] = useMutation(UPDATE_INVENTORY, {
    variables: {
      id: inventoryId,
      gold: itemValue,
      itemId: itemId,
    },
  });

  const handleClick = () => {
    updateInventory();
  };

  return handleClick;
};

const InventoryList = ({ inventory }) => {
  return (

    <div className="item-container is-full columns">

      {inventory.map((item, index) => (
        <div className="column is-three-fifths">
          <section className="in-center ">
            <div className="container ">
              <ul className='is-full'>
                <li className='box'>
                  <div className="in-line level" >
                    <div className="level-left">
                      <div className="item-icon">{item.icon}</div>
                      <div className="item-name">{item.name}</div>
                      <div className="item-value">{item.value}</div>
                    </div>
                    <div className="level-right">
                      <button onClick={() => SellItem(item._d, inventory._id, item.value)} className="button is-primary is-medium">Sell</button>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </section>
        </div>
      ))
      }
      <div className='column is-two-fifths'>
        Charactery

      </div>
    </div>
  );
};

export default InventoryList;
{/* 
<div className="item-container is-full columns">
        <div className="column is-three-fifths">
          <section className="in-center ">
            <div className="container ">
              <ul className='is-full'>
                <li className='box'>
                  <div className="in-line level" >
                    <div className="level-left">
                      <div className="item-icon">🔪</div>
                      <div className="item-name">name</div>
                      <div className="item-value">value</div>
                    </div>

                    <div className="level-right">
                      <button className="button is-primary is-medium">Sell</button>
                    </div>
                  </div>
                </li>
                <li className='box'>
                  <div className="in-line level" >
                    <div className="level-left">
                      <div className="item-icon">🔪</div>
                      <div className="item-name">name</div>
                      <div className="item-value">value</div>
                    </div>

                    <div className="level-right">
                      <button className="button is-primary is-medium">Sell</button>
                    </div>
                  </div>
                </li>
                <li className='box'>
                  <div className="in-line level" >
                    <div className="level-left">
                      <div className="item-icon">🔪</div>
                      <div className="item-name">name</div>
                      <div className="item-value">value</div>
                    </div>

                    <div className="level-right">
                      <button className="button is-primary is-medium">Sell</button>
                    </div>
                  </div>
                </li>
                <li className='box'>
                  <div className="in-line level" >
                    <div className="level-left">
                      <div className="item-icon">🔪</div>
                      <div className="item-name">name</div>
                      <div className="item-value">value</div>
                    </div>

                    <div className="level-right">
                      <button className="button is-primary is-medium">Sell</button>
                    </div>
                  </div>
                </li>
                <li className='box'>
                  <div className="in-line level" >
                    <div className="level-left">
                      <div className="item-icon">🔪</div>
                      <div className="item-name">name</div>
                      <div className="item-value">value</div>
                    </div>

                    <div className="level-right">
                      <button className="button is-primary is-medium">Sell</button>
                    </div>
                  </div>
                </li>
                <li className='box'>
                  <div className="in-line level" >
                    <div className="level-left">
                      <div className="item-icon">🔪</div>
                      <div className="item-name">name</div>
                      <div className="item-value">value</div>
                    </div>

                    <div className="level-right">
                      <button className="button is-primary is-medium">Sell</button>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </section>
        </div>

        <div className='column is-two-fifths'>
          Charactery

        </div>
      </div> */}