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
  withAuthenticator,
} from '@aws-amplify/ui-react';
import { listNotes } from "../graphql/queries";
import {
  createNote as createNoteMutation,
  deleteNote as deleteNoteMutation,

  // Queries de creacion
  createDevice as createDeviceMutation,
  createRoom as createRoomMutation,
  createLicence as createLicenceMutation,
  // Queries de borrado
  deleteDevice as deleteDeviceMutation,
  deleteRoom as deleteRoomMutation,
  deleteLicence as deleteLicenceMutation,
  // Queries de modificacion
  updateDevice as updateDeviceMutation,
  updateRoom as updateRoomMutation,
  updateLicence as updateLicenceMutation
} from "../graphql/mutations";

import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';


import createRoom from "./createRoom";
import DataTable from "./inventory_table";

import { APImethods } from "../api/APImethods";

const Manager = ({ signOut }) => {
  const [notes, setNotes] = useState([]);

  // Auth.currentUserInfo()

  useEffect(() => {
    fetchNotes();
    Auth.currentAuthenticatedUser({
      bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    }).then(user => console.log(user))
    .catch(err => console.log(err));
  }, []);

  // async function fetchNotes() {
  //   const apiData = await API.graphql({ query: listNotes });
  //   const notesFromAPI = apiData.data.listNotes.items;
  //   setNotes(notesFromAPI);
  // }

  async function fetchNotes() {
    const apiData = await API.graphql({ query: listNotes });
    const notesFromAPI = apiData.data.listNotes.items;
    await Promise.all(
      notesFromAPI.map(async (note) => {
        if (note.image) {
          const url = await Storage.get(note.name);
          note.image = url;
        }
        return note;
      })
    );
    setNotes(notesFromAPI);
  }

  // async function createNote(event) {
  //   event.preventDefault();
  //   const form = new FormData(event.target);
  //   const data = {
  //     name: form.get("name"),
  //     description: form.get("description"),
  //   };
  //   await API.graphql({
  //     query: createNoteMutation,
  //     variables: { input: data },
  //   });
  //   fetchNotes();
  //   event.target.reset();
  // }

  // Funciones de la API

  // Escritura de servicios

  async function createLicence(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const data = {
      name: form.get("licence_name"),
      year : form.get("licence_year"),
      compatibility : [form.get("licence_compatibility")],
      category : [form.get("licence_category")],
      description : form.get("licence_category"),
      images: [""],
    };
    // if (!!data.image) await Storage.put(data.name, image);
    await API.graphql({
      query: createLicenceMutation,
      variables: { input: data },
    });
    // fetchNotes();
    event.target.reset();
  }



  async function createDevice(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const image = form.get("image");
    const data = {
      name: form.get("name"),
      description: form.get("description"),
      image: image.name,
    };
    if (!!data.image) await Storage.put(data.name, image);
    await API.graphql({
      query: createNoteMutation,
      variables: { input: data },
    });
    fetchNotes();
    event.target.reset();
  }

  async function createNote(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const image = form.get("image");
    const data = {
      name: form.get("name"),
      description: form.get("description"),
      image: image.name,
    };
    if (!!data.image) await Storage.put(data.name, image);
    await API.graphql({
      query: createNoteMutation,
      variables: { input: data },
    });
    fetchNotes();
    event.target.reset();
  }

  // async function deleteNote({ id }) {
  //   const newNotes = notes.filter((note) => note.id !== id);
  //   setNotes(newNotes);
  //   await API.graphql({
  //     query: deleteNoteMutation,
  //     variables: { input: { id } },
  //   });
  // }

  async function deleteNote({ id, name }) {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
    await Storage.remove(name);
    await API.graphql({
      query: deleteNoteMutation,
      variables: { input: { id } },
    });
  }

  // Formatos de creacion de Recursos
  function getFieldsByType (type) {
    if (type == "licence") {
        // Licence fill-in format
        return (
            <>
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

            <TextField
                name="licence_description"
                placeholder="Descripcion"
                label="Descripcion"
                labelHidden
                variation="quiet"
                required
            />
            <Button type="submit">
                Agregar Recurso
            </Button>
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
            </Flex>

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
            
            <TextField
                name="description_device"
                placeholder="Descripcion"
                label="Device Description"
                labelHidden
                variation="quiet"
                required
            />

            <Button type="submit">
                Agregar Recurso
            </Button>
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

  // Inventory List
  function getInventoryList (type) {
    const columns = [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'name', headerName: 'Nombre', width: 130 },
    ];

    if (type === "licence") {
      const rows = APImethods.allLicences();
      return (
        <DataTable columns={columns} rows={rows} />
      );
    }
    else if (type === "room") {
      const rows = APImethods.allRooms();
      return (
        <DataTable columns={columns} rows={rows} />
      );
    }
    else if (type === "device") {
      const rows = APImethods.allDevices();
      return (
        <DataTable columns={columns} rows={rows} />
      );
    }
    else {
      return (
        <></>
      );
    }
  }

  async function create(event) {
    
    if (resourceType === "device") {

    }
    else if (resourceType === "room") {
      console.log("huevos de carla");
      createRoom(event);
      
    }
    else if (resourceType === "licence") {
      createLicence(event);
    }
  }

  const [resourceType, setResourceType] = useState("-");

  const handlerResourceType = function (e) {
    const option = e.target.value;
    setResourceType(option);
  }

  return (
    <View className="App">
      <Heading level={1}>Administrar Inventario</Heading>

      <View as="form" margin="3rem 0" onSubmit={create}>
        <select name="resource" id="resource" onClick={handlerResourceType}>
            <option value="none">-</option>
            <option value="licence">Licencia</option>
            <option value="room">Salon</option>
            <option value="device">Equipo</option>
        </select>
        <Flex direction="row" justifyContent="center">

            {getInventoryList(resourceType)}

            {getFieldsByType(resourceType)}
            
        </Flex>
      </View>

      <Button onClick={signOut}>Sign Out</Button>
    </View>
  );
};

export default withAuthenticator(Manager);