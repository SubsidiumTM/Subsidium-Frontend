import React from 'react'
import { Flex, Button, withAuthenticator, Heading } from '@aws-amplify/ui-react'
import { useState, useEffect } from 'react'
import { Auth } from 'aws-amplify';
import { APImethods } from '../api/APImethods';
import './profile.css'
// Profile USER options
import Profile_information from './profile_information';
import Profile_reservations from './profile_reservations';
// Profile ADMIN options
import Admin_inventory from './admin_inventory';
import Admin_reservations from './admin_reservations';
import Users_list from './users_list';
import Statistics from './statistics';


const Profile_menu = ({ signOut }) => {
    // Page variables
    const [userType, setUserType] = useState([]);
    const [userSatus, setUserStatus] = useState(false);
    const [userInfo, setUserInfo] = useState([]);
    const [userID, setUserID] = useState([]);
    const [selectView, setSelectView] = useState(0);
    const views = [<Profile_information userID={userID}/>, <Profile_reservations userID={userID} />, <Admin_reservations />, <Admin_inventory />, <Users_list userID={userID} userType={userType}/>, <Statistics/>];

    useEffect(() => {
        getInfo();
        confirmUserRegistration();
    }, [])

    // Check if user is registered or registers it if not
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
        setUserID(response2.listUsers.items[0].id);
        setUserStatus(response2.listUsers.items[0].active);
        setUserType(response2.listUsers.items[0].type);
        console.log("Ya esta registrado")
        }
    }
    // Get user info
    async function getInfo() {
        const response = await Auth.currentUserInfo();
        const userInfo = response.attributes;
        setUserInfo(userInfo);
    }
  
    return (
    <>
    {userSatus ? 
    <body>
    <Flex direction="row" gap="2rem">

    <div className="side_menu">
    <Flex direction="column">
        <Button onClick={() => {setSelectView(0)}}>Perfil</Button>
        <Button onClick={() => {setSelectView(1)}}>Mis Reservas</Button>
        {userType == "ADMIN" || userType == "GENERAL_ADMIN" ? <Button onClick={() => {setSelectView(2)}}>Admin. Reservas</Button> : <></>}
        {userType == "ADMIN" || userType == "GENERAL_ADMIN" ? <Button onClick={() => {setSelectView(3)}}>Admin. Inventario</Button> : <></>}
        {userType == "ADMIN" || userType == "GENERAL_ADMIN" ? <Button onClick={() => {setSelectView(4)}}>Admin. Usuarios</Button> : <></>}
        {userType == "ADMIN" || userType == "GENERAL_ADMIN" ? <Button onClick={() => {setSelectView(5)}}>Estadisticas</Button> : <></>}
        <Button onClick={signOut}>Cerrar Sesion</Button>
    </Flex>
    </div>

    <div className="content">
    {views[selectView]}
    </div>

    </Flex>
    
    </body>
    :
    <body>
    <Heading level={1}>Usuario Inactivo</Heading>
    <Heading level={1}>Comuniquese con nosotros para la reactivacion</Heading>
    <Button onClick={signOut}>Cerrar Sesion</Button>
    </body>
    }
    </>
  )
}


export default withAuthenticator(Profile_menu);
