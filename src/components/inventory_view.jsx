import React, { useState, useEffect } from 'react'
import { Flex, Tabs, TabItem, Heading, TextField, Text, SelectField, Loader } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';
import { APImethods } from "../api/APImethods";
import { Button } from 'antd';
import './inventory_view.css';
// For DateInput
import { DatePicker, TimePicker } from 'antd';
import DateTimeInput from './DateTimeInput';
import moment from 'moment';
import {message} from 'antd'

const InventorySelection = () => {
    // Information required on the page
    const [userID, setUserID] = useState("");
    const [licenceID, setLicenceID] = useState("");
    const [roomID, setRoomID] = useState("");
    const [deviceID, setDeviceID] = useState("");
    const [image, setImage] = useState(<Loader />);

    // Description of Inventory
    const [licenceInfo, setLicenceInfo] = useState([]);
    const [roomInfo, setRoomInfo] = useState([]);
    const [deviceInfo, setDeviceInfo] = useState([]);

    // States of the Page
    const [devices, setDevices] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [licences, setLicences] = useState([]);

    // Reservation Time Variables
    const [selectedReservations, setSelectedReservations] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedDuration, setSelectedDuration] = useState('');    

    // First Caller
    useEffect(() => {
        getInventoryList();
        confirmUserRegistration();
        confirmUserRegistration();
    }, [],);

    async function getImage (image) {
        const url = await APImethods.getImage(image);
        setImage(<img src={url}/>);
    }

    // Confirms if user is registered or registers if not
    async function confirmUserRegistration() {
        const response = await Auth.currentUserInfo();
        const username = response.username;
        const response2 = await APImethods.getUser(username);
        if (response2.listUsers.items.length == 0) {
            await (APImethods.createUser(
                response.username,
                response.attributes.name,
                response.attributes.family_name,
                response.attributes.email,
                "USER",
                true,
                true
            ))
        }
        else {
            setUserID(response2.listUsers.items[0].id);
        }
    }
    // Retreives the list of devices, licences and rooms
    async function getInventoryList() {
        const listLicences = await APImethods.allActiveLicences();
        setLicences(listLicences);
        const listRooms = await APImethods.allActiveRooms();
        setRooms(listRooms);
        const listDevices = await APImethods.allActiveDevices();
        setDevices(listDevices);
        console.log(listRooms)
        console.log(listDevices)
        console.log(listLicences)
    }
    // Reset Reservation Selection
    function resetSelection() {
        setSelectedDate('');
        setSelectedTime('');
        setSelectedDuration('');
    }

    // List item variables
    const listRooms = rooms.map((room) =>
        <Item 
        item={room} 
        onSelectClick={async () => {
            selectRoom(room)
            resetSelection();
            const response = await APImethods.allReservationsByRoom(room.id)
            setSelectedReservations(response.map((reservation) => {
                return {
                    date: reservation.reservationDate,
                    time: reservation.reservationTime,
                    duration: reservation.reservationDuration,
                }
            }))
        }} 
        />
    );
    const listLicences = licences.map((licence) => 
        <Item 
        item={licence} 
        onSelectClick={async () => {
            selectLicence(licence)
            resetSelection();
            const response = await APImethods.allReservationsByLicence(licence.id)
            setSelectedReservations(response.map((reservation) => {
                return {
                    date: reservation.reservationDate,
                    time: reservation.reservationTime,
                    days: reservation.reservationDuration,
                }
            }))
        }} 
        />
    );
    const listDevices = devices.map((device) => 
        <Item 
        item={device} 
        onSelectClick={async () => {
            selectDevice(device)
            resetSelection();
            const response = await APImethods.allReservationsByDevice(device.id)
            setSelectedReservations(response.map((reservation) => {
                return {
                    date: reservation.reservationDate,
                    time: reservation.reservationTime,
                    days: reservation.reservationDuration,
                }
            }))
        }} 
        />
    );

    // Fill in formats
    function selectRoom (e) {
        setImage(<Loader />);
        setRoomInfo(e)
        setRoomID(e.id)
        getImage(e.images[0])
    }
    function selectLicence (e) {
        setImage(<Loader />);
        setLicenceInfo(e)
        setLicenceID(e.id)
        getImage(e.images[0])
    }
    function selectDevice (e) {
        setImage(<Loader />);
        setDeviceInfo(e)
        setDeviceID(e.id)
        getImage(e.images[0])
    }

    // Info containers
    const roomInfoContainer = <>
        <Heading level={3}>{roomInfo.name}</Heading>
        <Flex direction="row">
            <Flex direction="column">
            {image}
            <h2>Caracteristicas</h2>
            <li>Edificio: {roomInfo.building}</li>
            <li hidden={!roomInfo.proyector}>Proyector</li>
            <li hidden={!roomInfo.wifi}>WIFI</li>
            <li hidden={!roomInfo.board}>Pizarron</li>
            <li hidden={!roomInfo.air_conditioner}>Aire Acondicionado</li>
            <li hidden={!roomInfo.ethernet}>Ethernet</li>
            <li hidden={!roomInfo.computers}>Computadoras</li>
            <li hidden={!roomInfo.double_monitor}>Monitor Doble</li>
            <li>Asientos: {roomInfo.seats}</li>
            <li>Tomas de corriente: {roomInfo.energy_outlets}</li>
            </Flex>
        </Flex>
        <p>{roomInfo.description}</p>
    </>;
    const licenceInfoContainer = <>
        <Heading level={3}>{licenceInfo.name}</Heading>
        <Flex direction="row">
            <Flex direction="column">
                {image}
                <h2>Caracteristicas</h2>
                <li>Año {licenceInfo.year}</li>
                <li>
                    Compatible con:
                    <ul>
                    <li>{licenceInfo.compatibility}</li>
                    </ul>
                </li>
                <li>Categorias:
                    <ul>
                    <li>{licenceInfo.category}</li>
                    </ul>
                </li>
            </Flex>
        </Flex>
        <p>{licenceInfo.description}</p>
    </>;
    const deviceInfoContainer = <>
        <Heading level={3}>{deviceInfo.name}</Heading>
        <Flex direction="row">
            <Flex direction="column">
                {image}
                <h2>Caracteristicas</h2>
                {() => {
                    if (deviceInfo.portable) {
                    return <li>Portatil</li>;
                    }
                    else {
                    return <li>Escritorio</li>
                    }
                }}
                <li>Sistema Operativo: {deviceInfo.os}</li>
                <li>Almacenamiento: {deviceInfo.storage} GB</li>
                <li>Memoria: {deviceInfo.ram} GB</li>
            </Flex>
        </Flex>
        <p>{deviceInfo.description}</p>
    </>;

    const handleDateChange = (date) => {
        console.log('date:', date);
        setSelectedDate(date)
    }
    const handleTimeChange = (time) => {
        console.log('time:', time);
        setSelectedTime(time)
    }
    const handleDurationChange = (days) => {
        console.log('duration:', days);
        setSelectedDuration(days)
    }

    return (
        <div className='inventory_component'>
        <Heading level={1}>Inventario de Reservas</Heading>
        <Tabs spacing="equal" justifyContent="flex-start">

        {/* ///////// Table and Form of Licence ///////// */}
        <TabItem title="Licence">
        <br></br>
        <Flex direction="row" justifyContent="center" gap='2rem'>
        {/* ////////// TABLE ////////// */}
        <div className='itemList'>
            {listLicences}
        </div>
        {/* ////////// FORM ////////// */}
        <div className="format" key={licenceID}>
            {licenceID === "" ?
            <></>
            : 
            <>
            <Flex direction="row">
            {/* Description */}
            <div className="description">
            <Flex direction="column">
                {licenceInfoContainer}
            </Flex>
            </div>
            {/* Reservation Details */}
            <Flex direction="column" className='reservation'>
                <Heading level={3}>Reservar</Heading>
                <h3>Seleccion de inicio de la reserva</h3>
                <DateInput
                value={selectedDate}
                unavailableDates={selectedReservations}
                onDurationChange={handleDurationChange}
                onDateChange={handleDateChange}
                />
            </Flex>
                
            </Flex>
            <br></br>
            <Flex justifyContent="center">
            <Button onClick={async() => {
                if (userID === '' ||
                    licenceID === '' ||
                    selectedDate === '' ||
                    selectedDuration === '') {
                    // alert('Por favor complete todos los campos o cambie la fecha de reserva')
                    message.error('Por favor complete todos los campos o cambie la fecha de reserva')
                }
                else {
                    console.log(userID)
                    console.log(licenceID)
                    // Make reservation
                    await APImethods.createReservation(
                        userID,
                        null,
                        licenceID,
                        null,
                        selectedDate,
                        null,
                        parseInt(selectedDuration),
                        "PENDIENTE"            
                    )
                    message.success('Reserva creada con exito')
                    // Update calendar
                    const response = await APImethods.allReservationsByLicence(licenceID)
                    setSelectedReservations(response.map((reservation) => {
                        return {
                            date: reservation.reservationDate,
                            time: reservation.reservationTime,
                            days: reservation.reservationDuration,
                        }
                    }))
                    // Reset Variables
                    resetSelection();
                    console.log('Reserva creada')
                }
            }}>Reservar</Button>
            </Flex>
            </>}
        </div>

        </Flex>
        </TabItem>

        {/* ///////// Table and Form of Room ///////// */}
        <TabItem title="Room">
        <br></br>
        <Flex direction="row" justifyContent="center" gap='2rem'>
        {/* ////////// TABLE ////////// */}
        <div className='itemList'>
            {listRooms}
        </div>
        {/* ////////// FORM ////////// */}
        <div className="format" key={roomID}>
            {roomID === "" ?
            <></>
            :
            <>
            <Flex direction="row">
            {/* Description */}
            <div className="description">
            <Flex direction="column">
                {roomInfoContainer}
            </Flex>
            </div>

            {/* Reservation Details */}
            <Flex direction="column">
                <Heading level={3}>Reservar</Heading>
                <h3>Seleccion de inicio de la reserva</h3>
                <DateTimeInput
                reservations={selectedReservations}
                onDateChange={handleDateChange}
                onTimeChange={handleTimeChange}
                onDurationChange={handleDurationChange}
                />
            </Flex>
                
            </Flex>
            <br></br>
            <Flex justifyContent="center">
            <Button onClick={async () => {
                if (userID === '' ||
                    roomID === '' ||
                    selectedDate === '' ||
                    selectedTime === '' ||
                    selectedDuration === 0) {
                    // alert('Por favor complete todos los campos')
                    message.error('Por favor complete todos los campos o cambie la fecha de reserva')
                }
                else {
                    console.log(userID)
                    console.log(roomID)
                    await APImethods.createReservation(
                        userID,
                        null,
                        null,
                        roomID,
                        selectedDate,
                        selectedTime,
                        parseInt(selectedDuration),
                        "PENDIENTE"
                    )
                    message.success('Reserva creada con exito')
                    resetSelection();
                    console.log('Reserva creada')
                }
            }}>Reservar</Button>
            </Flex>
            </>}
        </div>
        
        </Flex>
        </TabItem>

        {/* ///////// Table and Form of Device ///////// */}
        <TabItem title="Device">
        <br></br>
        <Flex direction="row" justifyContent="center" gap='2rem'>
        {/* ////////// TABLE ////////// */}
        <div className='itemList'>
            {listDevices}
        </div>
        {/* ////////// FORM ////////// */}
        <div className="format" key={deviceID}>
            {deviceID === "" ?
            <></>
            :
            <>
            <Flex direction="row">
            {/* Description */}
            <div className="description">
            <Flex direction="column">
                {deviceInfoContainer}
            </Flex>
            </div>
            {/* Reservation Details */}
            <Flex direction="column" className='reservation'>
                <Heading level={3}>Reservar</Heading>
                <h3>Seleccion de inicio de la reserva</h3>
                <DateInput
                value={selectedDate}
                unavailableDates={selectedReservations}
                onDurationChange={handleDurationChange}
                onDateChange={handleDateChange}
                />
            </Flex>
                
            </Flex>
            <br></br>
            <Flex justifyContent="center">
            <Button onClick={async () => {
                if (userID === '' ||
                    deviceID === '' ||
                    selectedDate === '' ||
                    selectedDuration === '') {
                    // alert('Por favor complete todos los campos')
                    message.error('Por favor complete todos los campos o cambie la fecha de reserva')
                }
                else {
                    console.log(userID)
                    console.log(deviceID)
                    // Make reservation
                    await APImethods.createReservation(
                        userID,
                        deviceID,
                        null,
                        null,
                        selectedDate,
                        null,
                        parseInt(selectedDuration),
                        "PENDIENTE"            
                    )
                    message.success('Reserva creada con exito')
                    // Update calendar
                    const response = await APImethods.allReservationsByDevice(deviceID)
                    setSelectedReservations(response.map((reservation) => {
                        return {
                            date: reservation.reservationDate,
                            time: reservation.reservationTime,
                            days: reservation.reservationDuration,
                        }
                    }))
                    // Reset Variables
                    resetSelection();
                    console.log('Reserva creada')
                }
            }}>Reservar</Button>
            </Flex>
            </>}
        </div>
        
        </Flex>
        </TabItem>

        </Tabs>
        </div>
    )
}

