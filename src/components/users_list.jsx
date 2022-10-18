import { Button } from 'antd';
import React, { useState, useEffect } from 'react'
import { Flex, Heading } from '@aws-amplify/ui-react';
import { APImethods } from '../api/APImethods'
import { Auth } from 'aws-amplify';
import { message, Popconfirm } from 'antd';

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
        message.success('Usuario Activado');
    }

    async function makeUserInactive (e) {
        e.active = false;
        await APImethods.updateUser(e.id, e.username, e.name, e.surname, e.email, e.type, e.verified, e.active);
        retrieveUsers();
        message.success('Usuario Desactivado');
    }

    async function changeUserType (e, type) {
        e.type = type;
        await APImethods.updateUser(e.id, e.username, e.name, e.surname, e.email, e.type, e.verified, e.active);
        retrieveUsers();
        message.success('Tipo de usuario cambiado a ', type);
    }

    async function deleteUser (e) {
        await APImethods.deleteUser(e.id)
        console.log(e.id);
        retrieveUsers();
        message.success('Usuario eliminado');
    }

    // Status of user
    const status_button = (user) => {
        if (user.active) {
            return <Popconfirm
            title="¿Estás seguro de deshabilitar este usuario?"
            onConfirm={() => {makeUserInactive(user)}}
            okText="Si"
            cancelText="No">
            <Button>Desactivar</Button>
            </Popconfirm>
        }
        else {
            return <Popconfirm
            title="¿Estás seguro de deshabilitar este usuario?"
            onConfirm={() => {makeUserActive(user)}}
            okText="Si"
            cancelText="No">
            <Button>Activar</Button>
            </Popconfirm>
        }
    }

    // Type of user
    const type_button = (user) => {
        if (user.type == 'USER') {
            return <Popconfirm
            title="¿Estás seguro de convertir este usuario a administrador?"
            onConfirm={() => {changeUserType(user, 'ADMIN')}}
            okText="Si"
            cancelText="No">
            <Button>Convertir en Administrador</Button>
            </Popconfirm> 
        }
        else if (user.type == 'ADMIN') {
            return <Popconfirm
            title="¿Estás seguro de eliminar este administrador a usuario?"
            onConfirm={() => {changeUserType(user, 'USER')}}
            okText="Si"
            cancelText="No">
            <Button>Convertir en Usuario</Button>
            </Popconfirm>
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
        <Heading level={1}>Lista de Usuarios</Heading>
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
            {!!userDetails.name ? 
            <Popconfirm
            title="¿Estás seguro de eliminar este usuario?"
            onConfirm={() => {deleteUser(userDetails)}}
            okText="Si"
            cancelText="No">
            <Button>Eliminar</Button> 
            </Popconfirm>
            : 
            <></>}
            </Flex>
        </div>
        
        </Flex>
    </div>
    )
}

export default Users_list 
