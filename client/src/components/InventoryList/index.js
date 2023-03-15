import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/gql/queries";

const SellItem = () => {
    
}
const InventoryList = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const profiles = data?.profiles || [];
  const inventory = profiles.inventory || [];

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="item-container">
      {inventory &&
        inventory.items.map((item) => (
          <ul>
            <li>
            <div className="item-icon">{item.icon}</div>
            <div className="item-name">{item.name}</div>
            <div className="item-value">{item.value}</div>
            <button onClick={SellItem} className="btn item-btn">Sell</button>
            </li>
          </ul>
        ))}
    </div>
  );
};

export default InventoryBar;
