import React from 'react'

import { Flex } from '@aws-amplify/ui-react'

import '../components/contentHome.css'

function contentHome() {
    return(
        <body>
            <div className='Bienvenida'>
                <h1 className='Titulo1'> Bienvednid@ a Subsidium </h1>
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
            <div className='FlexImgHub'>
                <Flex
                 direction = "row"
                 justifyContent= "center"
                 alignContent= "center"
                 alignItems= "center"
                 gap="0rem">

                    <view>
                        <img src="images/FueraHub.jpg" alt="1"/>
                    </view>
                        
                    <view>
                         <img src="images/Lab1.jpg" alt="2"/>
                    </view>

                    <view>
                        <img src="images/Lab2.jpg" alt="1"/>
                    </view>

                    <view>
                        <img src="images/Vato.jpg" alt="2"/>
                    </view>

                    <view>
                        <img src="images/SalaGrande.jpg" alt="2"/>
                    </view>

                    <view>
                        <img src="images/Juntas.jpg" alt="2"/>
                    </view>

                </Flex>

                <Flex
                 direction= "row"
                 justifyContent= "center"
                 alignContent= "center"
                 alignItems= "center"
                 gap="0rem">
 
                    <view>
                        <img src="images/Edificio.jpg" alt="1"/>
                    </view>
                        
                    <view>
                        <img src="images/CartelChan.jpeg" alt="2"/>
                    </view>

                    <view>
                        <img src="images/SalaJuntas.jpg" alt="1"/>
                    </view>

                    <view>
                        <img src="images/Junta.jpg" alt="2"/>
                    </view>

                    <view>
                        <img src="images/SalaJuntas2.jpeg" alt="2"/>
                    </view>

                    <view>
                        <img src="images/Explicacion.jpg" alt="2"/>
                    </view>
                    
                </Flex>
            </div>
        </body>
    )

}

export default contentHome