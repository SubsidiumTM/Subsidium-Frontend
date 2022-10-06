import React, { useState, useEffect } from 'react'
import { Heading, Tabs, TabItem, Flex, Button, TextField, CheckboxField, StepperField, TextAreaField, Text } from '@aws-amplify/ui-react'
import { APImethods } from '../api/APImethods';
import { hasDirectives } from '@apollo/client/utilities';

function Admin_inventory() {
    // Page info
    const [devices, setDevices] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [licences, setLicences] = useState([]);

    // Empty forms for items
    const deviceForm = {name:'', portable:false, os:'', storage:0, ram:0, description:'', images:''};
    const licenceForm = {name:'', year:'', compatibility:'', category:'', description:'', images:''};
    const roomForm = {name:'', building:'', proyector:false, wifi:false, board:false, air_conditioner:false, ethernet:false, computers:false, double_monitor:false, seats:0, energy_outlets:0, description:'', images:['']};

    // Forms for items
    const [device, setDevice] = useState(deviceForm);
    const [licence, setLicence] = useState(licenceForm);
    const [room, setRoom] = useState(roomForm);

    // Editing Flag
    const [editingDevice, setEditingDevice] = useState(false);
    const [editingLicence, setEditingLicence] = useState(false);
    const [editingRoom, setEditingRoom] = useState(false);

    // First caller
    useEffect(() => {
        getInventoryList();
    }, [],);

    // Inventory List
    async function getInventoryList() {

        const listLicences = await APImethods.allLicences();
        setLicences(listLicences);
        const listRooms = await APImethods.allRooms();
        setRooms(listRooms);
        const listDevices = await APImethods.allDevices();
        setDevices(listDevices);

    }
    async function getLicences() {
        const listLicences = await APImethods.allLicences();
        setLicences(listLicences);
    }
    async function getRooms() {
        const listRooms = await APImethods.allRooms();
        setRooms(listRooms);
    }
    async function getDevices() {
        const listDevices = await APImethods.allDevices();
        setDevices(listDevices);
    }
    // Inventory Delete
    async function deleteLicence(id) {
        await APImethods.deleteLicence(id);
        getLicences();
    }
    async function deleteRoom(id) {
        await APImethods.deleteRoom(id);
        getRooms();
    }
    async function deleteDevice(id) {
        await APImethods.deleteDevice(id);
        getDevices();
    }

    // List of items to render
    const listDevices = devices.map((device) => 
        <div className="item">
        <Flex direction="row" gap="2rem">
        <h3>{device.name}</h3>
        <Button onClick={() => {
            setDevice(device);
            setEditingDevice(true);
        }}>Editar</Button>
        <Button onClick={() => {deleteDevice(device.id)}}>Eliminar</Button>
        </Flex>
        </div>
    )
    const listLicences = licences.map((licence) => 
        <div className="item">
        <Flex direction="row" gap="2rem" justifyContent='right'>
        <h3>{licence.name}</h3>
        <Button onClick={() => {
            setLicence(licence);
            setEditingLicence(true);
        }}>Editar</Button>
        <Button onClick={() => {deleteLicence(licence.id)}}>Eliminar</Button>
        </Flex>
        </div>
    )
    const listRooms = rooms.map((room) => 
        <div className="item">
        <Flex direction="row" gap="2rem">
        <h3>{room.name}</h3>
        <Button onClick={() => {
            setRoom(room);
            setEditingRoom(true);
        }}>Editar</Button>
        <Button onClick={() => {deleteRoom(room.id)}}>Eliminar</Button>
        </Flex>
        </div>
    )
    
    // Buttons
    const submitButtonDevice = () => {
        if (editingDevice) {
            return <Button onClick={() => {console.log(device)}}>Editar</Button>
        } else {
            return <Button onClick={() => {console.log(device)}}>Agregar</Button>
        }
    }
    const submitButtonLicence = () => {
        if (editingLicence) {
            return <Button onClick={() => {}}>Editar</Button>
        } else {
            return <Button onClick={() => {}}>Agregar</Button>
        }
    }
    const submitButtonRoom = () => {
        if (editingRoom) {
            return <Button onClick={() => {}}>Editar</Button>
        } else {
            return <Button onClick={() => {}}>Agregar</Button>
        }
    }

    return (
        <>
        <Flex direction="column">
        <Heading level={1}>Administracion de Inventario</Heading>
        <Tabs spacing="equal" justifyContent="flex-start">

            {/* ////////////////// DEVICES ////////////////// */}
            <TabItem title="Equipos">
            <Flex direction="row">
            {/* List of Devices */}
            <Flex direction="column">
            {listDevices}
            </Flex>
            {/* Form of Device */}
            <Flex className='form' direction="column">
            <Button onClick={() => {setDevice(deviceForm); setEditingDevice(false);}}>Agregar Nuevo</Button>
            <TextField label="Nombre" name='deviceName' defaultValue={device.name} onChange={() => {
                const newDevice = device;
                newDevice.name = document.getElementsByName('deviceName')[0].value;
                setDevice(newDevice);
            }}/>
            <CheckboxField label="Portatil" name='devicePortable' defaultChecked={device.portable} onChange={() => {
                const newDevice = device;
                newDevice.portable = document.getElementsByName('devicePortable')[0].checked;
                setDevice(newDevice);
            }}/>
            <TextField label="Sistema Operativo" name='deviceOS' defaultValue={device.os} onChange={() => {
                const newDevice = device;
                newDevice.os = document.getElementsByName('deviceOS')[0].value;
                setDevice(newDevice);
            }}/>
            <StepperField label="Almacenamiento (GB)" name='deviceStorage' defaultValue={device.storage} step={128} min={128} onChange={() => {
                const newDevice = device;
                newDevice.storage = document.getElementsByName('deviceStorage')[0].value;
                setDevice(newDevice);
            }}/>
            <StepperField label="Memoria (GB)" name='deviceRAM' defaultValue={device.ram} step={2} min={2} onChange={() => {
                const newDevice = device;
                newDevice.ram = document.getElementsByName('deviceRAM')[0].value;
                setDevice(newDevice);
            }}/>
            <TextAreaField label="Descripcion" name='deviceDescription' defaultValue={device.description} onChange={() => {
                const newDevice = device;
                newDevice.description = document.getElementsByName('deviceDescription')[0].value;
                setDevice(newDevice);
            }}/>
            {submitButtonDevice()}
            </Flex>
            </Flex>
            </TabItem>

            {/* ////////////////// LICENCES ////////////////// */}
            <TabItem title="Licencias">
            <Flex direction="row">
            {/* List of Devices */}
            <Flex direction="column">
            {listLicences}
            </Flex>
            {/* Form of Device */}
            <Flex className='form' direction="column">
            <Button onClick={() => {setLicence(licenceForm); setEditingLicence(false);}}>Agregar Nuevo</Button>
            <TextField label="Nombre" defaultValue={licence.name}/>
            <StepperField label="Año" defaultValue={licence.year} step={1} min={1990}/>
            <Text fontSize={16}>Compatibilidad</Text>
            <Flex direction="row" gap="1rem">
            <CheckboxField label="Windows"/>
            <CheckboxField label="macOS"/>
            <CheckboxField label="Linux"/>
            </Flex>
            <Text fontSize={16}>Categoria</Text>
            <Flex direction="row" gap="1rem">
            <CheckboxField label="Matematicas"/>
            <CheckboxField label="Arquitectura"/>
            <CheckboxField label="Programacion"/>
            </Flex>
            <Flex direction="row" gap="1rem">
            <CheckboxField label="Arte"/>
            <CheckboxField label="Economia"/>
            </Flex>
            <TextAreaField label="Descripcion" defaultValue={licence.description} />
            {submitButtonLicence()}
            </Flex>
            </Flex>
            </TabItem>

            {/* ////////////////// ROOMS ////////////////// */}
            <TabItem title="Salones">
            <Flex direction="row">
            {/* List of Devices */}
            <Flex direction="column">
            {listRooms}
            </Flex>
            {/* Form of Room */}
            <Flex className='form' direction="column">
            <Button onClick={() => {setRoom(roomForm); setEditingRoom(false);}}>Agregar Nuevo</Button>
            <TextField label="Nombre" defaultValue={room.name}/>
            <TextField label="Edificio" defaultValue={room.building}/>
            <Text fontSize={16}>Amenidades</Text>
            <Flex direction="row" gap="1rem">
            <CheckboxField label="Proyector" defaultChecked={room.proyector}/>
            <CheckboxField label="WIFI" defaultChecked={room.wifi}/>
            <CheckboxField label="Pizarron" defaultChecked={room.board}/>
            </Flex>
            <Flex direction="row" gap="1rem">
            <CheckboxField label="Aire Acondicionado" defaultChecked={room.air_conditioner}/>
            <CheckboxField label="Ethernet" defaultChecked={room.ethernet}/>
            </Flex>
            <Flex direction="row" gap="1rem">
            <CheckboxField label="Computadoras" defaultChecked={room.computers}/>
            <CheckboxField label="Doble Monitor" defaultChecked={room.double_monitor}/>
            </Flex>
            <StepperField label="Asientos" defaultValue={room.seats} step={1} min={0}/>
            <StepperField label="Tomas de Corriente" defaultValue={room.energy_outlets} step={1} min={0}/>
            <TextAreaField label="Descripcion" defaultValue={room.description} />
            {submitButtonRoom()}
            </Flex>
            </Flex>
            </TabItem>


        </Tabs>
        </Flex>
        </>
    )
}

export default Admin_inventory
