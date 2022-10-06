import React from 'react'
import { Flex, Heading } from '@aws-amplify/ui-react'
import { useState, useEffect } from 'react'
import { Auth } from 'aws-amplify';
import './profile.css'

const Profile_information = () => {

  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    getInfo();
  }, [])

  async function getInfo() {
    const response = await Auth.currentUserInfo();
    const userInfo = response.attributes;
    setUserInfo(userInfo);
  }
  
  return (

    <>
    <div>
    <Heading level={1}>Informacion de Perfil</Heading>
    <br/>
    <h1>Hola, {userInfo.name}</h1>
    <p>Aqui se muestran tus datos de usuario.</p>
    <Flex direction="row" gap="3rem">
        <p>Nombre: {userInfo.name} {userInfo.family_name}</p>
    </Flex>
    <Flex direction="row" gap="3rem">
        <p>Correo electronico: {userInfo.email}</p>
    </Flex>
    <Flex direction="row" gap="3rem">
        <p>Cambiar contraseña:</p>
    </Flex>
    </div>
    
    </>
  )
}

export default Profile_information;
