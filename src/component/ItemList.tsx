import React, { useEffect, useState } from "react";
import { getItems, deleteItem } from "../services/ItemService";
import { Item, UpdateItem } from "../types/Item";
import AddItem from "./AddItem";
import EditItem from "./EditItem";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import SuccessAlert from "../common/SuccessAlert";
import ErrorAlert from "../common/ErrorAlert";

const ItemList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState<Item>({
    id: 0,
    title: "",
    description: "",
    price: 0,
  });
  const [isEdit, setIsEdit] = useState<Boolean>(false);
  const [isDelete, setIsDelete] = useState<Boolean>(false);
  const [editItem, setEditItem] = useState<Item>(newItem);
  const [itemToDelete, setItemToDelete] = useState<number | string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(8);
  const [sortBy, setSortBy] = useState<string>("title");
  const [sortOrder, setSortOrder] = useState<string>("asc");
  // const [sortConfig, setSortConfig] = useState<{ key: keyof Item; direction: 'asc' | 'desc' } | null>(null);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertError, setAlertError] = useState(false);

  const fetchItems = async () => {
    setIsEdit(false);
    setLoading(true);
    try {
      const fetchedItems = await getItems();
      setItems(fetchedItems);
    } catch (error) {
      setAlertError(true);
      setTimeout(() => {
        setItems([]);
        setAlertError(false);
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  // Start editing an item
  const startEditing = (item: Item) => {
    setIsEdit(true);
    setEditItem(item);
  };

  // Delete an item
  const onDeleteItem = (id: number | string) => {
    setIsDelete(true);
    setItemToDelete(id);
  };

  const handleDelete = async () => {
    try {
      const deletedItem = await deleteItem(itemToDelete);
      console.log("Deleted Item:", deletedItem);
      setAlertSuccess(true);
      setTimeout(() => {
        setAlertSuccess(false);
      }, 2000);
    } catch (error) {
      console.error("Error deleting item:", error);
    } finally {
      setIsDelete(false);
      fetchItems();
    }
  };

  const sortItems = (data: Item[]): Item[] => {
    return data.sort((a, b) => {
      if (sortBy === "price") {
        // Handle price as a number
        return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
      } else if (sortBy === "title") {
        // Handle title as strings
        if (sortOrder === "asc") {
          return a["title"].localeCompare(b["title"]);
        } else {
          return b["title"].localeCompare(a["title"]);
        }
      } else {
        // Handle description as strings
        if (sortOrder === "asc") {
          return a["description"].localeCompare(b["description"]);
        } else {
          return b["description"].localeCompare(a["description"]);
        }
      }
    });
  };

  const getArrow = (key:string) => {
    if (sortOrder === key) {
      return sortOrder === 'asc' ? '▼' : '▲';
    }
    return null;
  };

  // Paginate the items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortItems(items).slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Handle page change
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    fetchItems(); // Fetch items from the mock API when the component mounts or when the page changes
  }, [currentPage]);

  return (
    <React.Fragment>
      <h1 className="text-3xl font-semibold mb-4 text-center">Items</h1>
      <div className="mb-6">
        {isEdit ? (
          <EditItem
            item={editItem}
            getData={fetchItems}
            onCancel={() => setIsEdit(false)}
          />
        ) : (
          <AddItem getData={fetchItems} />
        )}
        {alertSuccess && <SuccessAlert message="Item deleted successfully." />}

        {alertError && <ErrorAlert message={"Something went wrong !!"} />}
      </div>
      {/* Table */}
      {loading && (
        <div className="text-center text-xl text-gray-500">Loading...</div>
      )}
      {!loading && (
        <div className="overflow-x-auto overflow-y-auto lg:max-h-26 max-h-screen">
          <table className="min-w-full table-auto mt-4 border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th
                  className="px-4 py-2 text-left cursor-pointer max-w-xs truncate"
                  onClick={() => {
                    setSortBy("title");
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                  }}
                >
                  Title {getArrow(sortOrder)}
                </th>
                <th
                  className="px-4 py-2 text-left cursor-pointer max-w-xs truncate"
                  onClick={() => {
                    setSortBy("description");
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                  }}
                >
                  Description {getArrow(sortOrder)}
                </th>
                <th
                  className="px-4 py-2 text-right cursor-pointer min-w-32"
                  onClick={() => {
                    setSortBy("price");
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                  }}
                >
                  Price {getArrow(sortOrder)}
                </th>
                <th className="px-4 py-2 text-center ">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2 max-w-xs truncate relative">
                    {/* Tooltip on hover */}
                    <div className="truncate" title={item.title}>
                      {item.title}
                    </div>
                  </td>
                  <td className="px-4 py-2 max-w-xs truncate relative">
                    <div className="truncate" title={item.description}>
                      {item.description}
                    </div>
                  </td>
                  <td className="px-4 py-2 text-right">
                    ${item?.price?.toFixed(2)}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => startEditing(item)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded-lg mr-2 hover:bg-yellow-600 text-xs sm:px-2 sm:text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDeleteItem(item.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 text-xs sm:px-2 sm:text-sm "
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {isDelete ? (
                <DeleteConfirmationModal
                  isVisible={isDelete}
                  onConfirm={() => handleDelete()}
                  onCancel={() => setIsDelete(false)}
                />
              ) : null}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {!loading && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-black rounded-lg mr-2 text-xs sm:text-sm disabled:bg-gray-100"
          >
            Previous
          </button>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage * itemsPerPage >= items.length}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-black rounded-lg text-xs sm:text-sm disabled:bg-gray-100"
          >
            Next
          </button>
        </div>
      )}
    </React.Fragment>
  );
};

export default ItemList;
