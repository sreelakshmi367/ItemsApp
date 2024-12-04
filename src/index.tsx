import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ItemList from '../src/component/ItemList.tsx';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <ItemList />
);


