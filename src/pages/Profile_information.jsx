import React from 'react'
import { Flex } from '@aws-amplify/ui-react'
import { useState, useEffect } from 'react'
import { Auth } from 'aws-amplify';
import { API } from "aws-amplify";
import { listNotes } from "../graphql/queries";

const Profile_information = () => {

  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    getInfo();
  }, [])

  async function getInfo() {
    const response = await Auth.currentUserInfo();
    const userInfo = response.attributes;
    console.log(userInfo)
    setUserInfo(userInfo)
  }
  
  return (
    <>
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
    </>
  )
}

export default Profile_information
