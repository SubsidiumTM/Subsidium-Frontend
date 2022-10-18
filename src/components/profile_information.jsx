import React from 'react'
import { Flex, Heading } from '@aws-amplify/ui-react'
import { useState, useEffect } from 'react'
import { Auth } from 'aws-amplify';
import './profile.css'
import TableFour from './PieChartUserReservation'

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

  async function changePassword() {
    const oldPassword = document.getElementById('oldPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    try {
      Auth.currentAuthenticatedUser()
      .then(user => {
          return Auth.changePassword(user, oldPassword, newPassword);
      })
      .then(data => console.log(data))
      .catch(err => console.log(err));
      alert('Contraseña cambiada con éxito');
    } catch (error) {
      console.log('error changing password: ', error);
      alert('Error cambiando la contraseña');
    }
    document.getElementById('oldPassword').value = '';
    document.getElementById('newPassword').value = '';
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
        <Flex direction="column" gap="1rem">
            <input type="password" id="oldPassword" placeholder="Contraseña actual" />
            <input type="password" id="newPassword" placeholder="Nueva contraseña" />
            <button onClick={changePassword}>Cambiar contraseña</button>
        </Flex>
        <ul>
            <li>La contraseña debe tener al menos 12 caracteres</li>
            <li>La contraseña debe tener al menos una letra mayuscula</li>
            <li>La contraseña debe tener al menos un numero</li>
            <li>La contraseña debe tener al menos un caracter especial</li>
        </ul>
    </Flex>
    <TableFour/>
    </div>
    </>
  )
}

export default Profile_information;
