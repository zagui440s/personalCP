import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import inventoryInitialValue from "./data/inventory.json";

export default function App() {
  const apiKey = "7f539340";
  // defining all of our state at top level and then passing down where appropriate
  const [inventory, setInventory] = useState(inventoryInitialValue);

  // define helper methods where helpful
  const getInvetoryItemById = (id) => {
    return inventory.find((inventoryItem) => inventoryItem.id === id);
  };

  const updateInventoryById = (id, updateData) => {
    const updatedInventory = [...inventory];
    const itemToUpdate = updatedInventory.find(
      (inventoryItem) => inventoryItem.id === id
    );
    Object.assign(itemToUpdate, updateData);
    setInventory(updatedInventory);
  };

  useEffect(() => {
    async function getOMDbAPIdata(id) {
      try {
        const response = await axios.get(
          `https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`
        );
        updateInventoryById(id, response.data);
      } catch (error) {
        console.error(err);
      }
    }

    inventory.forEach((inventoryItem) => getOMDbAPIdata(inventoryItem.id));
  }, []);

  console.log(inventory[0]);

  return (
    <div id="app">
      <header>
        <h1>Video Store</h1>
      </header>
      <main>
        <Outlet
          context={{
            inventory,
            getInvetoryItemById,
            updateInventoryById,
          }}
        />
      </main>
      <footer>© 2023 Video Store</footer>
    </div>
  );
}
