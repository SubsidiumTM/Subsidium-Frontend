import React, { useState } from 'react';
import './App.css';
import './scss/styles.scss';

// Routing
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Importing Pages
import Home from './pages/home';
import News from './pages/news';
import NewsEditing from './pages/NewsEditing';
import News_reading from './components/news_reading';
import About_us from './pages/About_us';
import Inventory from './pages/Inventory';
import Profile from './pages/Profile';
import History from './pages/History';
import Manage_inventory from './pages/Manage_inventory';
import Identify from './pages/CustomAuthenticator';
import Manager from './components/manage_inventory';
import Manage_users from './pages/Manage_users';
import Notes from './pages/Notes';

// Persistent in every PAge
import Footer from './components/footer';
import Header from './components/header';

function App() {
  const [token, setToken] = useState();
  return (
    <>
    <Header />
    <div className="App">
      <BrowserRouter>
      <Routes>

        {/* DONE */}
        <Route path='/noticias' element={<News />} />
        <Route path="/noticias/*" element={<News_reading />} />
        <Route path='/noticias/edicion/*' element={<NewsEditing />} />

        {/* TODO */}
        <Route path='/' element={<Home/>} />
        <Route path='/sobre-nosotros' element={<About_us />} />
        <Route path='/recursos' element={<Inventory />} />
        <Route path='/perfil' element={<Profile />} />
        <Route path='/historial' element={<History />} />
        <Route path='/admin/recursos' element={<Manage_inventory />} />
        <Route path='/admin/usuarios' element={<Manage_users />} />
        
        {/* AUX */}
        <Route path='/notes' element={<Notes signOut={undefined} />} />
        <Route path='/profile/manage-inventory' element={<Manager signOut={undefined} />} />
        <Route path='/auth' element={<Identify />} />

      </Routes>
      </BrowserRouter>
      {/* <SignInSide /> */}
      {/* <SignUpSide /> */}
    
    </div>
    <Footer />
    </>
  );
}

export default App;
