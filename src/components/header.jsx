import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Flex } from '@aws-amplify/ui-react';
import './header.css'


function Header() {

  return (
    <BrowserRouter>
    <nav>
        <Flex className='header' direction="row" justifyContent="center">

          <Flex direction="row" justifyContent="left" width="50rem"><a href='/' className='Logo'> Subsidum </a></Flex>

          <Flex direction="row" justifyContent="center">
          <a href='/'>Inicio</a>
          <a href='/noticias'>Noticias</a>
          <a href='/recursos'>Inventario</a>
          </Flex>

          <Flex direction="row" justifyContent="right" width="50rem"><a href='/perfil'>Profile</a></Flex>

        </Flex>        
    </nav>
    </BrowserRouter>
  )
}

export default Header;
