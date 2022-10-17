import { Flex, Heading, Tabs, TabItem, Text, Loader, TextField, SelectField } from '@aws-amplify/ui-react'
import { useState, useEffect } from 'react'
import { APImethods } from '../api/APImethods';
import React from 'react'
import './profile_reservations.css'
import { Button } from 'antd';
import moment from 'moment'
import {DatePicker} from 'antd';
import DateTimeInput from './DateTimeInput';

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

  // Reservation Time Variables
  const [selectedReservations, setSelectedReservations] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');    

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

  // Reset Reservation Selection
  function resetSelection() {
    setSelectedDate('');
    setSelectedTime('');
    setSelectedDuration('');
  }
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

  // Get Info
  async function getDeviceInfo(id) {
    resetSelection();
    const response = await APImethods.getDevice(id);
    console.log("Device: ", response);
    setDeviceInfo(response);
    const reservations = await APImethods.allReservationsByDevice(id)
    setSelectedReservations(reservations.map((reservation) => {
      return {
        date: reservation.reservationDate,
        time: reservation.reservationTime,
        days: reservation.reservationDuration,
      }
    }))
  }
  async function getLicenceInfo(id) {
    resetSelection();
    const response = await APImethods.getLicence(id);
    console.log("Licence: ", response);
    setLicenceInfo(response);
    const reservations = await APImethods.allReservationsByLicence(id)
    setSelectedReservations(reservations.map((reservation) => {
      return {
        date: reservation.reservationDate,
        time: reservation.reservationTime,
        days: reservation.reservationDuration,
      }
    }))
  }
  async function getRoomInfo(id) {
    resetSelection();
    const response = await APImethods.getRoom(id);
    console.log("Room: ", response);
    setRoomInfo(response);
    const reservations = await APImethods.allReservationsByRoom(id)
    setSelectedReservations(reservations.map((reservation) => {
      return {
        date: reservation.reservationDate,
        time: reservation.reservationTime,
        duration: reservation.reservationDuration,
      }
    }))
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
  const reservationContainer = (reservation, type) => {
    return <>
      <Flex direction='column' key={reservation.id}>
        <Heading level={3}>Datos de Reserva</Heading>
        <p>Fecha: {reservation.reservationDate}</p>
        <p hidden={reservation.reservationTime == null}>Hora: {reservation.reservationTime}</p>
        <p>Duracion: {reservation.reservationDuration} {type == 'room' ? <>minutos</> : <>dias</>}</p>
        <Heading level={3}>Cambiar Reserva</Heading>
        <h3>Seleccion de inicio de la reserva</h3>

        {type == 'room' ?
          <DateTimeInput
          reservations={selectedReservations}
          onDateChange={handleDateChange}
          onTimeChange={handleTimeChange}
          onDurationChange={handleDurationChange}
          />
          :
          <DateInput
          value={selectedDate}
          unavailableDates={selectedReservations}
          onDurationChange={handleDurationChange}
          onDateChange={handleDateChange}
          />
        }
        <Button onClick={async() => {
          let time = null;;
            if (type == 'room') {
              if (selectedDate === '' || selectedTime === '' || selectedDuration === '') {
                alert('Por favor, rellene todos los campos');
                return;
              }
              time = selectedTime;
            }
            else {
              if (selectedDate === '' || selectedDuration === '') {
                alert('Por favor, rellene todos los campos');
                return;
              }
              time = null;
            }
            await APImethods.updateReservation(
                reservation.id,
                reservation.userID,
                reservation.deviceID,
                reservation.licenceID,
                reservation.roomID,
                selectedDate,
                time,
                selectedDuration
            );
            resetSelection();
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
          {!!selectDeviceReservation.id ?
          <>
          <div className="reservation_details">{deviceInfoContainer}</div>
          {reservationContainer(selectDeviceReservation, 'device')}
          </>
          :
          <></>
          }
          {/* <div className="ended"></div> */}
        </Flex>
        : <p>No hay reservas de equipos</p>}
      </TabItem>

      <TabItem title="Licencias">
        {licenceList.length > 0 ?
        <Flex direction="row" gap="4rem">
          <div className="active">{licenceList}</div>
          {!!selectLicenceReservation.id ?
          <>
          <div className="reservation_details">{licenceInfoContainer}</div>
          {reservationContainer(selectLicenceReservation, 'licence')}
          </>
          :
          <></>
          }
          {/* <div className="ended"></div> */}
        </Flex>
        : <p>No hay reservas de licencias</p>}
      </TabItem>

      <TabItem title="Salones">
        {roomList.length > 0 ?
        <Flex direction="row" gap="4rem">
          <div className="active">{roomList}</div>
          {!!selectRoomReservation.id ?
          <>
          <div className="reservation_details">{roomInfoContainer}</div>
          {reservationContainer(selectRoomReservation, 'room')}
          </>
          :
          <></>
          }
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
      <Flex direction="column" justifyContent="space-between" padding='3rem'>
        {/* Nombre */}
        <h2>{reservationItem.name}</h2>
        {/* Fecha */}
        <p>Fecha: {reservation.reservationDate}</p>
        {/* Hora */}
        <p hidden={props.type != 2}>Hora: {reservation.reservationTime}</p>
        {/* Duracion */}
        <p>{reservation.reservationDuration} {props.type === 2 ? <>minutos</> : <>dias</>}</p>
      </Flex>
      <Button onClick={props.onEditClick}>Editar</Button>
      <Button onClick={props.onDeleteClick}>Cancelar</Button>
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