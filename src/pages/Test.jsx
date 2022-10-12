import React, { useState, useEffect } from 'react'
import { Storage } from 'aws-amplify'
import Image from '../components/image'
import { APImethods } from '../api/APImethods'
import { Loader, SelectField, Flex } from '@aws-amplify/ui-react'

// For DateInput
import { DatePicker, TimePicker } from 'antd'
import moment from 'moment'

// For Stats
import { Chart } from 'react-google-charts'

function Test() {
    const [unavailableDates, setUnavailableDates] = useState([])

    const [reservations, setReservations] = useState([]);
    const [deviceReservations, setDeviceReservations] = useState([]);
    const [licenceReservations, setLicenceReservations] = useState([]);
    const [roomReservations, setRoomReservations] = useState([]);

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

        <DateInput 
        unavailableDates={reservations2}
        onDurationChange={
            (days) => {
                console.log('duration:', days);
            }
        }
        onDateChange={
            (date) => {
                console.log('date:', date);
            }
        }
        />

        <TimeInput
        />

        <StatsDonut
        />
        
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
    const data = [
        ["Tipo de Recusro", "Frecuencia"],
        ["Licencia", 11],
        ["Equipos", 2],
        ["Salones", 2],
    ];
      
    const options = {
        title: "Distribución de Reservas",
        pieHole: 0.3,
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