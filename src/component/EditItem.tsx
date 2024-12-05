import React, { useState } from "react";
import { updateItem } from "../services/ItemService";
import { Item } from "../types/Item";
import SuccessAlert from "../common/SuccessAlert";
import ErrorAlert from "../common/ErrorAlert";

interface EditItemProps {
  item: Item;
  getData: () => void;
  onCancel: () => void;
}

const EditItem: React.FC<EditItemProps> = ({ item, getData, onCancel }) => {
  const [editedItem, setEditedItem] = useState<Item>(item);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertError, setAlertError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedItem = await updateItem(item.id, editedItem);
      console.log("Updated Item:", updatedItem);
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
      setEditedItem({ id: "", title: "", description: "", price: 0 });
      getData();
    }
  };

  const handleCancel = () => {
    setEditedItem({ id: "", title: "", description: "", price: 0 });
    onCancel();
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-4">
          <input
            type="text"
            value={editedItem.title}
            onChange={(e) =>
              setEditedItem({ ...editedItem, title: e.target.value })
            }
            className="border px-4 py-2 rounded-lg w-full"
            placeholder="Title"
            data-testid="edit-title-input"
          />
          <input
            type="text"
            value={editedItem.description}
            onChange={(e) =>
              setEditedItem({ ...editedItem, description: e.target.value })
            }
            className="border px-4 py-2 rounded-lg w-full"
            placeholder="Description"
            data-testid="edit-description-input" 
          />
          <input
            type="number"
            value={editedItem.price}
            onChange={(e) =>
              setEditedItem({
                ...editedItem,
                price: parseFloat(e.target.value),
              })
            }
            className="border px-4 py-2 rounded-lg w-full"
            placeholder="Price"
            data-testid="edit-price-input" 
          />
          <button
            type="submit"
            className="sm:col-span-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            disabled={false}
            data-testid="update-button"
          >
            Update Item
          </button>
          <button
            type="reset"
            className="sm:col-span-1 px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
            disabled={false}
            onClick={handleCancel}
            data-testid="cancel-button"
          >
            Cancel
          </button>
        </div>
      </form>
      {alertSuccess && <SuccessAlert message="Item updated successfully." />}
      {alertError && <ErrorAlert message={"Something went wrong !!"} />}
    </React.Fragment>
  );
};

export default EditItem;
