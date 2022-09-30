import { API } from 'aws-amplify'; 
import {
    createRoom as createRoomMutation,
  } from "../graphql/mutations";

async function createRoom(event) {
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

export default createRoom();