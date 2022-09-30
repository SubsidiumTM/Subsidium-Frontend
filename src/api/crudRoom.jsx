// @ts-ignore
import { API } from 'aws-amplify';
import {
  // Create
  createRoom as createRoomMutation,
  // Delete
  deleteRoom as deleteRoomMutation,
  // Update
  updateRoom as updateRoomMutation
} from '../../graphql/mutations';
import {
  // Index
  indexRoom as listRooms,
  // Show
  showRoom as getRoom 
} from '../../graphql/queries';


async function createRoom( event ) {
    event.preventDefault();
    const form = new FormData(event.target);
    const data = {
      name: form.get("room_name"),
      building : form.get("room_building"),
      proyector : !(form.get("proyector") == null),
      wifi : !(form.get("wifi") == null),
      board : !(form.get("board") == null),
      air_conditioner : !(form.get("air_conditioner") == null),
      ethernet : !(form.get("ethernet") == null),
      computers : !(form.get("computers") == null),
      double_monitor : !(form.get("double_monitor") == null),
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
    event.target.reset();
}

export default createRoom;