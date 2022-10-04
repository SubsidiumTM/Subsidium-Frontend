import React, { useState, useEffect } from 'react'
import { Flex, Tabs, TabItem, Heading } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';
import { APImethods } from "../api/APImethods";
import { Button, Calendar } from 'antd';

import './inventory_view.css';

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

    // First Caller
    useEffect(() => {
        getInventoryList();
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

    // Handler for movement between tabs
    const handlerIndex = function (e) {
        const option = e.target.value;
        console.log(option)
        setIndex(option);
    }

    // List item variables
    const listRooms = rooms.map((room) => 
        <li>{room.id} {room.name} 
        <Button value={room} onClick={() => {selectRoom(room)}}>Ver</Button>
        </li>
    );

    const listLicences = licences.map((licence) => 
        <li>{licence.id} {licence.name} 
        <Button value={licence} onClick={() => {selectLicence(licence)}}>Ver</Button>
        </li>
    );

    const listDevices = devices.map((device) => 
        <li>{device.id} {device.name} 
        <Button value={devices} onClick={() => {selectDevice(device)}}>Ver</Button>
        </li>
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

    return (
        <div className='inventory_component'>
        <Heading level={1}>Inventario de Reservas</Heading>
        <Tabs
        defaultIndex={index}
        spacing="equal"
        justifyContent="flex-start">

        {/* ///////// Table and Form of Licence ///////// */}
        <TabItem title="Licence" value={0} onSelect={handlerIndex}>
        <br></br>
        <Flex direction="row" justifyContent="center">
        
        <ul>
            {listLicences}
        </ul>

        <div className="format">
            <Flex direction="row">
            {/* Description */}
            <Flex direction="column">
                <h2>{licenceInfo.name}</h2>
                <Flex direction="row">
                    <img/>
                    <Flex direction="column">
                        <h4>Caracteristicas</h4>
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
            </Flex>

            {/* Reservation Details */}
            <Flex direction="column">
                <h3>Seleccion de inicio de la reserva</h3>
                <Calendar></Calendar>
                <h3>Duracion de la reserva</h3>
                <select>
                    <option>15 min</option>
                    <option>30 min</option>
                    <option>45 min</option>
                    <option>60 min</option>
                </select>
            </Flex>
                
            </Flex>
            <br></br>
            <Flex justifyContent="center">
            <Button>Reservar</Button>
            </Flex>
        </div>

        </Flex>
        </TabItem>

        {/* ///////// Table and Form of Room ///////// */}
        <TabItem title="Room" value={1} onSelect={handlerIndex}>
        <br></br>
        <Flex direction="row" justifyContent="center">

        <ul>
            {listRooms}
        </ul>

        <div className="format">
            <Flex direction="row">
            {/* Description */}
            <Flex direction="column">
                <h2>{roomInfo.name}</h2>
                <Flex direction="row">
                    <image></image>
                    <Flex direction="column">
                        <h4>Caracteristicas</h4>
                        <li>Edificio: {roomInfo.building}</li>
                        {() => {
                            if (roomInfo.proyector)
                            return <li>Proyector</li>;
                        }}
                        {() => {
                            if (roomInfo.wifi)
                            return <li>WIFI</li>;
                        }}
                        {() => {
                            if (roomInfo.board)
                            return <li>Pizarron</li>;
                        }}
                        {() => {
                            if (roomInfo.air_conditioner)
                            return <li>Aire Acondicionado</li>;
                        }}
                        {() => {
                            if (roomInfo.ethernet)
                            return <li>Ethernet</li>;
                        }}
                        {() => {
                            if (roomInfo.computers)
                            return <li>Computadoras</li>;
                        }}
                        {() => {
                            if (roomInfo.double_monitor)
                            return <li>Monitor Doble</li>;
                        }}
                        <li>Asientos: {roomInfo.seats}</li>
                        <li>Tomas de corriente: {roomInfo.energy_outlets}</li>
                    </Flex>
                </Flex>
                <p>{roomInfo.name}</p>
            </Flex>

            {/* Reservation Details */}
            <Flex direction="column">
                <h3>Seleccion de inicio de la reserva</h3>
                <Calendar></Calendar>
                <h3>Duracion de la reserva</h3>
                <select>
                    <option>15 min</option>
                    <option>30 min</option>
                    <option>45 min</option>
                    <option>60 min</option>
                </select>
            </Flex>
                
            </Flex>
            <br></br>
            <Flex justifyContent="center">
            <Button>Reservar</Button>
            </Flex>
        </div>
        
        </Flex>
        </TabItem>

        {/* ///////// Table and Form of Device ///////// */}
        <TabItem title="Device" value={2} onSelect={handlerIndex}>
        <br></br>
        <Flex direction="row" justifyContent="center">

        <ul>
            {listDevices}
        </ul>

        <div className="format">
            <Flex direction="row">
            {/* Description */}
            <Flex direction="column">
                <h2>{deviceInfo.name}</h2>
                <Flex direction="row">
                    <img/>
                    <Flex direction="column">
                        <h4>Caracteristicas</h4>
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
            </Flex>

            {/* Reservation Details */}
            <Flex direction="column">
                <h3>Seleccion de inicio de la reserva</h3>
                <Calendar></Calendar>
                <h3>Duracion de la reserva</h3>
                <select>
                    <option>15 min</option>
                    <option>30 min</option>
                    <option>45 min</option>
                    <option>60 min</option>
                </select>
            </Flex>
                
            </Flex>
            <br></br>
            <Flex justifyContent="center">
            <Button>Reservar</Button>
            </Flex>
        </div>
        
        </Flex>
        </TabItem>

        </Tabs>
        </div>
    )
}

export default InventorySelection
