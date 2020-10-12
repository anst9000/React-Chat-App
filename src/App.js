import React from "react";
import Dashboard from "./Dashboard";
import "./App.css";
import Store from "./Store";

function App() {
  return (
    <div className="App">
      <Store>
        <Dashboard />
      </Store>
    </div>
  );
}

export default App;
