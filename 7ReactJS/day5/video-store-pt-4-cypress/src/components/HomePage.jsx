import { useOutletContext } from "react-router-dom";
import InventoryItem from "./InventoryItem";

export default function HomePage() {
  const { inventory } = useOutletContext();

  return (
    <div className="page-container">
      <h2>Inventory</h2>
      <div className="section-container">
        {inventory.map((inventoryItem) => (
          <InventoryItem key={inventoryItem.id} id={inventoryItem.id} />
        ))}
      </div>
    </div>
  );
}
