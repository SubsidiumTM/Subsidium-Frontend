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


async function createRoom( event ) {
    event.preventDefault();
    const form = new FormData(event.target);
		const data = {
			name: form.get("room_name"),
			building : form.get("room_building"),
			proyector : (form.get("proyector") == null) ? false : true,
			wifi : (form.get("wifi") == null) ? false : true,
			board : (form.get("board") == null) ? false : true,
			air_conditioner : (form.get("air_conditioner") == null) ? false : true,
      ethernet : (form.get("ethernet") == null) ? false : true,
      computers : (form.get("computers") == null) ? false : true,
      double_monitor : (form.get("double_monitor") == null) ? false : true,
      seats : form.get("seats"),
      energy_outlets : form.get("energy_outlets"),
      description : form.get("room_description"),
      images: [""],
    };
    // if (!!data.image) await Storage.put(data.name, image);
    await API.graphql({
      query: createRoomMutation,
      variables: { input: data },
    });
    // fetchNotes();
    event.target.reset();
}
/* 
function createRoom(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const data = {
      name: form.get("room_name"),
      building : form.get("room_building"),
      proyector : (form.get("proyector") == null) ? false : true,
      wifi : (form.get("wifi") == null) ? false : true,
      board : (form.get("board") == null) ? false : true,
      air_conditioner : (form.get("air_conditioner") == null) ? false : true,
      ethernet : (form.get("ethernet") == null) ? false : true,
      computers : (form.get("computers") == null) ? false : true,
      double_monitor : (form.get("double_monitor") == null) ? false : true,
      seats : form.get("seats"),
      energy_outlets : form.get("energy_outlets"),
      description : form.get("room_description"),
      images: [""],
    };
    // if (!!data.image) await Storage.put(data.name, image);
    API.graphql({
      query: createRoomMutation,
      variables: { input: data },
    }).then(data => {
        console.log(data);
    }).catch(e => {
        console.log(e);
    }) ;
    // fetchNotes();
    event.target.reset();
} */

export default createRoom;