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
import Users_list from './users_list';


const Profile_menu = ({ signOut }) => {
    // Page variables
    const [userInfo, setUserInfo] = useState([]);
    const [userID, setUserID] = useState([]);
    const [selectView, setSelectView] = useState(0);
    const views = [<Profile_information />, <Profile_reservations userID={userID} />, <Admin_inventory />, <Users_list />];

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
    <Flex direction="row" gap="2rem">

    <div className="side_menu">
    <Flex direction="column">
        <Button onClick={() => {setSelectView(0)}}>Perfil</Button>
        <Button onClick={() => {setSelectView(1)}}>Mis Reservas</Button>
        <Button onClick={() => {setSelectView(2)}}>Admin. Recursos</Button>
        <Button onClick={() => {setSelectView(3)}}>Admin. Usuarios</Button>
        <Button onClick={signOut}>Cerrar Sesion</Button>
    </Flex>
    </div>

    <div className="content">
    {views[selectView]}
    </div>

    </Flex>
    
    </>
  )
}


export default withAuthenticator(Profile_menu);
