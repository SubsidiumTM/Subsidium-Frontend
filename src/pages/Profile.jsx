import React from 'react'
import SubsidiumAuth from '../components/AuthenticationWrap'
import Profile_menu from '../components/profile_menu'
import '../components/profileIntro.css'

function Profile() {
  return (

    <body className='profileBack'>
    <SubsidiumAuth jsx={

    <Profile_menu />

    }/>
    </body>

  )
}

export default Profile
