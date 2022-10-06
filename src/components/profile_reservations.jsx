import { Flex, Heading } from '@aws-amplify/ui-react'
import { useState, useEffect } from 'react'
import { APImethods } from '../api/APImethods';
import React from 'react'

function Profile_reservations(props) {
  // Page variables
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
    const response = await APImethods.allReservationsByUser(props.userID);
    setReservations(response);
    console.log("Reservas de: ", props.userID);
    console.log(response);
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
    <Flex direction="column" gap="2rem">
    {/* Reservas de Equipos */}
    <Heading level={2}>Equipos</Heading>
    <div className="list"></div>
    {/* Reservas de Licencias */}
    <Heading level={2}>Licencias</Heading>
    <div className="list"></div>
    {/* Reservas de Salones */}
    <Heading level={2}>Salones</Heading>
    <div className="list"></div>
    </Flex>
    </>
  )
}

export default Profile_reservations
