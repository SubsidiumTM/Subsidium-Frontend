import { Flex, Heading, Tabs, TabItem } from '@aws-amplify/ui-react'
import { useState, useEffect } from 'react'
import { APImethods } from '../api/APImethods';
import React from 'react'

function Profile_reservations(props) {
  // Page variables
  const [reservations, setReservations] = useState([]);
  const [deviceReservations, setDeviceReservations] = useState([]);
  const [licenceReservations, setLicenceReservations] = useState([]);
  const [roomReservations, setRoomReservations] = useState([]);

  // States of the Page
    const [index, setIndex] = useState(0);

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

    await response.map((reservation) => 
    {
      if (reservation.deviceID != null) {
        setDeviceReservations(deviceReservations => [...deviceReservations, reservation.deviceID]);
      }
      if (reservation.licenceID != null) {
        setLicenceReservations(licenceReservations => [...licenceReservations, reservation.licenceID]);
      }
      if (reservation.roomID != null) {
        setRoomReservations(roomReservations => [...roomReservations, reservation.roomID]);
      }
    })
  }

  // Constants Lists
  const deviceList = deviceReservations.map((device) => <li key={device}>{device}</li>);
  const licenceList = licenceReservations.map((licence) => <li key={licence}>{licence}</li>);
  const roomList = roomReservations.map((room) => <li key={room}>{room}</li>);

  const itemsDevices = () => {

  }

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
    <Tabs defaultIndex={index} spacing="equal" justifyContent="flex-start">

      <TabItem title="Equipos">
        <Flex direction="column" gap="2rem">
          <div className="active">{deviceList}</div>
          <div className="ended"></div>
        </Flex>
      </TabItem>

      <TabItem title="Licencias">
        <Flex direction="column" gap="2rem">
          <div className="active">{licenceList}</div>
          <div className="ended"></div>
        </Flex>
      </TabItem>

      <TabItem title="Salones">
        <Flex direction="column" gap="2rem">
          <div className="active">{roomList}</div>
          <div className="ended"></div>
        </Flex>
      </TabItem>
    
    </Tabs>
    </>
    // <div className='inventory_component'>
    //     <Heading level={1}>Inventario de Reservas</Heading>
    //     <Tabs
    //     defaultIndex={index}
    //     spacing="equal"
    //     justifyContent="flex-start">

    //     {/* ///////// Table and Form of Licence ///////// */}
    //     <TabItem title="Licence">
    //     <br></br>
    //     <Flex direction="row" justifyContent="center" gap='2rem'>
    //     {/* ////////// TABLE ////////// */}
    //     <div className='itemList'>
    //         {listLicences}
    //     </div>
    //     {/* ////////// FORM ////////// */}
    //     <div className="format">
    //         <Flex direction="row">
    //         {/* Description */}
    //         <div className="description">
    //         <Flex direction="column">
    //             {licenceInfoContainer}
    //         </Flex>
    //         </div>
    //         {/* Reservation Details */}
    //         <Flex direction="column" className='reservation'>
    //             <Heading level={3}>Reservar</Heading>
    //             <h3>Seleccion de inicio de la reserva</h3>
    //             <TextField  label='Fecha' name='dateLicence' placeholder='DD/MM/AAAA' width='100%' required type='date'/>
    //             <SelectField label='Duracion de Reserva' name='licenceDuration' placeholder='Seleccionar' width='100%' required>
    //                 <option value={(5*24*60)}>5 dias</option>
    //                 <option value={(10*24*60)}>10 dias</option>
    //                 <option value={(15*24*60)}>15 dias</option>
    //                 <option value={(20*24*60)}>20 dias</option>
    //             </SelectField>
    //         </Flex>
                
    //         </Flex>
    //         <br></br>
    //         <Flex justifyContent="center">
    //         <Button onClick={async() => {
    //             if (userID === '' |
    //                 licenceID === '' |
    //                 document.getElementsByName('dateLicence')[0].value === '' |
    //                 document.getElementsByName('licenceDuration')[0].value === '') {
    //                 alert('Por favor complete todos los campos')
    //             }
    //             else {
    //                 console.log(userID)
    //                 console.log(licenceID)
    //                 console.log(document.getElementsByName('dateLicence')[0].value)
    //                 console.log(parseInt(document.getElementsByName('licenceDuration')[0].value))
    //                 document.getElementsByName('dateLicence')[0].value = ''
    //                 document.getElementsByName('licenceDuration')[0].value = ''
    //                 await APImethods.createReservation(
    //                     userID,
    //                     null,
    //                     licenceID,
    //                     null,
    //                     document.getElementsByName('dateLicence')[0].value,
    //                     null,
    //                     parseInt(document.getElementsByName('licenceDuration')[0].value),
    //                     "PENDIENTE"            
    //                 )
    //                 console.log('Reserva creada')
    //             }
    //         }}>Reservar</Button>
    //         </Flex>
    //     </div>

    //     </Flex>
    //     </TabItem>

    //     {/* ///////// Table and Form of Room ///////// */}
    //     <TabItem title="Room">
    //     <br></br>
    //     <Flex direction="row" justifyContent="center" gap='2rem'>
    //     {/* ////////// TABLE ////////// */}
    //     <div className='itemList'>
    //         {listRooms}
    //     </div>
    //     {/* ////////// FORM ////////// */}
    //     <div className="format">
    //         <Flex direction="row">
    //         {/* Description */}
    //         <div className="description">
    //         <Flex direction="column">
    //             {roomInfoContainer}
    //         </Flex>
    //         </div>

    //         {/* Reservation Details */}
    //         <Flex direction="column">
    //             <Heading level={3}>Reservar</Heading>
    //             <h3>Seleccion de inicio de la reserva</h3>
    //             <TextField  label='Fecha' name='dateRoom' placeholder='DD/MM/AAAA' width='100%' required type='date'/>
    //             <TextField  label='Hora (entre 10am y 10pm)' name='timeRoom' width='100%' required type='time'/>
    //             <SelectField label='Duracion de Reserva' name='roomDuration' placeholder='Seleccionar' width='100%' required>
    //                 <option value={15}>15 min</option>
    //                 <option value={30}>30 min</option>
    //                 <option value={45}>45 min</option>
    //                 <option value={60}>60 min</option>
    //             </SelectField>
    //         </Flex>
                
    //         </Flex>
    //         <br></br>
    //         <Flex justifyContent="center">
    //         <Button onClick={async () => {
    //             if (userID === '' |
    //                 roomID === '' |
    //                 document.getElementsByName('dateRoom')[0].value === '' |
    //                 document.getElementsByName('timeRoom')[0].value === '' |
    //                 document.getElementsByName('roomDuration')[0].value === '') {
    //                 alert('Por favor complete todos los campos')
    //             }
    //             else {
    //                 console.log(userID)
    //                 console.log(roomID)
    //                 console.log(document.getElementsByName('dateRoom')[0].value)
    //                 console.log(document.getElementsByName('timeRoom')[0].value)
    //                 console.log(parseInt(document.getElementsByName('roomDuration')[0].value))
    //                 document.getElementsByName('dateRoom')[0].value = ''
    //                 document.getElementsByName('timeRoom')[0].value = ''
    //                 document.getElementsByName('roomDuration')[0].value = ''
    //                 await APImethods.createReservation(
    //                     userID,
    //                     null,
    //                     null,
    //                     roomID,
    //                     document.getElementsByName('dateRoom')[0].value,
    //                     document.getElementsByName('timeRoom')[0].value,
    //                     parseInt(document.getElementsByName('roomDuration')[0].value),
    //                     "PENDIENTE"            
    //                 )
    //                 console.log('Reserva creada')
    //             }
    //         }}>Reservar</Button>
    //         </Flex>
    //     </div>
        
    //     </Flex>
    //     </TabItem>

    //     {/* ///////// Table and Form of Device ///////// */}
    //     <TabItem title="Device">
    //     <br></br>
    //     <Flex direction="row" justifyContent="center" gap='2rem'>
    //     {/* ////////// TABLE ////////// */}
    //     <div className='itemList'>
    //         {listDevices}
    //     </div>
    //     {/* ////////// FORM ////////// */}
    //     <div className="format">
    //         <Flex direction="row">
    //         {/* Description */}
    //         <div className="description">
    //         <Flex direction="column">
    //             {deviceInfoContainer}
    //         </Flex>
    //         </div>
    //         {/* Reservation Details */}
    //         <Flex direction="column">
    //             <Heading level={3}>Reservar</Heading>
    //             <h3>Seleccion de inicio de la reserva</h3>
    //             <TextField  label='Fecha' name='dateDevice' placeholder='DD/MM/AAAA' width='100%' required type='date'/>
    //             <SelectField label='Duracion de Reserva' name='deviceDuration' placeholder='Seleccionar' width='100%' required>
    //                 <option value={(5*24*60)}>5 dias</option>
    //                 <option value={(10*24*60)}>10 dias</option>
    //                 <option value={(15*24*60)}>15 dias</option>
    //                 <option value={(20*24*60)}>20 dias</option>
    //             </SelectField>
    //         </Flex>
                
    //         </Flex>
    //         <br></br>
    //         <Flex justifyContent="center">
    //         <Button onClick={() => {
    //             if (userID === '' |
    //                 deviceID === '' |
    //                 document.getElementsByName('dateDevice')[0].value === '' |
    //                 document.getElementsByName('deviceDuration')[0].value === '') {
    //                 alert('Por favor complete todos los campos')
    //             }
    //             else {
    //                 console.log(userID)
    //                 console.log(deviceID)
    //                 console.log(document.getElementsByName('dateDevice')[0].value)
    //                 console.log(parseInt(document.getElementsByName('deviceDuration')[0].value))
    //                 document.getElementsByName('dateDevice')[0].value = ''
    //                 document.getElementsByName('deviceDuration')[0].value = ''
    //                 APImethods.createReservation(
    //                     userID,
    //                     deviceID,
    //                     null,
    //                     null,
    //                     document.getElementsByName('dateDevice')[0].value,
    //                     null,
    //                     parseInt(document.getElementsByName('deviceDuration')[0].value),
    //                     "PENDIENTE"            
    //                 )
    //                 console.log('Reserva creada')
    //             }
    //         }}>Reservar</Button>
    //         </Flex>
    //     </div>
        
    //     </Flex>
    //     </TabItem>

    //     </Tabs>
    //     </div>
  )
}

export default Profile_reservations
