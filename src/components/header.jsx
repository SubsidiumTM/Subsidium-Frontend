import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Flex } from '@aws-amplify/ui-react';


function Header() {

  return (
    <BrowserRouter>
    <nav>
        <Flex direction="row" justifyContent="center">

          <Flex direction="row" justifyContent="left" width="50rem"><a href='/'>Logo</a></Flex>

          <Flex direction="row" justifyContent="center">
          <a href='/'>Inicio</a>
          <a href='/noticias'>Noticias</a>
          <a href='/recursos'>Inventario</a>
          </Flex>

          <Flex direction="row" justifyContent="right" width="50rem"><a href='/profile/info'>Profile</a></Flex>

        </Flex>        
    </nav>
    </BrowserRouter>
  )
}

export default Header;
