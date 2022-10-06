import { Flex, Heading } from '@aws-amplify/ui-react'
import React from 'react'

function Manage_users() {
    // List of users
    const [userList, setUserList] = useState([]);
    const [userDetails, setUserDetails] = useState([]);

    // First caller

    
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


    return (
        <>
        <Heading level={1}>Administrar Usuarios</Heading>
        <Flex direction='row'>

        </Flex>
        </>
    )
}

export default Manage_users
