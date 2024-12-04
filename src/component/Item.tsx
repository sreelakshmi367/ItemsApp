import React from 'react';

interface ItemProps {
  item: {
    id: number;
    title: string;
    completed: boolean;
  };
  onDelete: (id: number) => void;
  onUpdate: (item: {
    id: number;
    title: string;
    completed: boolean;
  }) => void;
}

const Item: React.FC<ItemProps> = ({ item, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [title, setTitle] = React.useState(item.title);
  const [completed, setCompleted] = React.useState(item.completed);

  const handleDelete = () => {
    // onDelete((link unavailable));
  };

  const handleUpdate = () => {
    // onUpdate({ id: (link unavailable), title, completed });
    // setIsEditing(false);
  };

  return (
    <div className="flex justify-between mb-4">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="py-2 px-4 mb-4 border border-gray-400"
          />
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            className="mr-2"
          />
          <span>Completed</span>
        </div>
      ) : (
        <div>
          <h2 className="text-lg">{item.title}</h2>
          <p className="text-sm">{item.completed ? 'Completed' : 'Not Completed'}</p>
        </div>
      )}
      <div>
        {isEditing ? (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleUpdate}
          >
            Update
          </button>
        ) : (
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        )}
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Item;
