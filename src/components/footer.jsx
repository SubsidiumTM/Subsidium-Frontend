import React from 'react'

import { Flex } from '@aws-amplify/ui-react'

import './footer.css'

function Footer() {
  return (
    /*<Flex className='footer' direction="row" justifyContent="center">
        <a href="/sobre-nosotros">Sobre Nosotros</a>
    </Flex>*/
    <footer>
      <div style={{color: "white", backgroundColor: "black"}}>
      <img src="images/subsidium_full_logo.png" alt="subsidium" width= "250px" height= "200px"/>
        <table style={{   tableLayout: "auto", width: "50%", textAlign: "left"  }}>

          <th> Direccion </th>
          <th> Ligas de interes </th>

          <tr>
            <td> Av Carlos Lazo 100, Santa Fe, La Loma, Álvaro Obregón, 01389 Ciudad de México, CDMX </td>
            <td> miTec </td>
          </tr>

          <tr>
            <td> Tel. +52 55 9177 8000 </td>
            <td> canvas </td>
          </tr>
        </table>
      </div>
    </footer>
  )
}

export default Footer
