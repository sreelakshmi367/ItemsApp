import React from "react";
import ItemList from "./component/ItemList";


const App: React.FC = () => {

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md ">
        <ItemList />
      </div>
    </div>
  );
};

export default App;
