import React from 'react'
import { Flex } from '@aws-amplify/ui-react'
import DataTable from '../components/inventory_table'
import { Auth } from 'aws-amplify'
import SubsidiumAuth from '../components/AuthenticationWrap'
import Users_list from '../components/users_list'

function Manage_users() {

  return (
    <SubsidiumAuth jsx={

    <div>
      <h1>Administrar usuarios</h1>
      <Users_list/>
    </div>

    }/>
    
  )
}

export default Manage_users
