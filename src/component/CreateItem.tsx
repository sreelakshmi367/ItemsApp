import React, { useState } from 'react';

interface CreateItemProps {
onCreate: (item: {
id: number;
title: string;
completed: boolean;
}) => void;
}

const CreateItem: React.FC<CreateItemProps> = ({ onCreate }) => {
const [title, setTitle] = useState('');
const [completed, setCompleted] = useState(false);

const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
event.preventDefault();
const newItem = {
id: Math.floor(Math.random() * 1000),
title,
completed,
};
onCreate(newItem);
setTitle('');
setCompleted(false);
};

return (
<form onSubmit={handleSubmit} className="flex flex-col">
<input
type="text"
value={title}
onChange={(e) => setTitle(e.target.value)}
placeholder="Title"
className="py-2 px-4 mb-4 border border-gray-400"
/>
<input
type="checkbox"
checked={completed}
onChange={(e) => setCompleted(e.target.checked)}
className="mr-2"
/>
<span>Completed</span>
<button
type="submit"
className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
> 
Create
</button>
</form>
)
};

export default CreateItem;