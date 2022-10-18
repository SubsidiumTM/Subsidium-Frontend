import React, { useState, useEffect } from 'react'
import { Storage } from 'aws-amplify'
import Image from '../components/image'
import { APImethods } from '../api/APImethods'
import { Loader, SelectField, Flex, Alert } from '@aws-amplify/ui-react'

// For DateInput
import { DatePicker, TimePicker } from 'antd'
import moment from 'moment'
//{ PDFViewer, Document, Page, Text, View } from '@react-pdf/renderer'

// For Stats
import { Chart } from 'react-google-charts'

import TableOne from '../components/TableOne'

import TableTwo from '../components/TableTopRooms'

import TableThree from '../components/TableTopDevices'

import TableFour from '../components/PieChartUserReservation'

import Tablefive from '../components/PieChartBlockedVerifiedUsers'

import Tablesix from '../components/TableLeastLicences'

import Tableseven from '../components/TableLeastDevices'

import TableEigth from '../components/TableLeastRooms'

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

        <TimeInput
        />

        <StatsDonut
        />

        <TableOne/>
        <TableTwo/>
        <TableThree/>
        <TableFour/>
        <Tablefive/>
        <Tablesix/>
        <Tableseven/>
        <TableEigth/>
        
        </div>
    )
}

export default Test


function DateInput(props) {
    const [availableReservationDays, setAvailableReservationDays] = useState(0)

    function disabledDate(current) {
        // Can not select sundays and predfined days
        return (isInDisabledDateRange(current)
        || current < moment().subtract(1, 'days')
        || current > moment().add(3, 'months'))
    }

    function isInDisabledDateRange(date) {
        const unavailableDates = props.unavailableDates
        for (let i = 0; i < unavailableDates.length; i++) {
        for (let j = 0; j < unavailableDates[i].days; j++) {
            if (moment(date).format('YYYY-MM-DD') === moment(unavailableDates[i].date).add(j, 'days').format('YYYY-MM-DD')) {
                return true
            }
        }
        }
    }

    function daysToUnavailableDate(date) {
        const unavailableDates = props.unavailableDates
        for (let i = 0; i < unavailableDates.length; i++) {
        for (let j = 0; j < 15; j++) { // 15 is the maximum number of days that can be reserved
            
            if (moment(date).isBefore(moment(unavailableDates[i].date))) {

            if (moment(date).add(j, 'days').format('YYYY-MM-DD') === moment(unavailableDates[i].date).format('YYYY-MM-DD')) {
                setAvailableReservationDays(j);
                return;
            }

            }
        }
        }
        setAvailableReservationDays(15);
    }

    const options = () => {
        const options = []
        for (let i = 1; i <= availableReservationDays; i++) {
        options.push(<option key={i} value={i}>{i}</option>)
        }
        return options
    }

    return (
        <Flex direction='column'>
        <DatePicker 
        disabledDate={disabledDate}
        onChange={(date) => {
            if (date === null) {
                setAvailableReservationDays(0)
                props.onDateChange(null)
                props.onDurationChange(null)
            }
            else {
                daysToUnavailableDate(date)
                props.onDateChange(moment(date).format('YYYY-MM-DD'))
            }
        }}
        size='large'
        />
        <SelectField 
        label='Duración' 
        placeholder='Selecciona una opción' 
        size='large'
        onChange={(e) => {
            props.onDurationChange(e.target.value)
        }}
        >
            {options()}
        </SelectField>
        </Flex>
    )
}

function TimeInput() {

    return (
        <Flex direction='column'>
        <DatePicker 
        size='large'
        />
        <TimePicker
        format='HH:mm'
        disabledHours={() => {
            const hours = []
            for (let i = 0; i < 24; i++) {
            hours.push(i)
            }
            return hours
        }}
        minuteStep={15}
        size='large'
        />
        </Flex>
    )
}

// Percentage by Type of Reservation
function StatsDonut(props) {

    /*const data = [
        ["Month", "Macbook Pro", "iPhone XR", "iPhone 13"],
        ["month1", 10, 2, 5],
        ["month2", 2, 3, 10],
        ["month3", 9, 1, 11],
        ["month4", 12, 8, 9],
      ];
    
      const options = {
        chart: {
          title: "Top devices of the latest months",
          subtitle: "Month 1 - Month4",
        },
      };*/

      
      return (
        /*<Chart
            chartType="Bar"
            width="100%"
            height="400px"
            data={data}
            options={options}
        />*/
        //<TableOne></TableOne>
        <TableTwo></TableTwo>
        //<TableThree></TableThree>
        //<TableFour></TableFour>
        //<Tablefive></Tablefive>
        //<Tablesix></Tablesix>
        //<Tableseven></Tableseven>
        //<TableEigth></TableEigth>
        );
}

// Percentage by Day of the Week
function StatsWeek() {
    const data = [
        ["Task", "Hours per Day"],
        ["Work", 11],
        ["Eat", 2],
        ["Commute", 2],
        ["Watch TV", 2],
        ["Sleep", 7], // CSS-style declaration
    ];
      
    const options = {
        title: "My Daily Activities",
        pieHole: 0.4,
        is3D: false,
    };

    return (
    <Chart
        chartType="PieChart"
        width="100%"
        height="400px"
        data={data}
        options={options}
    />
    );
}

function StatsFrequency() {

}