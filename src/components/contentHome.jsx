import React from 'react'

import { Flex } from '@aws-amplify/ui-react'

import './contentHome.css'
import { height } from '@mui/system';

function contentHome() {
    const bodystyle = {
        backgroundColor: "rgba(19,27,48,255)",
        textAlign: "center",
        color: "white",
      };

      const Hstyle = {
        color: "white",
        fontWeight: "bold"
        
      };

      const divImg = {
        backgroundImage: 'images/BackgroundHome.jpg',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
      };


    return(
        <body style={bodystyle}>
            <div>
                <h1 style={Hstyle}> Bienvednid@ a Subsidium </h1>
                <h2 style={Hstyle}> by Cibersecurty Hub </h2>
                <p> Ven y conoce el nuevo hub de ciberseguridad del Tec de Monterrey en Campus Santa Fe, Ciudad de México </p>
                <p> Aprovecha las instalaciones y servicios para desarrollar tu potencial al maximo </p>
                <ul>
                    <li> Laboratorios de computo </li>
                    <li> Equipos electronicos </li>
                    <li> Licencias de software </li>
                </ul>
                <a href="/sobre-nosotros"> Mas información del Hub de ciberseguridad </a>
                <p> Crea tu cuenta y ponte manos a la obra </p>
            </div>
            <div>
                <Flex
                 direction = "column">
                    <view>
                        <img src="images/FueraHub.jpg" alt="1" width="250" height="250" />
                        <img src="images/Lab1.jpg" alt="2" width="250" height="250" />
                        <img src="images/Lab2.jpg" alt="1" width="250" height="250" />
                        <img src="images/Vato.jpg" alt="2" width="250" height="250" />
                        <img src="images/SalaGrande.jpg" alt="2" width="250" height="250" />
                        <img src="images/Juntas.jpg" alt="2" width="250" height="250" />

                        <img src="images/Edificio.jpg" alt="1" width="250" height="250" />
                        <img src="images/CartelChan.jpeg" alt="2" width="250" height="250" />
                        <img src="images/SalaJuntas.jpg" alt="1" width="250" height="250" />
                        <img src="images/Junta.jpg" alt="2" width="250" height="250" />
                        <img src="images/SalaJuntas2.jpeg" alt="2" width="250" height="250" />
                        <img src="images/Explicacion.jpg" alt="2" width="250" height="250" />
                    </view>
                </Flex>
            </div>
        </body>
    )

}

export default contentHome