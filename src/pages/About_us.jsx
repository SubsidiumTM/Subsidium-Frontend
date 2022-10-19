import { Flex } from '@aws-amplify/ui-react';
import React from 'react'
import '../components/About_us.css'

function About_us() {

  return (
    <div className='General'>
      <h1 className='Titulo1'> HUB DE CIBERSEGURIDAD </h1>
      <img src="https://subsidiumfrontend0043e09c27f94c5ebd997822f58c1a200341-master.s3.amazonaws.com/public/AboutUs1.JPG" alt="1" className='imgSpecial'/>

      <div className='Info'>
        <p> El Hub de Ciberseguridad del Tecnológico de 
        Monterrey abona a la visión estratégica rumbo al 
        2030, que busca el florecimiento humano a 
        través del liderazgo, el emprendimiento y la 
        innovación. Además, suma al modelo educativo Tec21 para 
        formar a líderes con los valores y competencias 
        necesarias para resolver los retos y capturar las 
        oportunidades que tendremos en el siglo XXI. El Hub forma parte de la Escuela de Ingeniería y 
        Ciencias, cuenta con una superficie de 278 
        metros cuadrados, además de equipo de última 
        generación para que las personas que hagan uso 
        de estas instalaciones encuentren soluciones a 
        los principales retos a los que se enfrentan las 
        empresas. Con una muy prominente presencia tanto en 
        México como en Latinoamérica con el Hub de 
        Ciberseguridad nos hemos presentado como una 
        plataforma de trabajo abierta interactiva 
        colaborativa multi organizaciona. Contará con espacios especializados como el 
        cyberlink, laboratorio de ciberseguridad en 
        internet de las cosas, un área de 
        emprendimiento, para incentivar la innovación y 
        generación de conocimiento, así como una 
        incubadora de empresas.</p>
      </div>

      <div className='Objetivo'>
        <h2> Objetivo </h2>
        <p> El objetivo es brindar soporte para organizaciones 
        que demandan salvaguarda en sus redes de 
        información estratégica y que lo hace a través de 
        programas de innovación tecnológica de 
        consultoría de capacitación. Así como también a través de eventos de difusión 
        y concientización sobre la necesidad permanente 
        de contar con las herramientas con el personal 
        capacitado y los servicios alrededor del tema de 
        ciberseguridad. Es por ello que en el Tec hemos apostado en 
        desarrollar recursos y capital humano en esta 
        disciplina qué tanta demanda tiene la actualidad 
        y que estamos seguros se va expandir hacia el 
        futuro </p>
      </div>

      <div className='Director'>
        <h2> Director del Hub </h2>
        <Flex
          direction= "row"
          justifyContent= "flex-start" 
          alignItems= "center">

            <view className='DirInfo'>
             <img src = "https://subsidiumfrontend0043e09c27f94c5ebd997822f58c1a200341-master.s3.amazonaws.com/public/DirHub.png" alt="DirectorHub" className='imgSpecial'/>
             {/*<p> Gonzalo García-Belenguer Cuchi </p>*/}
             <a href="https://www.linkedin.com/in/gonzalo-garc%C3%ADa-belenguer-63968768"> ggarciab@tec.mx </a>
            </view>

            <view>
              <h3> Gonzalo García-Belenguer Cuchi </h3>
              <p> Executive MBA - IE Business School, con historial demostrado de trabajo 
              en la industria de asuntos internacionales. Conocedor y Experto en Asuntos 
              de Ciberseguridad, Relaciones Internacionales y Políticas Públicas, Nuevas 
              Tecnologías de la Comunicación y Artes Gráficas. </p>
              <p>
                El Tec de Monterrey viene haciendo un trabajo excelente en materia 
                de ciberseguridad con iniciativa y aliados estratégicos.
                Me gustaría dar seguimiento a todas las buenas iniciativas y 
                actividades que se vienen haciendo, las relaciones que se han 
                desarrollado y fortalecer y desarrollar otras nuevas.
                Por ejemplo, impulsar al género femenino a adentrarse a la 
                materia, como saben menos del 10% del sector de ciberseguridad 
                son mujeres. Debemos poner nuestro grano de arena y apoyar 
                estas iniciativas. 
              </p>
            </view>

        </Flex>
      </div>

      <div className='Socios'>
        <h2> Nuestros socios </h2>
        {/*<img src= "images/Socios.png" alt="Socios" />*/}
        <table>
          <tr>
            <td> <img src="images/Socio1.png" alt="1" /> </td>
            <td> <img src="images/Socio2.png" alt="2" /> </td>
            <td> <img src="images/Socio3.png" alt="3" /> </td>
          </tr>
          <tr>
            <td> <img src="images/Socio4.png" alt="4" /> </td>
            <td> <img src="images/Socio5.png" alt="5" /> </td>
            <td> <img src="images/Socio6.png" alt="6" /> </td>
            <td> <img src="images/Socio7.png" alt="7" /> </td>
          </tr>
        </table>
      </div>

      <div className='LTrabajo'>
        <h2> Líneas de trabajo </h2>
        {/*<img src="images/LineasTrabajo.png" alt="LT" />*/}
        <table>
          <tr>
            <td> <img src="images/LT1.png" alt="1" /> </td>
            <td> <img src="images/LT2.png" alt="2" /> </td>
            <td> <img src="images/LT3.png" alt="3" /> </td>
            <td> <img src="images/LT4.png" alt="4" /> </td>
          </tr>

          <tr>
            <td> <h2> Capacitación </h2> </td>
            <td> <h2> Investigación </h2> </td>
            <td> <h2> Servicios </h2> </td>
            <td> <h2> Concientización </h2> </td>
          </tr>

          <tr>
            <td> <p> Diplomados, especialidades y posgrados.</p> </td>
            <td> <p> Ciberforénsica, criptografía 
                  para dispositivos, aplicación 
                  de máquinas inteligentes 
                  para detección y 
                  clasificación de malware en 
                  móviles, automatización de 
                  detección de intrusos, 
                  aplicación de visión 
                  computacional en 
                  ciberseguridad. </p> </td>
            <td> <p> Pruebas de penetración de 
                  la infraestructura de 
                  tecnologías de la 
                  información, auditorías de 
                  seguridad informática, 
                  gestión de riesgos de 
                  tecnologías de la 
                  información y cyber range. </p> </td>
            <td> <p> Conferencias, competencias y seminarios. </p> </td>
          </tr>
        </table>
      </div>

      <div className='Tabla'>
        <h2> En caso de registrarse el Hub ofrece la posibilidad de reservación de los siguientes recursos: </h2>
        <table>

          <tr>
            <td>
              <img src="images/EspaciosAU.png" alt="Espacios" />
            </td>
            <td>
              <p> Ofrecemos la posibilidad de reservar espacios con ciertas características para promover el trabajo y el aprendizaje. </p>
            </td>
          </tr>

          <tr>
            <td>
              <img src="images/HardwareAU.png" alt="Hardware" />
            </td>
            <td>
              <p> A los miembros se les ofrece la posibilidad de poder reservar equipos de cómputo para promover el aprendizaje. </p>
            </td>
          </tr>

          <tr>
            <td>
              <img src="images/SoftwareAU.png" alt="Software" />
            </td>
            <td>
             <p> En caso de ser necesario, se ofrece la posibilidad de utilizar licencias de software establecidas por cierto tiempo. </p>
            </td>
          </tr>

          <tr>
            <td>
              <p></p>
            </td>
            <td>
             <p></p>
            </td>
          </tr>

        </table>
      </div>

    </div>
  )
}

export default About_us;
