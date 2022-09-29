import React, { useState, useEffect } from "react";
import "../App.css"; 
import "@aws-amplify/ui-react/styles.css";
import { API, Storage, Auth } from 'aws-amplify'; 
import { Button, Flex, Heading, Image, Text, TextField, View, withAuthenticator} from '@aws-amplify/ui-react';
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

import createRoom from "./createRoom";

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
  };

  

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
    if (type === "licence") {
        // Formato de llenado de licencia
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
    else if (type === "room") {
        // Formato de llenado de salones
        return (
            <>
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

            <label>Proyector
            <input 
                name = "proyector"
                // variation = "quiet"
                type="checkbox" 
                />
            </label>

            <label>WIFI
            <input 
                name = "wifi"
                // variation = "quiet"
                type="checkbox" 
                />
            </label>

            <label>Pizarron
            <input 
                name = "board"
                // variation = "quiet"
                type="checkbox" 
                />
            </label>

            <label>Aire Acondicionado
            <input 
                name = "air_conditioner"
                // variation = "quiet"
                type="checkbox" 
                />
            </label>

            <label>Ethernet
            <input 
                name = "ethernet"
                // variation = "quiet"
                type="checkbox" 
                />
            </label>

            <label>Computadoras
            <input 
                name = "computers"
                // variation = "quiet"
                type="checkbox" 
                />
            </label>

            <label>Monitor Doble
            <input 
                name = "double_monitor"
                // variation = "quiet"
                type="checkbox" 
                />
            </label>

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
            
            <TextField
                name="room_description"
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
    else if (type === "device") {
        // Formato de llenado de equipos
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
        // Formato
        return (
            <>
            <Button type="submit" disabled>
                Agregar Recurso
            </Button>
            </>
        )
    }
  }

  async function create(event) {
    if (resourceType === "device") {

    }
    else if (resourceType === "room") {
      createRoom(event)
    }
    else if (resourceType === "licence") {
      createLicence(event)
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
        <Flex direction="column" justifyContent="center">

            <select name="resource" id="resource" onClick={handlerResourceType}>
                <option value="none">-</option>
                <option value="licence">Licencia</option>
                <option value="room">Salon</option>
                <option value="device">Equipo</option>
            </select>

            {getFieldsByType(resourceType)}
            
        </Flex>
      </View>
      <Button onClick={signOut}>Sign Out</Button>
    </View>
  );
};

export default withAuthenticator(Manager);

// try {
//     const { user } = await Auth.signUp({ username, password });
//     console.log(user);
// } catch (error) {
//     console.log('error signing up:', error);
// }