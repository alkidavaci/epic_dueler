import { useMutation } from '@apollo/client';
import { UPDATE_INVENTORY } from "../../utils/gql/mutations";

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

  return handleClick ;
};

const InventoryList = ({ inventory }) => {
  return (
    <div className="item-container">
      {inventory.map((item) => (
        <ul>
          <li>
            <div className="item-icon">{item.icon}</div>
            <div className="item-name">{item.name}</div>
            <div className="item-value">{item.value}</div>
            <button onClick={() => SellItem(item._id, inventory._id, item.value)} className="btn item-btn">Sell</button>
          </li>
        </ul>
      ))}
    </div>
  );
};

export default InventoryList;
