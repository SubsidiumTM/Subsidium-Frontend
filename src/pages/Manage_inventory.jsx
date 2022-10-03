import React from 'react';
import { Flex } from '@aws-amplify/ui-react';
import Manager from '../components/manage_inventory';
import SubsidiumAuth from '../components/AuthenticationWrap';

function Manage_inventory() {

  return (
    <SubsidiumAuth jsx={<Manager />} />
  )
}

export default Manage_inventory
