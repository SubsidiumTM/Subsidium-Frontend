import { API, graphqlOperation } from "aws-amplify";
import { GraphQLEnumType } from "graphql";
// import { getDevice, listDevices } from "../graphql/queries";
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
// import { listDevices } from "../graphql/queries";



export class APImethods {

    // CRUD Devices

    /*
    const newDevice = {
        id: id,
        name: name_u,
        portable: portable_u,
        os: os_u,
        storage: storage_u,
        ram: ram_u,
        description: description_u,
        images: images_u,
    };
    */

    static async createDevice( 
        name_u, 
        portable_u, 
        os_u, 
        storage_u, 
        ram_u, 
        description_u, 
        images_u) { 
        const newDevice = {
            name: name_u,
            portable: portable_u,
            os: os_u,
            storage: storage_u,
            ram: ram_u,
            description: description_u,
            images: images_u,
        };         
        const response = await API.graphql({ query: mutations.createDevice, variables: {input: newDevice}});
    }

    static async allDevices() {
        const response = await API.graphql({ query: queries.listDevices });
        console.log(response.data.listDevices.items);
        return response.data.listDevices.items;
        // result: { "data": { "listTodos": { "items": [/* ..... */] } } }
    }

    static async getDevice(deviceID) {
        const response = await API.graphql(graphqlOperation(queries.getDevice, {id: deviceID}));
        console.log(response.data.getDevice);
        return response.data.getDevice;
        // result: { "data": { "listTodos": { "items": [/* ..... */] } } }
    }

    static async updateDevice(deviceID, 
        name_u, 
        portable_u, 
        os_u, 
        storage_u, 
        ram_u, 
        description_u, 
        images_u) { 
        const newDevice = {
            id: deviceID,
            name: name_u,
            portable: portable_u,
            os: os_u,
            storage: storage_u,
            ram: ram_u,
            description: description_u,
            images: images_u,
        };         
        const response = await API.graphql({ query: mutations.updateDevice, variables: {input: newDevice}});
    }

    static async deleteDevice(deviceID) {       
        const response = await API.graphql({ query: mutations.deleteDevice, variables: {input: {id: deviceID}}});
    }

    // CRUD Licence

    /*
    const newLicence = {
        id: id,
        name: name_u,
        year: year_u,
        compatibility: compatibility_u,
        category: category_u,
        description: description_u,
        images: images_u,
    };
    */

    static async createLicence(
        name_u,
        year_u,
        compatibility_u,
        category_u,
        description_u,
        images_u
    ) {
        const newLicence = {
            name: name_u,
            year: year_u,
            compatibility: compatibility_u,
            category: category_u,
            description: description_u,
            images: images_u,
        };

        const response = await API.graphql({ query: mutations.createLicence, variables: {input: newLicence}});
    }

    static async allLicences() {
        const response = await API.graphql({ query: queries.listLicences });
        console.log(response.data.listLicences.items);
        return response.data.listLicences.items;
    }

    static async getLicence(licenceID) {
        const response = await API.graphql(graphqlOperation(queries.getLicence, {id: licenceID}));
        console.log(response.data.getLicence);
        return response.data.getLicence;
    }

    static async updateLicence(
        licenceID,
        name_u,
        year_u,
        compatibility_u,
        category_u,
        description_u,
        images_u
    ) {
        const newLicence = {
            id: licenceID,
            name: name_u,
            year: year_u,
            compatibility: compatibility_u,
            category: category_u,
            description: description_u,
            images: images_u,
        };

        const response = await API.graphql({ query: mutations.updateLicence, variables: {input: newLicence}});        
    }

    static async deleteLicence(licenceID) {
        const response = await API.graphql({ query: mutations.deleteLicence, variables: {input: {id: licenceID}}});
    }

    // CRUD Room

    /*
    const newRoom = {
        id: id,
        name: name_u,
        building: building_u,
        proyector: proyector_u,
        wifi: wifi_u,
        board: board_u,
        air_conditioner: air_conditioner_u,
        ethernet: ethernet_u,
        computers: computers_u,
        double_monitor: double_monitor_u,
        seats: seats_u,
        energy_outlets: energy_outlets_u,
        description: description_u,
        images: images_u,
    };
    */

    static async createRoom(
        name_u,
        building_u,
        proyector_u,
        wifi_u,
        board_u,
        air_conditioner_u,
        ethernet_u,
        computers_u,
        double_monitor_u,
        seats_u,
        energy_outlets_u,
        description_u,
        images_u
    ) {
        const newRoom = {
            name: name_u,
            building: building_u,
            proyector: proyector_u,
            wifi: wifi_u,
            board: board_u,
            air_conditioner: air_conditioner_u,
            ethernet: ethernet_u,
            computers: computers_u,
            double_monitor: double_monitor_u,
            seats: seats_u,
            energy_outlets: energy_outlets_u,
            description: description_u,
            images: images_u,
        };

        const response = await API.graphql({ query: mutations.createRoom, variables: {input: newRoom}});
    }

    static async allRooms() {
        const response = await API.graphql({ query: queries.listRooms });
        console.log(response.data.listRooms.items);
        return response.data.listRooms.items;
    }

    static async getRoom(roomID) {
        const response = await API.graphql(graphqlOperation(queries.getRoom, {id: roomID}));
        console.log(response.data.getRoom);
        return response.data.getRoom;
    }

