import React from 'react'

import { Flex } from '@aws-amplify/ui-react'

import './contentHome.css'

function contentHome() {
    return(
        <body>
            <div>
                <h1> Bienvednid@ a Subsidium </h1>
                <h2> by Cibersecurty Hub </h2>
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
        </body>
    )

}

export default contentHome