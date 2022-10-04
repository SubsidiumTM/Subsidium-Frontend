import React from 'react'

import DataTable from '../components/inventory_table';
import { APImethods } from '../api/APImethods';

import InventorySelection from '../components/inventory_view';

import SubsidiumAuth from '../components/AuthenticationWrap';

function Inventory() {

  return (
    <SubsidiumAuth jsx={ <InventorySelection />} />
  )
}

export default Inventory;