export default InventorySelection

function Item(props) {
    const item = props.item;
    const [ready, setReady] = useState(false)
    const [imageURL, setImageURL] = useState('');

    useEffect(() =>{
        async function getImage(){
            const url = await APImethods.getImage(item.images[0]);
            setImageURL(url);
            item['imageURL'] = url;
        }
        getImage();        
        setReady(true);
    }, []);

    return (
        <div className="item">
        {ready? <img src={imageURL} width="100%" height="100%"/> : <Loader />}
        <h2>{item.name}</h2>
        <Button value={item} onClick={props.onSelectClick}>Ver</Button>
        </div>
    )
}

function DateInput(props) {

    console.log("unavailable days", props.unavailableDates)

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

    function daysToUnavailableDate2(selectedDate){
        const daysToDates = props.unavailableDates
            .map(a => moment(a.date))
            .filter(date => date.isAfter(selectedDate))
            .map(date => date.diff(selectedDate, "days") + 1)
        let days = Math.min(...daysToDates)
        days = Math.min(15, days)
        setAvailableReservationDays(days)
    }

    function daysToUnavailableDate(date) {
        const unavailableDates = props.unavailableDates
        let minDays = 15;
        for (let i = 0; i < unavailableDates.length; i++) {
            console.log("unavailable date", unavailableDates[i].date)
            if (moment(date).isBefore(moment(unavailableDates[i].date))) {
                for (let j = 0; j < 15; j++) { // 15 is the maximum number of days that can be reserved
                    if (moment(date).add(j, 'days').format('YYYY-MM-DD') === moment(unavailableDates[i].date).format('YYYY-MM-DD')) {
                        if (j < minDays) minDays = j;
                        console.log("available days", j)
                    }
                }
            }
        }
        setAvailableReservationDays(minDays);
        console.log("available days", 15)
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
        <Text fontSize={16}>Seleccion de inicio de la reserva</Text>
        <DatePicker 
        disabledDate={disabledDate}
        onChange={(date) => {
            if (date === null) {
                setAvailableReservationDays(0)
                props.onDateChange(null)
                props.onDurationChange(null)
            }
            else {
                console.log(props.unavailableDates)
                daysToUnavailableDate2(date)
                props.onDateChange(moment(date).format('YYYY-MM-DD'))
            }
        }}
        size='large'
        />
        <SelectField 
        label='Duración' 
        placeholder='Selecciona una opción' 
        onChange={(e) => {
            props.onDurationChange(e.target.value)
        }}
        >
            {options()}
        </SelectField>
        </Flex>
    )
}
