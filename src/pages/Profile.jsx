import React from 'react'
import SubsidiumAuth from '../components/AuthenticationWrap'

function Profile() {
  return (

    <SubsidiumAuth jsx={

    <div>
      Perfil

      <a href='/admin/recursos'>Administrar Recursos</a>
      <a href='/admin/usuarios'>Administrar Ususarios</a>

    </div>

    }/>

  )
}

export default Profile
