import React from 'react'
import { Flex } from '@aws-amplify/ui-react'
import DataTable from '../components/inventory_table'
import { Auth } from 'aws-amplify'

function Manage_users() {

  return (
    <div>
      Administrar usuarios
      {console.log(Auth.currentUserInfo())}
    </div>
  )
}

export default Manage_users
