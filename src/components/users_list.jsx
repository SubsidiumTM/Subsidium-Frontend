import { Button } from 'antd';
import React, { useState, useEffect } from 'react'
import { Flex } from '@aws-amplify/ui-react';
import { APImethods } from '../api/APImethods'
import { Auth } from 'aws-amplify';

const Users_list = () => {

    // List of users
    const [userList, setUserList] = useState([]);
    const [userDetails, setUserDetails] = useState([]);

    useEffect(() => {
        retrieveUsers();
      }, [])

    async function retrieveUsers () {
        const response = await APImethods.allUsers();
        setUserList(response);
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

    async function changeUserType (e, type) {
        e.type = type;
        await APImethods.updateUser(e.id, e.username, e.name, e.surname, e.email, e.type, e.verified, e.active);
        retrieveUsers();
    }

    async function deleteUser (e) {
        await APImethods.deleteUser(e.id)
        console.log(e.id);
        retrieveUsers();
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

    // Type of user
    const type_button = (user) => {
        if (user.type == 'USER') {
            return <Button value={user} onClick={() => {changeUserType(user, 'ADMIN')}}>Convertir en Administrador</Button>
        }
        else if (user.type == 'ADMIN') {
            return <Button value={user} onClick={() => {changeUserType(user, 'USER')}}>Convertir en Usuario</Button>
        }
    }

    // List item variables
    const listUsers = userList.map((user) => 
        <div className='item'>
        <Flex direction='row' justifyContent='left' gap='2rem'>
        <Flex direction='column'>
        <div>Nombre de usuario: {user.username}</div>
        <div>Nombre completo: {user.name} {user.surname}</div>
        <div>Correo: {user.email}</div>
        </Flex>
        <Flex direction='column' justifyContent='center'>
        <div>Estado: {status_label(user.active)}</div>
        <div>Tipo de usuario: {user.type}</div>
        </Flex>
        <div className='buttons'>
        {status_button(user)}
        {type_button(user)}
        <Button onClick={() => {setUserDetails(user)}}>Ver</Button>
        </div>
        </Flex>
        </div>
    );

    return (
    <div>
        <h2>Lista de Usuarios</h2>
        <Flex direction="row">
        <div className='list'>
            {listUsers}
        </div>

        <div className="user_preview">
            <Flex direction="column">
            <h2>{userDetails.name} {userDetails.surname}</h2>
            
            <h2>{userDetails.email}</h2>
            
            <h2>{userDetails.username}</h2>

            {/* TODO: Agregar mas datos de los usuarios */}
            {!!userDetails.name ? <Button onClick={() => {deleteUser(userDetails)}}>Eliminar</Button> : <></>}
            </Flex>
        </div>
        
        </Flex>
    </div>
    )
}

export default Users_list 