    static async updateRoom(
        roomID,
        name_u,
        building_u,
        proyector_u,
        wifi_u,
        board_u,
        air_conditioner_u,
        ethernet_u,
        computers_u,
        double_monitor_u,
        seats_u,
        energy_outlets_u,
        description_u,
        images_u
    ) {
        const newRoom = {
            id: roomID,
            name: name_u,
            building: building_u,
            proyector: proyector_u,
            wifi: wifi_u,
            board: board_u,
            air_conditioner: air_conditioner_u,
            ethernet: ethernet_u,
            computers: computers_u,
            double_monitor: double_monitor_u,
            seats: seats_u,
            energy_outlets: energy_outlets_u,
            description: description_u,
            images: images_u,
        };

        const response = await API.graphql({ query: mutations.updateRoom, variables: {input: newRoom}});        
    }

    static async deleteRoom(roomID) {
        const response = await API.graphql({ query: mutations.deleteRoom, variables: {input: {id: roomID}}});
    }

    // CRUD User

    /*
    const newUser = {
        id: id,
        username: username_u,
        name: name_u,
        surname: surname_u,
        email: email_u,
        type: type_u,
        verified: verified_u,
        active: active_u
    };
    */

    static async createUser( 
        username_u, 
        name_u, 
        surname_u, 
        email_u, 
        type_u, 
        verified_u, 
        active_u) { 
        const newUser = {
            username: username_u,
            name: name_u,
            surname: surname_u,
            email: email_u,
            type: type_u,
            verified: verified_u,
            active: active_u
        };         
        const response = await API.graphql({ query: mutations.createUser, variables: {input: newUser}});
    }

    static async allUsers() {
        const response = await API.graphql({ query: queries.listUsers });
        console.log(response.data.listUsers.items);
        return response.data.listUsers.items;
        // result: { "data": { "listTodos": { "items": [/* ..... */] } } }
    }

    static async getUser(username) {
        const response = await API.graphql(graphqlOperation(queries.getUser, {username: username}));
        console.log(response.data.getUser);
        return response.data.getUser;
        // result: { "data": { "listTodos": { "items": [/* ..... */] } } }
    }

    static async updateUser(userID, 
        username_u, 
        name_u, 
        surname_u, 
        email_u, 
        type_u, 
        verified_u, 
        active_u) { 
        const newUser = {
            id: userID,
            username: username_u,
            name: name_u,
            surname: surname_u,
            email: email_u,
            type: type_u,
            verified: verified_u,
            active: active_u
        };        
        const response = await API.graphql({ query: mutations.updateUser, variables: {input: newUser}});
    }

    static async deleteUser(username) {       
        const response = await API.graphql({ query: mutations.deleteUser, variables: {input: {username: username}}});
    }

    // CRUD Reservation

    /*
    const newReservation = {
        id: id,
        userID: userID_u,
        deviceID: deviceID_u,
        licenceID: licenceID_u,
        roomID: roomID_u,
        reservationDate: reservationDate_u,
        state: state_u
    };
    */

    static async createReservation( 
        userID_u, 
        deviceID_u, 
        licenceID_u, 
        roomID_u, 
        reservationDate_u, 
        state_u) { 
        const newReservation = {
            userID: userID_u,
            deviceID: deviceID_u,
            licenceID: licenceID_u,
            roomID: roomID_u,
            reservationDate: reservationDate_u,
            state: state_u
        };        
        const response = await API.graphql({ query: mutations.createReservation, variables: {input: newReservation}});
    }

    static async allReservations() {
        const response = await API.graphql({ query: queries.listReservations });
        console.log(response.data.listReservations.items);
        return response.data.listReservations.items;
        // result: { "data": { "listTodos": { "items": [/* ..... */] } } }
    }

    static async getReservation(reservationID) {
        const response = await API.graphql(graphqlOperation(queries.getReservation, {id: reservationID}));
        console.log(response.data.getReservation);
        return response.data.getReservation;
        // result: { "data": { "listTodos": { "items": [/* ..... */] } } }
    }

    static async updateReservation(reservationID, 
        userID_u, 
        deviceID_u, 
        licenceID_u, 
        roomID_u, 
        reservationDate_u, 
        state_u) { 
        const newReservation = {
            id: reservationID,
            userID: userID_u,
            deviceID: deviceID_u,
            licenceID: licenceID_u,
            roomID: roomID_u,
            reservationDate: reservationDate_u,
            state: state_u
        };       
        const response = await API.graphql({ query: mutations.updateReservation, variables: {input: newReservation}});
    }

    static async deleteUser(reservationID) {       
        const response = await API.graphql({ query: mutations.deleteReservation, variables: {input: {id: reservationID}}});
    }

    // CRUD Modifications

    /*
    const newUser = {
        id: id,
        username: username_u,
        name: name_u,
        surname: surname_u,
        email: email_u,
        type: type_u,
        verified: verified_u,
        active: active_u
    };
    */

    // CRUD UnavailableDates

    /*
    const newUser = {
        id: id,
        username: username_u,
        name: name_u,
        surname: surname_u,
        email: email_u,
        type: type_u,
        verified: verified_u,
        active: active_u
    };
    */
}