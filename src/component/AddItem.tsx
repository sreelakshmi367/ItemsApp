import React, { useState } from "react";
import { createItem } from "../services/ItemService";
import { Item } from "../types/Item";
import SuccessAlert from "../common/SuccessAlert";
import ErrorAlert from "../common/ErrorAlert";

interface AddItemProps {
  getData: () => void;
}

const AddItem: React.FC<AddItemProps> = ({ getData }) => {
  const [newItem, setNewItem] = useState<Item>({
    id: "",
    title: "",
    description: "",
    price: 0,
  });
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertError, setAlertError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const createdItem = await createItem(newItem);
      console.log("Created Item:", createdItem);
      setAlertSuccess(true);
      setTimeout(() => {
        setAlertSuccess(false);
      }, 2000);
    } catch (error) {
      setAlertError(true);
      setTimeout(() => {
        setAlertError(false);
      }, 3000);
    } finally {
      setNewItem({ id: "", title: "", description: "", price: 0 });
      getData();
    }
  };

  const handleCancel = () => {
    setNewItem({ id: "", title: "", description: "", price: 0 });
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-4">
          <input
            type="text"
            value={newItem.title}
            onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
            className="border px-4 py-2 rounded-lg w-full"
            placeholder="Title"
            required={true}
          />
          <input
            type="text"
            value={newItem.description}
            onChange={(e) =>
              setNewItem({ ...newItem, description: e.target.value })
            }
            className="border px-4 py-2 rounded-lg w-full"
            placeholder="Description"
            required={true}
          />
          <input
            type="number"
            value={newItem.price}
            onChange={(e) =>
              setNewItem({ ...newItem, price: parseFloat(e.target.value) })
            }
            className="border px-4 py-2 rounded-lg w-full"
            placeholder="Price"
            required={true}
          />
          <button
            type="submit"
            className="sm:col-span-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            disabled={false}
          >
            Add Item
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
      {alertSuccess && <SuccessAlert message="Item added successfully." />}
      {alertError && <ErrorAlert message={"Something went wrong !!"} />}
    </React.Fragment>
  );
};

export default AddItem;
