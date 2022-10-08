import React from 'react'

import { Flex } from '@aws-amplify/ui-react'

import './footer.css'

function Footer() {
  return (
    /*<Flex className='footer' direction="row" justifyContent="center">
        <a href="/sobre-nosotros">Sobre Nosotros</a>
    </Flex>*/
    <footer>
      <div>
        <img src="images/subsidium_full_logo.png" alt="subsidium"/>
        <table>

          <th> Dirección </th>
          <th> Ligas de interés </th>

          <tr>
            <td> Av Carlos Lazo 100, Santa Fe, La Loma, Álvaro Obregón, 01389 Ciudad de México, CDMX </td>
            <td> <a href="https://tec.mx/es"> Tecnológico de Monterrey </a> </td>
          </tr>

          <tr>
            <td> Tel. +52 55 9177 8000 </td>
            <td> <a href="https://conecta.tec.mx/es"> CONECTA </a> </td>
          </tr>
        </table>
      </div>
    </footer>
  )
}

export default Footer
