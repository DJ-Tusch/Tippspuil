import React, {useState} from "react";
import './App.css';
import Tabello from "./tabello";
import tabelle22 from "./tabelle22.json";
import tabelle23 from "./tabelle23.json";
import tabelle24 from "./tabelle24.json";
import {appStylesTable} from "./AppStylesTable";

// Separate Funktion zum Rendern der Tabelle basierend auf der ausgewählten Saison
function renderTable(currentSeason) {
  switch (currentSeason) {
    case "22":
      return <Tabello tableData={tabelle22} title={"Season 22"} />;
    case "23":
      return <Tabello tableData={tabelle23} title={"Season 23"} />;
    case "24":
      return <Tabello tableData={tabelle24} title={"Season 24"} />;
    default:
      return null;
  }
}

function App() {
  // State für die aktuelle Saison
  const [currentSeason, setCurrentSeason] = useState("24");

  return (
      <div className="App">
        <h1>Tippspiel Tabellen</h1>

        {/* Buttons zum Wechseln zwischen den Saisons */}
        <div style={appStylesTable.buttonContainer}>
          <button style={appStylesTable.button} onClick={() => setCurrentSeason("22")}>Season 22</button>
          <button style={appStylesTable.button} onClick={() => setCurrentSeason("23")}>Season 23</button>
          <button style={appStylesTable.button} onClick={() => setCurrentSeason("24")}>Season 24</button>
        </div>

        {/* Tabelle basierend auf der aktuellen Saison rendern */}
        {renderTable(currentSeason)}
      </div>
  );
}

export default App;
