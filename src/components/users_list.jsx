import { Button } from 'antd';
import React, { useState, useEffect } from 'react'
import { Flex } from '@aws-amplify/ui-react';
import { APImethods } from '../api/APImethods'

const Users_list = () => {

    // List of users
    const [userList, setUserList] = useState([]);
    const [userDetails, setUserDetails] = useState([]);

    useEffect(() => {
        retrieveUsers();
      }, [])

    async function retrieveUsers () {
        const response = await APImethods.allUsers();
        console.log(response);
        setUserList(response);
        console.log(userList);
    }

    const status_label = (active) => {
        if (active) {
            return <>Active</>
        }
        else {
            return <>Inactive</>
        }
    }

    // Mutations of users
    async function makeUserActive (e) {
        e.active = true;
        await APImethods.updateUser(e.id, e.username, e.name, e.surname, e.email, e.type, e.verified, e.active);
        retrieveUsers();
    }

    async function makeUserInactive (e) {
        e.active = false;
        await APImethods.updateUser(e.id, e.username, e.name, e.surname, e.email, e.type, e.verified, e.active);
        retrieveUsers();
    }

    async function deleteUser (e) {
        await APImethods.deleteUser(e.id);
        // TODO: Delete from cognito
    }

    // Status of user
    const status_button = (user) => {
        if (user.active) {
            return <Button value={user} onClick={() => {makeUserInactive(user)}}>Desactivar</Button>
        }
        else {
            return <Button value={user} onClick={() => {makeUserActive(user)}}>Activar</Button>
        }
    }

    // List item variables
    const listUsers = userList.map((user) => 
        <div>
        {user.username} / 
        {user.name} {user.surname} / 
        {user.email} / 
        Estado: {status_label(user.active)} / 
        Tipo de usuario: {user.type} / 
        {status_button(user)}
        <Button onClick={() => {setUserDetails(user)}}>Ver</Button>
        </div>
    );

    return (
    <div>
        <h2>Lista de Usuarios</h2>
        <Flex direction="row">
        <div>
            {listUsers}
        </div>

        <div className="user_preview">
            <Flex direction="column">
            <h2>{userDetails.name} {userDetails.surname}</h2>
            
            <h2>{userDetails.email}</h2>
            
            <h2>{userDetails.username}</h2>

            {/* TODO: Agregar mas datos de los usuarios */}

            <Button onClick={() => {}}>Delete</Button>
            </Flex>
        </div>
        
        </Flex>
    </div>
    )
}

export default Users_list 