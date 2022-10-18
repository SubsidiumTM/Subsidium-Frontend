import { resolveReadonlyArrayThunk } from 'graphql'
import React from 'react'
import { APImethods } from '../api/APImethods'
import {} from '@react-pdf/renderer'
import { Heading } from '@aws-amplify/ui-react'

import TableOne from './TableOne'

import TableTwo from './TableTopRooms'

import TableThree from './TableTopDevices'

import TableFour from './PieChartUserReservation'

import Tablefive from './PieChartBlockedVerifiedUsers'

import Tablesix from './TableLeastLicences'

import Tableseven from './TableLeastDevices'

import TableEigth from './TableLeastRooms'

function Statistics() {
    const [reservations, setReservations] = React.useState([])


    return (
        <>
        <Heading level={1}>Estadisticas</Heading>
        <Tablefive />
        <TableOne />
        <TableTwo />
        <TableThree />
        {/* <TableFour /> */}
        <Tablesix />
        <Tableseven />
        <TableEigth />
        </>
    )
}

export default Statistics



