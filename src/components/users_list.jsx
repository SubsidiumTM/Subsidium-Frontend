import { Button } from 'antd';
import React, { useState, useEffect } from 'react'
import { Flex } from '@aws-amplify/ui-react';
import { APImethods } from '../api/APImethods'

const Users_list = () => {

    // List of users
    const [userList, setUserList] = useState([]);

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

    const status_button = (user) => {
        if (user.active) {
            return <Button value={user} onClick={() => {}}>Desactivar</Button>
        }
        else {
            return <Button value={user} onClick={() => {}}>Activar</Button>
        }
    }

    // List item variables
    const listUsers = userList.map((user) => 
        <li>
        {user.username} / 
        {user.name} {user.surname} / 
        {user.email} / 
        Estado: {status_label(user.active)} / 
        Tipo de usuario: {user.type} / 
        {status_button(user)}
        <Button value={user} onClick={() => {}}>Ver</Button>
        </li>
    );

    return (
    <div>
        <h2>Lista de Usuarios</h2>
        <Flex direction="row">
        <ul>
            {listUsers}
        </ul>


        
        </Flex>
    </div>
    )
}

export default Users_list 
