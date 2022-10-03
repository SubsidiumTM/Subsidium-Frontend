import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Header() {

  return (
    <BrowserRouter>
    <nav>
        <button>Inicio</button>
        <button>Noticias</button>
        <button>Inventario</button>
        <button>Profile</button>
    </nav>
    </BrowserRouter>
  )
}

export default Header;
