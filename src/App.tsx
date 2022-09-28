import React from 'react';
import './App.css';
import './scss/styles.scss';
import Home from './pages/home';
import Manager from './components/manage_inventory';

function App() {
  return (
    <div className="App">
      {/* <Home /> */}
      <Manager signOut={undefined} />
    
    </div>
  );
}

export default App;
