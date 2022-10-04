import React, { useState, useEffect } from "react";
import "../App.css";
// @ts-ignore
import "@aws-amplify/ui-react/styles.css";
import { API, Storage, Auth } from 'aws-amplify';
// @ts-ignore
import {
  Button,
  Flex,
  Heading,
  Image,
  Text,
  TextField,
  View,
  Tabs,
  TabItem,
  withAuthenticator,
} from '@aws-amplify/ui-react';

import DataTable from "./inventory_table";

import { APImethods } from "../api/APImethods";

const Manager = ({ signOut }) => {
  const [notes, setNotes] = useState([]);
  const [devices, setDevices] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [licences, setLicences] = useState([]);

  // First Caller
  useEffect(() => {
    getInventoryList();
    Auth.currentAuthenticatedUser({
      bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    }).then(user => console.log(user))
    .catch(err => console.log(err));
  }, [],);

  // LLamados de la API
  

  // Formatos de creacion de Recursos
  function getFieldsByType (type) {
    if (type == "licence") {
        // Licence fill-in format
        return (
            <>
            <Flex direction="column">

            <Flex direction="row">

            <TextField
                name="licence_name"
                placeholder="Licencia"
                label="Nombre"
                labelHidden
                variation="quiet"
                required
            />

            <input 
                name = "licence_year"
                placeholder="Año"
                label = "Año"
                variation = "quiet"
                type="number" 
                />

            </Flex>

            <Flex direction="row">

            <TextField
                name="licence_compatibility"
                placeholder="Compatibilidad"
                label="Compatibilidad"
                labelHidden
                variation="quiet"
                required
            />
            <TextField
                name="licence_category"
                placeholder="Categoria"
                label="Categoria"
                labelHidden
                variation="quiet"
                required
            />

            </Flex>

            <TextField
                name="licence_description"
                placeholder="Descripcion"
                label="Descripcion"
                labelHidden
                variation="quiet"
                required
                isMultiline
            />
            <Button type="submit">
                Agregar Recurso
            </Button>

            </Flex>
            </>
        )
    }
    else if (type == "room") {
        // Rooms fill-in format
        return (
            <Flex direction="column">

            <Flex direction="row" gap="2rem">
            
            <Flex direction="column" gap="1rem">
            <Flex direction="row" justifyContent="left">
              <TextField
                  name="room_name"
                  placeholder="Salon"
                  label="Salon"
                  labelHidden
                  variation="quiet"
                  required
              />

              <TextField
                  name="room_building"
                  placeholder="Edificio"
                  label="Edificio"
                  labelHidden
                  variation="quiet"
                  required
              />
            </Flex>
            
            <Flex direction="row" justifyContent="left" gap="1rem">
              <Flex direction="column" justifyContent="center">
              <label>Proyector</label>
              <input name = "proyector" type="checkbox"/>
              </Flex>

              <Flex direction="column" justifyContent="center">
              <label>WIFI</label>
              <input name = "wifi" type="checkbox"/>
              </Flex>
              
              <Flex direction="column" justifyContent="center">
              <label>Pizarron</label>
              <input name = "board" type="checkbox"/>
              </Flex>

              <Flex direction="column" justifyContent="center">
              <label>Aire Acondicionado</label>
              <input name = "air_conditioner" type="checkbox"/>
              </Flex>
              
              <Flex direction="column" justifyContent="center">
              <label>Ethernet</label>
              <input name = "ethernet" type="checkbox"/>
              </Flex>
              
              <Flex direction="column" justifyContent="center">
              <label>Computadoras</label>
              <input name = "computers" type="checkbox"/>
              </Flex>
              
              <Flex direction="column" justifyContent="center">
              <label>Monitor Doble</label>
              <input name = "double_monitor" type="checkbox"/>
              </Flex>
            </Flex>

            <Flex direction="row" justifyContent="left">
              <input 
                  name = "seats"
                  placeholder="Asientos"
                  label = "Asientos"
                  variation = "quiet"
                  type="number" 
                  />

              <input 
                  name = "energy_outlets"
                  placeholder="Tomas de Corriente"
                  label = "Tomas de Corriente"
                  variation = "quiet"
                  type="number" 
                  />
            </Flex>
            </Flex>
            </Flex>

            <TextField
                name="room_description"
                placeholder="Descripcion"
                label="Device Description"
                labelHidden
                variation="quiet"
                required
                isMultiline
                width="20rem"
            />

            <Button type="submit">
                Agregar Recurso
            </Button>
            </Flex>
        )
    }
    else if (type == "device") {
        // Devices fill-in format
        return (
            <>
            <Flex direction="column">
            <Flex direction="row">
            <TextField
                name="name_device"
                placeholder="Nombre"
                label="Device Name"
                labelHidden
                variation="quiet"
                required
            />

            <input 
                name = "storage"
                placeholder="Almacenamiento"
                label = "Storage"
                variation = "quiet"
                required
                type="number" 
                />
            </Flex>
            <Flex direction="row">
            <input 
                name = "ram"
                placeholder="Memoria RAM"
                label = "RAM"
                variation = "quiet"
                required
                type="number" 
                />

            <TextField
                name="os"
                placeholder="Sistema Operativo"
                label="Device Name"
                labelHidden
                variation="quiet"
                required
            />
            </Flex>
            
            <TextField
                name="description_device"
                placeholder="Descripcion"
                label="Device Description"
                labelHidden
                variation="quiet"
                required
                isMultiline
            />

            <Button type="submit">
                Agregar Recurso
            </Button>
            </Flex>
            </>
        )
    }
    else {
        // Empty format
        return (
            <>
            <Button type="submit" disabled>
                Agregar Recurso
            </Button>
            </>
        )
    }
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Nombre', width: 130 },
  ];

  // Inventory List
  async function getInventoryList() {

    const listLicences = await APImethods.allLicences();
    setLicences(listLicences);
    const listRooms = await APImethods.allRooms();
    setRooms(listRooms);
    const listDevices = await APImethods.allDevices();
    setDevices(listDevices);

  }

  const [resourceType, setResourceType] = useState("-");

  const handlerResourceType = function (e) {
    const option = e.target.value;
    setResourceType(option);
  }
  
  const [index, setIndex] = useState(0);

  const handlerIndex = function (e) {
    const option = e.target.value;
    console.log(option)
    setIndex(option);
  }

  return (
    <View className="App">
      <Heading level={1}>Administrar Inventario</Heading>

      <Tabs
        defaultIndex={index}
        spacing="equal"
        justifyContent="flex-start">

        {/* ///////// Table and Form of Licence ///////// */}
        <TabItem title="Licence" value={0} onSelect={handlerIndex}>
        <br></br>
        <Flex direction="row" justifyContent="center">
        <DataTable columns={columns} rows={licences} onClick={console.log("Hola")} />
        {getFieldsByType("licence")}
        </Flex>
        </TabItem>

        {/* ///////// Table and Form of Room ///////// */}
        <TabItem title="Room" value={1} onSelect={handlerIndex}>
        <br></br>
        <Flex direction="row" justifyContent="center">
        <DataTable columns={columns} rows={rooms} />
        {getFieldsByType("room")}
        </Flex>
        </TabItem>

        {/* ///////// Table and Form of Device ///////// */}
        <TabItem title="Device" value={2} onSelect={handlerIndex}>
        <br></br>
        <Flex direction="row" justifyContent="center">
        <DataTable columns={columns} rows={devices} />
        {getFieldsByType("device")}
        </Flex>
        </TabItem>

      </Tabs>
      <Button onClick={signOut}>Sign Out</Button>
    </View>
  );
};

export default withAuthenticator(Manager);