import { Flex, Heading, Tabs, TabItem, Text, Loader, TextField, SelectField } from '@aws-amplify/ui-react'
import { useState, useEffect } from 'react'
import { APImethods } from '../api/APImethods';
import React from 'react'
import './profile_reservations.css'
import { Button } from 'antd';

function Profile_reservations(props) {
  // Page variables
  const [reservations, setReservations] = useState([]);
  const [deviceReservations, setDeviceReservations] = useState([]);
  const [licenceReservations, setLicenceReservations] = useState([]);
  const [roomReservations, setRoomReservations] = useState([]);

  // Select Reservations
  const [selectDeviceReservation, setSelectDeviceReservation] = useState([]);
  const [selectLicenceReservation, setSelectLicenceReservation] = useState([]);
  const [selectRoomReservation, setSelectRoomReservation] = useState([]);

  const [deviceInfo, setDeviceInfo] = useState([]);
  const [licenceInfo, setLicenceInfo] = useState([]);
  const [roomInfo, setRoomInfo] = useState([]);

  // First caller
  useEffect(() => {
    getReservations();
  }, [])

  // Get reservations
  async function getReservations() {
    const response = await APImethods.allReservationsByUser(props.userID);
    setReservations(response);
    console.log("Reservas de: ", props.userID);
    console.log(response);

    // Emptying Lists of reservations
    setDeviceReservations([]);
    setLicenceReservations([]);
    setRoomReservations([]);

    await response.map((reservation) => 
    {
      if (reservation.deviceID != null) {
        setDeviceReservations(deviceReservations => [...deviceReservations, reservation]);
      }
      if (reservation.licenceID != null) {
        setLicenceReservations(licenceReservations => [...licenceReservations, reservation]);
      }
      if (reservation.roomID != null) {
        setRoomReservations(roomReservations => [...roomReservations, reservation]);
      }
    })
  }

  // Get Info
  async function getDeviceInfo(id) {
    const response = await APImethods.getDevice(id);
    console.log("Device: ", response);
    setDeviceInfo(response);
  }
  async function getLicenceInfo(id) {
    const response = await APImethods.getLicence(id);
    console.log("Licence: ", response);
    setLicenceInfo(response);
  }
  async function getRoomInfo(id) {
    const response = await APImethods.getRoom(id);
    console.log("Room: ", response);
    setRoomInfo(response);
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

  // Reservation container and form
  const reservationContainer = (reservation) => {
    return <>
      <Flex direction='column'>
        <Heading level={3}>Datos de Reserva</Heading>
        <p>Fecha: {reservation.reservationDate}</p>
        <p hidden={reservation.reservationTime == null}>Hora: {reservation.reservationTime}</p>
        <p>Duracion: {reservation.reservationDuration} minutos</p>
        <Heading level={3}>Cambiar Reserva</Heading>
        <h3>Seleccion de inicio de la reserva</h3>
        <TextField  label='Fecha' name='date' width='100%' required type='date'/>
        <TextField  label='Hora (entre 10am y 10pm)' name='time' width='100%' required type='time' 
        hidden={reservation.reservationTime == null} labelHidden={reservation.reservationTime == null}/>
        <SelectField label='Duracion de Reserva' name='duration' placeholder='Seleccionar' width='100%' required>
            <option value={(5*24*60)}>5 dias</option>
            <option value={(10*24*60)}>10 dias</option>
            <option value={(15*24*60)}>15 dias</option>
            <option value={(20*24*60)}>20 dias</option>
        </SelectField>
        <Button onClick={async() => {
            const date = document.getElementsByName('date')[0].value;
            const time = document.getElementsByName('time')[0].value;
            const duration = parseInt(document.getElementsByName('duration')[0].value);
            await APImethods.updateReservation(
                reservation.reservationID,
                reservation.userID,
                reservation.deviceID,
                reservation.licenceID,
                reservation.roomID,
                date,
                time,
                duration
            );
            getReservations();
        }}>Cambiar Reserva</Button>
      </Flex>
    </>
  };

  // Item Lists
  const deviceList = deviceReservations.map((deviceReservation) => 
    <ReservationItem 
    reservation={deviceReservation} 
    type={1} 
    onDeleteClick={() => {deleteReservation(deviceReservation.id)}}
    onEditClick={() => {
      setSelectDeviceReservation(deviceReservation);
      console.log("Device Reservation: ", deviceReservation);
      getDeviceInfo(deviceReservation.deviceID);
    }}
    />
  );
  const licenceList = licenceReservations.map((licenceReservation) => 
    <ReservationItem 
    reservation={licenceReservation} 
    type={0}
    onDeleteClick={() => {deleteReservation(licenceReservation.id)}}
    onEditClick={() => {
      setSelectLicenceReservation(licenceReservation);
      console.log("Licence Reservation: ", licenceReservation);
      getLicenceInfo(licenceReservation.licenceID);
    }}
    />
  );
  const roomList = roomReservations.map((roomReservation) => 
    <ReservationItem 
    reservation={roomReservation} 
    type={2}
    onDeleteClick={() => {deleteReservation(roomReservation.id)}}
    onEditClick={() => {
      setSelectRoomReservation(roomReservation);
      console.log("Room Reservation: ", roomReservation);
      getRoomInfo(roomReservation.roomID);
    }}
    />
  );

  // Mutation to delete reservation
  async function deleteReservation(id) {
    const response = await APImethods.deleteReservation(id);
    console.log(response);
    getReservations();
  }

  return (
    <>
    <Heading level={1}>Mis Reservas</Heading>
    <br/>
    <Tabs spacing="equal" justifyContent="flex-start">

      <TabItem title="Equipos">
        {deviceList.length > 0 ?
        <Flex direction="row" gap="4rem">
          <div className="active">{deviceList}</div>
          <div className="reservation_details">{deviceInfoContainer}</div>
          {reservationContainer(selectDeviceReservation)}
          {/* <div className="ended"></div> */}
        </Flex>
        : <p>No hay reservas de equipos</p>}
      </TabItem>

      <TabItem title="Licencias">
        {licenceList.length > 0 ?
        <Flex direction="row" gap="4rem">
          <div className="active">{licenceList}</div>
          <div className="reservation_details">{licenceInfoContainer}</div>
          {reservationContainer(selectLicenceReservation)}
          {/* <div className="ended"></div> */}
        </Flex>
        : <p>No hay reservas de licencias</p>}
      </TabItem>

      <TabItem title="Salones">
        {roomList.length > 0 ?
        <Flex direction="row" gap="4rem">
          <div className="active">{roomList}</div>
          <div className="reservation_details">{roomInfoContainer}</div>
          {reservationContainer(selectRoomReservation)}
          {/* <div className="ended"></div> */}
        </Flex>
        : <p>No hay reservas de salones</p>}
      </TabItem>
    
    </Tabs>
    </>
  )
}

export default Profile_reservations

function ReservationItem(props) {
  const reservation = props.reservation
  const [reservationItem, setReservationItem] = useState({})
  const [ready, setReady] = useState(false)
  // Get item data [0:licence, 1:device, 2:room]
  useEffect(() => {
    async function getDevice() {
      var device = await APImethods.getDevice(reservation.deviceID)
      const image = await APImethods.getImage(device.images[0])
      device['url'] = image
      setReservationItem(device)
      setReady(true)
    }
    async function getRoom() {
      var room = await APImethods.getRoom(reservation.roomID)
      const image = await APImethods.getImage(room.images[0])
      room['url'] = image
      setReservationItem(room)
      setReady(true)
    }
    async function getLicence() {
      var licence = await APImethods.getLicence(reservation.licenceID)
      const image = await APImethods.getImage(licence.images[0]) 
      licence['url'] = image
      setReservationItem(licence)
      setReady(true)
    }

    if (props.type === 0) {
      getLicence()
    }
    else if (props.type === 1) {
      getDevice()
    }
    else if (props.type === 2) {
      getRoom()      
    }
  }, [])

  return (
    <div className='reservationItem'>
      {ready? <img src={reservationItem.url} className='itemImage'/> : <Loader />}
      <Flex direction="column" justifyContent="space-between">
        {/* Nombre */}
        <h2>{reservationItem.name}</h2>
        {/* Fecha */}
        <h2>Fecha: {reservation.reservationDate}</h2>
        {/* Hora */}
        <h2 hidden={props.type != 2}>Hora: {reservation.reservationTime}</h2>
        {/* Duracion */}
        <h2>{reservation.reservationDuration} minutos</h2>
      </Flex>
      <Button onClick={props.onEditClick}>Editar</Button>
      <Button onClick={props.onDeleteClick}>Cancelar</Button>
    </div>
  )
}
