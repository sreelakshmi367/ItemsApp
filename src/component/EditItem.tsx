import React, { useState } from "react";
import { updateItem } from "../services/ItemService";
import { Item } from "../types/Item";

interface EditItemProps {
    item: Item;
    getData: () => void;
    onCancel: () => void;
  }

const EditItem: React.FC<EditItemProps> = ({item,getData,onCancel}) => {
  const [editedItem, setEditedItem] = useState<Item>(item);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedItem = await updateItem(item.id, editedItem);
    console.log("Updated Item:", updatedItem);
    setEditedItem({ id: "", title: "", description: "", price: 0 });
    getData();
  };

  const handleCancel = () => {
    setEditedItem({ id: "", title: "", description: "", price: 0 });
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* <h2 className="font-semibold text-xl mb-2">Edit Item</h2> */}
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-4">
        <input
          type="text"
          value={editedItem.title}
          onChange={(e) => setEditedItem({ ...editedItem, title: e.target.value })}
          className="border px-4 py-2 rounded-lg w-full"
          placeholder="Title"
        />
        <input
          type="text"
          value={editedItem.description}
          onChange={(e) =>
            setEditedItem({ ...editedItem, description: e.target.value })
          }
          className="border px-4 py-2 rounded-lg w-full"
          placeholder="Description"
        />
        <input
          type="number"
          value={editedItem.price}
          onChange={(e) =>
            setEditedItem({ ...editedItem, price: parseFloat(e.target.value) })
          }
          className="border px-4 py-2 rounded-lg w-full"
          placeholder="Price"
        />
        <button
          type="submit"
          className="sm:col-span-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          disabled={false}
        >
          Update Item
        </button>
        <button
        type="reset"
          className="sm:col-span-1 px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
          disabled={false}
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditItem;
