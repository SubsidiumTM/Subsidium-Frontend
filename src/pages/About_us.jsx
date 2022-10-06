import { Flex } from '@aws-amplify/ui-react';
import React from 'react'

function About_us() {
  return (
    <div>
      <h1> HUB DE CIBERSEGURIDAD </h1>
      <p> El Hub de Ciberseguridad del Tecnológico de 
      Monterrey abona a la visión estratégica rumbo al 
      2030, que busca el florecimiento humano a 
      través del liderazgo, el emprendimiento y la 
      innovación.</p>
      <h2> Objetivo </h2>
      <p> El objetivo es brindar soporte para organizaciones 
      que demandan salvaguarda en sus redes de 
      información estratégica y que lo hace a través de 
      programas de innovación tecnológica de 
      consultoría de capacitación. </p>
      
      <div>
        <h2> Director del Hub </h2>
        <Flex
          direction= "row"
          justifyContent= "flex-start" 
          alignItems= "center">

            <view>
             <img src= 'https://drive.google.com/file/d/1sj4Tfd39rJyBJJA2Mm6WKQ3r4IIuEyOe/view?usp=sharing'/>
             <p> Gonzalo García-Belenguer Cuchi </p>
             <a href="https://www.linkedin.com/in/gonzalo-garc%C3%ADa-belenguer-63968768"> ggarciab@tec.mx </a>
            </view>

            <view>
            <p> El Tec de Monterrey viene haciendo un trabajo excelente en materia 
            de ciberseguridad con iniciativa y aliados estratégicos.
            Me gustaría dar seguimiento a todas las buenas iniciativas y 
            actividades que se vienen haciendo, las relaciones que se han 
            desarrollado y fortalecer y desarrollar otras nuevas.
            Por ejemplo, impulsar al género femenino a adentrarse a la 
            materia, como saben menos del 10% del sector de ciberseguridad 
            son mujeres. Debemos poner nuestro grano de arena y apoyar 
            estas iniciativas </p>
            </view>

        </Flex>
      </div>

      <div>
        <h2> Nuestros socios </h2>
        <p> IMAGEN VRGAS </p>
      </div>

      <div>
        <h2> Líneas de trabajo </h2>
        <p> IMAGEN VRGAS2 </p>
      </div>

      <div>
        <h2> En caso de registrarse el Hub ofrece la posibilidad de reservación de los siguientes recursos: </h2>
        <Flex
          direction= "row"
          justifyContent= "flex-start" 
          alignItems= "center">

            <view>
              <p> Imagen1 </p>
              <p> Imagen2 </p>
              <p> Imagen3 </p>
            </view>

            <view>
              <p> Ofrecemos la posibilidad de reservar espacios con ciertas características para promover el trabajo y el aprendizaje. </p>
              <p> A los miembros se les ofrece la posibilidad de poder reservar equipos de cómputo para promover el aprendizaje. </p>
              <p> En caso de ser necesario, se ofrece la posibilidad de utilizar licencias de software establecidas por cierto tiempo. </p>
            </view>
        </Flex>
      </div>

      <footer>
        <div>
          <p> footer mamalon</p>
        </div>
      </footer>
    </div>
  )
}

export default About_us;
