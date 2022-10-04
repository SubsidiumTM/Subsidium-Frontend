import React from 'react'
import { Flex } from '@aws-amplify/ui-react'
import { useState, useEffect } from 'react'
import { Auth } from 'aws-amplify';
import { APImethods } from '../api/APImethods';
import { API } from "aws-amplify";
import { listNotes } from "../graphql/queries";
import SubsidiumAuth from '../components/AuthenticationWrap';

const Profile_information = () => {

  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    getInfo();
    confirmUserRegistration();
  }, [])

  async function confirmUserRegistration() {
    const response = await Auth.currentUserInfo();
    const username = response.username;
    const response2 = await APImethods.getUser(username);
    if (response2.listUsers.items.length == 0) {
      console.log("Registrando")
      console.log(response)
      await (APImethods.createUser(
        response.username,
        response.attributes.name,
        response.attributes.family_name,
        response.attributes.email,
        "USER",
        true,
        true
      ))
    }
    else {
      console.log("Ya esta registrado")
    }
  }

  async function getInfo() {
    const response = await Auth.currentUserInfo();
    const userInfo = response.attributes;
    setUserInfo(userInfo);
  }
  
  return (

    <SubsidiumAuth jsx={

    <>
    <Flex direction="row">

    </Flex>
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

    }/>
  )
}

export default Profile_information
