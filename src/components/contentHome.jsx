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
                        <img src="https://subsidiumfrontend0043e09c27f94c5ebd997822f58c1a200341-master.s3.amazonaws.com/public/FueraHub.JPG" alt="1"/>
                    </view>
                        
                    <view>
                         <img src="https://subsidiumfrontend0043e09c27f94c5ebd997822f58c1a200341-master.s3.amazonaws.com/public/Lab1.JPG" alt="2"/>
                    </view>

                    <view>
                        <img src="https://subsidiumfrontend0043e09c27f94c5ebd997822f58c1a200341-master.s3.amazonaws.com/public/Lab2.JPG" alt="1"/>
                    </view>

                    <view>
                        <img src="https://subsidiumfrontend0043e09c27f94c5ebd997822f58c1a200341-master.s3.amazonaws.com/public/Vato.JPG" alt="2"/>
                    </view>

                    <view>
                        <img src="https://subsidiumfrontend0043e09c27f94c5ebd997822f58c1a200341-master.s3.amazonaws.com/public/SalaGrande.jpg" alt="2"/>
                    </view>

                    <view>
                        <img src="https://subsidiumfrontend0043e09c27f94c5ebd997822f58c1a200341-master.s3.amazonaws.com/public/Juntas.JPG" alt="2"/>
                    </view>

                </Flex>

                <Flex
                 direction= "row"
                 justifyContent= "center"
                 alignContent= "center"
                 alignItems= "center"
                 gap="0rem">
 
                    <view>
                        <img src="https://subsidiumfrontend0043e09c27f94c5ebd997822f58c1a200341-master.s3.amazonaws.com/public/Edificio.JPG" alt="1"/>
                    </view>
                        
                    <view>
                        <img src="https://subsidiumfrontend0043e09c27f94c5ebd997822f58c1a200341-master.s3.amazonaws.com/public/CartelChan.jpeg" alt="2"/>
                    </view>

                    <view>
                        <img src="https://subsidiumfrontend0043e09c27f94c5ebd997822f58c1a200341-master.s3.amazonaws.com/public/SalaJuntas.JPG" alt="1"/>
                    </view>

                    <view>
                        <img src="https://subsidiumfrontend0043e09c27f94c5ebd997822f58c1a200341-master.s3.amazonaws.com/public/Juntas.JPG" alt="2"/>
                    </view>

                    <view>
                        <img src="https://subsidiumfrontend0043e09c27f94c5ebd997822f58c1a200341-master.s3.amazonaws.com/public/SalaJuntas2.jpeg" alt="2"/>
                    </view>

                    <view>
                        <img src="https://subsidiumfrontend0043e09c27f94c5ebd997822f58c1a200341-master.s3.amazonaws.com/public/Explicacion.JPG" alt="2"/>
                    </view>
                    
                </Flex>
            </div>
        </body>
    )

}

export default contentHome