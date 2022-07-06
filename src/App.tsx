import React from 'react';
import PlanetsTable from './components/PlanetsTable';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <h2>✨ Chase Myers 🪐</h2>
        <p>
          Planets from <code>swapi.dev</code>
        </p>
      </header>
      <main>
        <div style={{margin: "2rem"}}>
          <PlanetsTable />
        </div>
      </main>
    </div>
  );
}

export default App;
