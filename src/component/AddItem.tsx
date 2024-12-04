import React, { useState } from "react";
import { createItem } from "../services/ItemService";
import { Item } from "../types/Item";

const AddItem: React.FC = () => {
  const [newItem, setNewItem] = useState<Item>({
    id: '',
    title: "",
    description: "",
    price: 0,
  });
  
    // Create a new item
    // const addItem = async () => {
    //     if (!newItem.title || !newItem.description || newItem.price <= 0) return;
    
    //     const newItemData: Item = { ...newItem, id: Date.now() };
    
    //     try {
    //       setLoading(true);
    //       // Mocking API POST request
    //       setItems((prevItems) => [newItemData, ...prevItems]);
    //       setNewItem({ id: 0, title: "", description: "", price: 0 });
    //     } catch (error) {
    //       console.error("Error adding item:", error);
    //     } finally {
    //       setLoading(false);
    //     }
    //   };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const createdItem = await createItem(newItem);
    console.log("Created Item:", createdItem);
    setNewItem({ id: '',title: "", description: "", price: 0 });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* <h2 className="font-semibold text-xl mb-2">Add Item</h2> */}
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
        <input
          type="text"
          value={newItem.title}
          onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
          className="border px-4 py-2 rounded-lg w-full"
          placeholder="Title"
        />
        <input
          type="text"
          value={newItem.description}
          onChange={(e) =>
            setNewItem({ ...newItem, description: e.target.value })
          }
          className="border px-4 py-2 rounded-lg w-full"
          placeholder="Description"
        />
        <input
          type="number"
          value={newItem.price}
          onChange={(e) =>
            setNewItem({ ...newItem, price: parseFloat(e.target.value) })
          }
          className="border px-4 py-2 rounded-lg w-full"
          placeholder="Price"
        />
        <button
        type="submit"
          className="sm:col-span-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          disabled={false}
        >
          Add Item
        </button>
      </div>
    </form>
  );
};

export default AddItem;
