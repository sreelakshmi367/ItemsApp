import React, { useState, useEffect } from 'react';
import Item from './Item.tsx';

interface ItemListProps {
  items: {
    id: number;
    title: string;
    completed: boolean;
  }[];
  onDelete: (id: number) => void;
  onUpdate: (item: {
    id: number;
    title: string;
    completed: boolean;
  }) => void;
}

const ItemList: React.FC<ItemListProps> = ({ items, onDelete, onUpdate }) => {
  return (
    <div className="flex flex-col">
      {items.map((item) => (
        <Item 
        key={1} 
        item={item} 
        onDelete={onDelete} onUpdate={onUpdate} />
      ))}
    </div>
  );
};

export default ItemList;