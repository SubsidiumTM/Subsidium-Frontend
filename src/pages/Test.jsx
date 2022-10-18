import React, { useState, useEffect } from 'react'
import { Storage } from 'aws-amplify'
import Image from '../components/image'
import { APImethods } from '../api/APImethods'
import { Loader, SelectField, Flex, Alert } from '@aws-amplify/ui-react'

// For DateInput
import { DatePicker, TimePicker } from 'antd'
import moment from 'moment'
import { PDFViewer, Document, Page, Text, View } from '@react-pdf/renderer'

// For Stats
import { Chart } from 'react-google-charts'

import TableOne from '../components/TableOne'

import TableTwo from '../components/TableTopRooms'

import TableThree from '../components/TableTopDevices'

function Test() {
    const [unavailableDates, setUnavailableDates] = useState([])

    const [reservations, setReservations] = useState([]);
    const [deviceReservations, setDeviceReservations] = useState([]);
    const [licenceReservations, setLicenceReservations] = useState([]);
    const [roomReservations, setRoomReservations] = useState([]);
    const [alert, setAlert] = useState([]);

    // First caller
    useEffect(() => {
        getReservations();
    }, [])

    // Get reservations
    async function getReservations() {
        const response = await APImethods.allReservations();
        setReservations(response);

        // Emptying Lists of reservations
        setDeviceReservations([]);
        setLicenceReservations([]);
        setRoomReservations([]);

        await response.map((reservation) => 
        {
        if (reservation.deviceID != null) {
            setDeviceReservations(deviceReservations => [...deviceReservations, 
            {date: reservation.reservationDate, time: reservation.reservationTime, duration: reservation.reservationDuration}
        ]);
        }
        if (reservation.licenceID != null) {
            setLicenceReservations(licenceReservations => [...licenceReservations,
            {date: reservation.reservationDate, time: reservation.reservationTime, duration: reservation.reservationDuration}
        ]);
        }
        if (reservation.roomID != null) {
            setRoomReservations(roomReservations => [...roomReservations,    
            {date: reservation.reservationDate, time: reservation.reservationTime, duration: reservation.reservationDuration}
        ]);
        }
        })
    }

    const reservations2 = [
        {date: "2022-10-14", days: 12},
        {date: "2022-10-31", days: 5},
        {date: "2022-11-7", days: 2},
    ]

    return (
        <div>
        <h1>Pruebas</h1>


        <button onClick={() => {
            console.log(deviceReservations);
            console.log(licenceReservations);
            console.log(roomReservations);
        }}>See Reservations</button>

        <button onClick={() => {
            // Pushback alert to the list
            setAlert(alert => [...alert, 
            <Alert variation="success" heading="This is the heading" 
            isDismissible={true}
            onDismiss={() => setAlert([])}>
            Cool heading!
            </Alert>]);
        }}>Ver Alerta</button>

        {alert}
        <PDFViewer style={{width:'80%', height:'60vh'}}>
        <Document>
            <Page size="A4">
                <View>
                    <Text>Reservas de dispositivos</Text>
                    {/* <TableOne data={deviceReservations} /> */}
                </View>
            </Page>
        </Document>
        </PDFViewer>
        
        </div>
    )
}

export default Test