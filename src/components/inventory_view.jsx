import React, { useState, useEffect } from 'react'
import { Flex, Tabs, TabItem, Heading, TextField, Text, SelectField, Loader } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';
import { APImethods } from "../api/APImethods";
import { Button } from 'antd';
import './inventory_view.css';
import moment from 'moment';

const InventorySelection = () => {
    // Information required on the page
    const [userID, setUserID] = useState("");
    const [licenceID, setLicenceID] = useState("");
    const [roomID, setRoomID] = useState("");
    const [deviceID, setDeviceID] = useState("");

    // Description of Inventory
    const [licenceInfo, setLicenceInfo] = useState([]);
    const [roomInfo, setRoomInfo] = useState([]);
    const [deviceInfo, setDeviceInfo] = useState([]);

    // States of the Page
    const [devices, setDevices] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [licences, setLicences] = useState([]);
    const [index, setIndex] = useState(0);
    const [startDate, setStartDate] = useState(new Date());

    // First Caller
    useEffect(() => {
        getInventoryList();
        confirmUserRegistration();
        confirmUserRegistration();
    }, [],);

    // Confirms if user is registered or registers if not
    async function confirmUserRegistration() {
        const response = await Auth.currentUserInfo();
        const username = response.username;
        const response2 = await APImethods.getUser(username);
        if (response2.listUsers.items.length == 0) {
            console.log("Registrando")
            console.log(response)
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
            console.log("Ya esta registrado")
        }
    }

    // Retreives the list of devices, licences and rooms
    async function getInventoryList() {
        const listLicences = await APImethods.allLicences();
        setLicences(listLicences);
        const listRooms = await APImethods.allRooms();
        setRooms(listRooms);
        const listDevices = await APImethods.allDevices();
        setDevices(listDevices);
        console.log(listRooms)
        console.log(listDevices)
        console.log(listLicences)
    }

    // List item variables
    const listRooms = rooms.map((room) =>
        <Item 
        item={room} 
        onSelectClick={() => {
            selectRoom(room)
        }} 
        />
    );
    const listLicences = licences.map((licence) => 
        <Item 
        item={licence} 
        onSelectClick={() => {
            selectLicence(licence)
        }} 
        />
    );
    const listDevices = devices.map((device) => 
        <Item 
        item={device} 
        onSelectClick={() => {
            selectDevice(device)
        }} 
        />
    );

    // Fill in formats
    function selectRoom (e) {
        setRoomInfo(e)
        setRoomID(e.id)
    }
    function selectLicence (e) {
        setLicenceInfo(e)
        setLicenceID(e.id)
    }
    function selectDevice (e) {
        setDeviceInfo(e)
        setDeviceID(e.id)
    }

    // Info containers
    const roomInfoContainer = <>
        <Heading level={3}>{roomInfo.name}</Heading>
        <Flex direction="row">
            <image></image>
            <Flex direction="column">
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
            <img/>
            <Flex direction="column">
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
            <img/>
            <Flex direction="column">
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

    const disabledDate = (current) => {
        // Can not select days before today and today
        return current && current < moment().endOf('day') && moment("20221015", "YYYYMMDD").fromNow();
    };

    return (
        <div className='inventory_component'>
        <Heading level={1}>Inventario de Reservas</Heading>
        <Tabs
        defaultIndex={index}
        spacing="equal"
        justifyContent="flex-start">

        {/* ///////// Table and Form of Licence ///////// */}
        <TabItem title="Licence">
        <br></br>
        <Flex direction="row" justifyContent="center" gap='2rem'>
        {/* ////////// TABLE ////////// */}
        <div className='itemList'>
            {listLicences}
        </div>
        {/* ////////// FORM ////////// */}
        <div className="format">
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
                
                <TextField  
                label='Fecha' 
                name='dateLicence' 
                placeholder='DD/MM/AAAA' 
                width='100%' 
                required type='date'
                d
                />
                <SelectField label='Duracion de Reserva' name='licenceDuration' placeholder='Seleccionar' width='100%' required>
                    <option value={(5*24*60)}>5 dias</option>
                    <option value={(10*24*60)}>10 dias</option>
                    <option value={(15*24*60)}>15 dias</option>
                    <option value={(20*24*60)}>20 dias</option>
                </SelectField>
            </Flex>
                
            </Flex>
            <br></br>
            <Flex justifyContent="center">
            <Button onClick={async() => {
                if (userID === '' |
                    licenceID === '' |
                    document.getElementsByName('dateLicence')[0].value === '' |
                    document.getElementsByName('licenceDuration')[0].value === '') {
                    alert('Por favor complete todos los campos')
                }
                else {
                    console.log(userID)
                    console.log(licenceID)
                    console.log(document.getElementsByName('dateLicence')[0].value)
                    console.log(parseInt(document.getElementsByName('licenceDuration')[0].value))
                    await APImethods.createReservation(
                        userID,
                        null,
                        licenceID,
                        null,
                        document.getElementsByName('dateLicence')[0].value,
                        null,
                        parseInt(document.getElementsByName('licenceDuration')[0].value),
                        "PENDIENTE"            
                    )
                    document.getElementsByName('dateLicence')[0].value = ''
                    document.getElementsByName('licenceDuration')[0].value = ''
                    console.log('Reserva creada')
                }
            }}>Reservar</Button>
            </Flex>
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
        <div className="format">
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
                <TextField  label='Fecha' name='dateRoom' placeholder='DD/MM/AAAA' width='100%' required type='date'/>
                <TextField  label='Hora (entre 10am y 10pm)' name='timeRoom' width='100%' required type='time'/>
                <SelectField label='Duracion de Reserva' name='roomDuration' placeholder='Seleccionar' width='100%' required>
                    <option value={15}>15 min</option>
                    <option value={30}>30 min</option>
                    <option value={45}>45 min</option>
                    <option value={60}>60 min</option>
                </SelectField>
            </Flex>
                
            </Flex>
            <br></br>
            <Flex justifyContent="center">
            <Button onClick={async () => {
                if (userID === '' |
                    roomID === '' |
                    document.getElementsByName('dateRoom')[0].value === '' |
                    document.getElementsByName('timeRoom')[0].value === '' |
                    document.getElementsByName('roomDuration')[0].value === '') {
                    alert('Por favor complete todos los campos')
                }
                else {
                    console.log(userID)
                    console.log(roomID)
                    console.log(document.getElementsByName('dateRoom')[0].value)
                    console.log(document.getElementsByName('timeRoom')[0].value)
                    console.log(parseInt(document.getElementsByName('roomDuration')[0].value))
                    await APImethods.createReservation(
                        userID,
                        null,
                        null,
                        roomID,
                        document.getElementsByName('dateRoom')[0].value,
                        document.getElementsByName('timeRoom')[0].value,
                        parseInt(document.getElementsByName('roomDuration')[0].value),
                        "PENDIENTE"
                    )
                    document.getElementsByName('dateRoom')[0].value = ''
                    document.getElementsByName('timeRoom')[0].value = ''
                    document.getElementsByName('roomDuration')[0].value = ''
                    console.log('Reserva creada')
                }
            }}>Reservar</Button>
            </Flex>
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
        <div className="format">
            <Flex direction="row">
            {/* Description */}
            <div className="description">
            <Flex direction="column">
                {deviceInfoContainer}
            </Flex>
            </div>
            {/* Reservation Details */}
            <Flex direction="column">
                <Heading level={3}>Reservar</Heading>
                <h3>Seleccion de inicio de la reserva</h3>
                <TextField  label='Fecha' name='dateDevice' placeholder='DD/MM/AAAA' width='100%' required type='date'/>
                <SelectField label='Duracion de Reserva' name='deviceDuration' placeholder='Seleccionar' width='100%' required>
                    <option value={(5*24*60)}>5 dias</option>
                    <option value={(10*24*60)}>10 dias</option>
                    <option value={(15*24*60)}>15 dias</option>
                    <option value={(20*24*60)}>20 dias</option>
                </SelectField>
            </Flex>
                
            </Flex>
            <br></br>
            <Flex justifyContent="center">
            <Button onClick={() => {
                if (userID === '' |
                    deviceID === '' |
                    document.getElementsByName('dateDevice')[0].value === '' |
                    document.getElementsByName('deviceDuration')[0].value === '') {
                    alert('Por favor complete todos los campos')
                }
                else {
                    console.log(userID)
                    console.log(deviceID)
                    console.log(document.getElementsByName('dateDevice')[0].value)
                    console.log(parseInt(document.getElementsByName('deviceDuration')[0].value))
                    APImethods.createReservation(
                        userID,
                        deviceID,
                        null,
                        null,
                        document.getElementsByName('dateDevice')[0].value,
                        null,
                        parseInt(document.getElementsByName('deviceDuration')[0].value),
                        "PENDIENTE"            
                    )
                    document.getElementsByName('dateDevice')[0].value = ''
                    document.getElementsByName('deviceDuration')[0].value = ''
                    console.log('Reserva creada')
                }
            }}>Reservar</Button>
            </Flex>
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

function Date_input() {
  return (
    <div>
      
    </div>
  )
}

// React component of a date input that disables the past dates and the dates that are not available
// function Date_input(props) {
//     const [date, setDate] = useState(new Date());
//     const [availableDates, setAvailableDates] = useState([]);
//     const [disabledDates, setDisabledDates] = useState([]);
    
//     useEffect(() => {
//         async function getAvailableDates() {
//         const dates = await APImethods.getAvailableDates(props.roomID);
//         setAvailableDates(dates);
//         }
//         getAvailableDates();
//     }, []);
    
//     useEffect(() => {
//         let disabledDates = [];
//         for (let i = 0; i < availableDates.length; i++) {
//         const date = new Date(availableDates[i]);
//         if (date < new Date()) {
//             disabledDates.push(date);
//         }
//         }
//         setDisabledDates(disabledDates);
//     }, [availableDates]);
    
//     const handleDateChange = (date) => {
//         setDate(date);
//         props.onDateChange(date);
//     };
    
//     return (
//         <div>
//         <DatePicker
//             selected={date}
//             onChange={handleDateChange}
//             minDate={new Date()}
//             filterDate={(date) => {
//             for (let i = 0; i < disabledDates.length; i++) {
//                 if (date.getTime() === disabledDates[i].getTime()) {
//                 return false;
//                 }
//             }
//             return true;
//             }}
//         />
//         </div>
//     );
// }