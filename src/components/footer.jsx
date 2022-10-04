import React from 'react'

import { Flex } from '@aws-amplify/ui-react'

import './footer.css'

function Footer() {
  return (
    <Flex className='footer' direction="row" justifyContent="center">
        <a href="/sobre-nosotros">Sobre Nosotros</a>
    </Flex>
  )
}

export default Footer
