import React from 'react';
import './App.css';
import './scss/styles.scss';
import Home from './pages/home';
import SignInSide from './pages/login';
import SignUpSide from './pages/signup';

import Manager from './components/manage_inventory';

function App() {
  return (
    <div className="App">
      {/* <Home /> */}
      {/* <Manager signOut={undefined} /> */}
      {/* <SignInSide /> */}
      <SignUpSide />
    
    </div>
  );
}

export default App;
