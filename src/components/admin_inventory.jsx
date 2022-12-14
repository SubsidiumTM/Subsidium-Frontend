import React, { useState, useEffect } from 'react'
import { Heading, Tabs, TabItem, Flex, Button, TextField, CheckboxField, StepperField, TextAreaField, Text, Loader } from '@aws-amplify/ui-react'
import { APImethods } from '../api/APImethods';
import { message, Popconfirm } from 'antd'

function Admin_inventory() {
    // Page info
    const [devices, setDevices] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [licences, setLicences] = useState([]);
    const [displayImageURL, setDisplayImageURL] = useState('');

    // Empty forms for items
    const deviceForm = {id:'nuevo', name:'', portable:false, os:'', processor:'', storage:0, ram:0, description:'', images:[''], active:true};
    const licenceForm = {id:'nuevo', name:'', year:'', compatibility:'', category:'', description:'', images:[''], active:true};
    const roomForm = {id:'nuevo', name:'', building:'', floor:'', proyector:false, wifi:false, board:false, air_conditioner:false, ethernet:false, computers:false, double_monitor:false, seats:0, energy_outlets:0, description:'', images:[''], active:true};

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
        message.success('Licencia eliminada');
    }
    async function deleteRoom(id) {
        await APImethods.deleteRoom(id);
        getRooms();
        message.success('Salon eliminado');
    }
    async function deleteDevice(id) {
        await APImethods.deleteDevice(id);
        getDevices();
        message.success('Dispositivo eliminado');
    }

    // List of items to render
    const listDevices = devices.map((device) => 
        <Item 
        item={device} 
        onEditClick={
            async () => {
            setDevice(device);
            setDisplayImageURL(await APImethods.getImage(device.images[0]));
            setEditingDevice(true);
        }}
        onDeleteClick={
            () => {deleteDevice(device.id)}
        }
        getReservations={
            async (id) => {
            const reservations = await APImethods.allReservationsByDevice(id);
            console.log(reservations);
            return reservations;
        }}            
        /> 
    )
    const listLicences = licences.map((licence) => 
        <Item 
        item={licence} 
        onEditClick={
            async () => {
            setLicence(licence);
            setDisplayImageURL(await APImethods.getImage(licence.images[0]));
            setEditingLicence(true);
        }}
        onDeleteClick={
            () => {deleteLicence(licence.id)}
        }
        getReservations={
            async (id) => {
            const reservations = await APImethods.allReservationsByLicence(id);
            console.log(reservations);
            return reservations;
        }}
        />
    )
    const listRooms = rooms.map((room) => 
        <Item 
        item={room} 
        onEditClick={
            async () => {
            setRoom(room);
            setDisplayImageURL(await APImethods.getImage(room.images[0]));
            setEditingRoom(true);
        }}
        onDeleteClick={
            () => {deleteRoom(room.id)}
        }
        getReservations={
            async (id) => {
            const reservations = await APImethods.allReservationsByRoom(id);
            console.log(reservations);
            return reservations;
        }}
        />
    )
    
    // Buttons
    const submitButtonDevice = () => {
        if (editingDevice) {
            return <Button type='submit' onClick={async () => {
                console.log(device.id);
                console.log(document.getElementsByName('deviceName')[0].value);
                console.log(document.getElementsByName('deviceName')[0].value);
                console.log(document.getElementsByName('devicePortable')[0].checked);
                console.log(document.getElementsByName('deviceOS')[0].value);
                console.log(document.getElementsByName('deviceProcessor')[0].value);
                console.log(document.getElementsByName('deviceStorage')[0].value);
                console.log(document.getElementsByName('deviceRAM')[0].value);
                console.log(document.getElementsByName('deviceDescription')[0].value);
                console.log(document.getElementsByName('deviceActive')[0].checked);
                await APImethods.updateDevice(
                    device.id, 
                    document.getElementsByName('deviceName')[0].value, 
                    document.getElementsByName('devicePortable')[0].checked, 
                    document.getElementsByName('deviceOS')[0].value, 
                    document.getElementsByName('deviceProcessor')[0].value,
                    parseInt(document.getElementsByName('deviceStorage')[0].value), 
                    parseInt(document.getElementsByName('deviceRAM')[0].value), 
                    document.getElementsByName('deviceDescription')[0].value,
                    device.images,
                    document.getElementsByName('deviceActive')[0].checked);
                await getDevices();
                message.success('Dispositivo actualizado');
            }}>Editar</Button>
        } else {
            return <Button type='submit' onClick={async () => {
                console.log(document.getElementsByName('deviceName')[0].value);
                console.log(document.getElementsByName('devicePortable')[0].checked);
                console.log(document.getElementsByName('deviceOS')[0].value);
                console.log(document.getElementsByName('deviceProcessor')[0].value);
                console.log(parseInt(document.getElementsByName('deviceStorage')[0].value));
                console.log(parseInt(document.getElementsByName('deviceRAM')[0].value));
                console.log(document.getElementsByName('deviceDescription')[0].value);
                await APImethods.createDevice(
                    document.getElementsByName('deviceName')[0].value, 
                    document.getElementsByName('devicePortable')[0].checked, 
                    document.getElementsByName('deviceOS')[0].value,
                    document.getElementsByName('deviceProcessor')[0].value,
                    parseInt(document.getElementsByName('deviceStorage')[0].value), 
                    parseInt(document.getElementsByName('deviceRAM')[0].value), 
                    document.getElementsByName('deviceDescription')[0].value, 
                    device.images,
                    document.getElementsByName('deviceActive')[0].checked);
                await getDevices();
                message.success('Dispositivo creado');
            }}>Agregar</Button>
        }
    }
    const submitButtonLicence = () => {
        if (editingLicence) {
            return <Button type='submit' onClick={async () => {
                console.log(licence.id);
                console.log(document.getElementsByName('licenceName')[0].value);
                console.log(document.getElementsByName('licenceYear')[0].value);
                var compatibility = [];
                if (document.getElementsByName('licenceComp1')[0].checked) {
                    compatibility.push('Windows');
                }
                if (document.getElementsByName('licenceComp2')[0].checked) {
                    compatibility.push('Mac');
                }
                if (document.getElementsByName('licenceComp3')[0].checked) {
                    compatibility.push('Linux');
                }
                console.log(compatibility);
                var category = [];
                if (document.getElementsByName('licenceCat1')[0].checked) {
                    category.push('Matematicas');
                }
                if (document.getElementsByName('licenceCat2')[0].checked) {
                    category.push('Arquitectura');
                }
                if (document.getElementsByName('licenceCat3')[0].checked) {
                    category.push('Programacion');
                }
                if (document.getElementsByName('licenceCat4')[0].checked) {
                    category.push('Arte');
                }
                if (document.getElementsByName('licenceCat5')[0].checked) {
                    category.push('Economia');
                }
                console.log(category);
                console.log(document.getElementsByName('licenceDescription')[0].value);
                await APImethods.updateLicence(
                    licence.id, 
                    document.getElementsByName('licenceName')[0].value, 
                    parseInt(document.getElementsByName('licenceYear')[0].value), 
                    compatibility, 
                    category, 
                    document.getElementsByName('licenceDescription')[0].value, 
                    licence.images,
                    document.getElementsByName('licenceActive')[0].checked)
                await getLicences();
                message.success('Licencia actualizada');
            }}>Editar</Button>
        } else {
            return <Button type='submit' onClick={async () => {
                console.log(document.getElementsByName('licenceName')[0].value);
                console.log(document.getElementsByName('licenceYear')[0].value);
                var compatibility = [];
                if (document.getElementsByName('licenceComp1')[0].checked) {
                    compatibility.push('Windows');
                }
                if (document.getElementsByName('licenceComp2')[0].checked) {
                    compatibility.push('Mac');
                }
                if (document.getElementsByName('licenceComp3')[0].checked) {
                    compatibility.push('Linux');
                }
                console.log(compatibility);
                var category = [];
                if (document.getElementsByName('licenceCat1')[0].checked) {
                    category.push('Matematicas');
                }
                if (document.getElementsByName('licenceCat2')[0].checked) {
                    category.push('Arquitectura');
                }
                if (document.getElementsByName('licenceCat3')[0].checked) {
                    category.push('Programacion');
                }
                if (document.getElementsByName('licenceCat4')[0].checked) {
                    category.push('Arte');
                }
                if (document.getElementsByName('licenceCat5')[0].checked) {
                    category.push('Economia');
                }
                console.log(category);
                console.log(document.getElementsByName('licenceDescription')[0].value);
                await APImethods.createLicence(
                    document.getElementsByName('licenceName')[0].value, 
                    parseInt(document.getElementsByName('licenceYear')[0].value), 
                    compatibility, 
                    category, 
                    document.getElementsByName('licenceDescription')[0].value, 
                    licence.images,
                    document.getElementsByName('licenceActive')[0].checked);
                await getLicences();
                message.success('Licencia creada');
            }}>Agregar</Button>
        }
    }
    const submitButtonRoom = () => {
        if (editingRoom) {
            return <Button type='submit' onClick={async () => {
                console.log(room.id);
                console.log(document.getElementsByName('roomName')[0].value);
                console.log(document.getElementsByName('roomBuilding')[0].value);
                console.log(document.getElementsByName('roomFloor')[0].value);
                console.log(document.getElementsByName('roomProyector')[0].checked);
                console.log(document.getElementsByName('roomWIFI')[0].checked);
                console.log(document.getElementsByName('roomBoard')[0].checked);
                console.log(document.getElementsByName('roomAirConditioner')[0].checked);
                console.log(document.getElementsByName('roomEthernet')[0].checked);
                console.log(document.getElementsByName('roomComputers')[0].checked);
                console.log(document.getElementsByName('roomDoubleMonitor')[0].checked);
                console.log(document.getElementsByName('roomSeats')[0].value);
                console.log(document.getElementsByName('roomEnergyOutlets')[0].value);
                console.log(document.getElementsByName('roomDescription')[0].value);
                await APImethods.updateRoom(
                    room.id, 
                    document.getElementsByName('roomName')[0].value, 
                    document.getElementsByName('roomBuilding')[0].value, 
                    document.getElementsByName('roomFloor')[0].value,
                    document.getElementsByName('roomProyector')[0].checked, 
                    document.getElementsByName('roomWIFI')[0].checked, 
                    document.getElementsByName('roomBoard')[0].checked, 
                    document.getElementsByName('roomAirConditioner')[0].checked, 
                    document.getElementsByName('roomEthernet')[0].checked, 
                    document.getElementsByName('roomComputers')[0].checked, 
                    document.getElementsByName('roomDoubleMonitor')[0].checked, 
                    parseInt(document.getElementsByName('roomSeats')[0].value), 
                    parseInt(document.getElementsByName('roomEnergyOutlets')[0].value), 
                    document.getElementsByName('roomDescription')[0].value, 
                    room.images,
                    document.getElementsByName('roomActive')[0].checked);
                await getRooms();
                message.success('Salon actualizado');
            }}>Editar</Button>
        } else {
            return <Button type='submit' onClick={async () => {
                console.log(document.getElementsByName('roomName')[0].value);
                console.log(document.getElementsByName('roomBuilding')[0].value);
                console.log(document.getElementsByName('roomFloor')[0].value);
                console.log(document.getElementsByName('roomProyector')[0].checked);
                console.log(document.getElementsByName('roomWIFI')[0].checked);
                console.log(document.getElementsByName('roomBoard')[0].checked);
                console.log(document.getElementsByName('roomAirConditioner')[0].checked);
                console.log(document.getElementsByName('roomEthernet')[0].checked);
                console.log(document.getElementsByName('roomComputers')[0].checked);
                console.log(document.getElementsByName('roomDoubleMonitor')[0].checked);
                console.log(document.getElementsByName('roomSeats')[0].value);
                console.log(document.getElementsByName('roomEnergyOutlets')[0].value);
                console.log(document.getElementsByName('roomDescription')[0].value);
                await APImethods.createRoom(
                    document.getElementsByName('roomName')[0].value, 
                    document.getElementsByName('roomBuilding')[0].value, 
                    document.getElementsByName('roomProyector')[0].checked, 
                    document.getElementsByName('roomFloor')[0].value,
                    document.getElementsByName('roomWIFI')[0].checked, 
                    document.getElementsByName('roomBoard')[0].checked, 
                    document.getElementsByName('roomAirConditioner')[0].checked, 
                    document.getElementsByName('roomEthernet')[0].checked, 
                    document.getElementsByName('roomComputers')[0].checked, 
                    document.getElementsByName('roomDoubleMonitor')[0].checked, 
                    parseInt(document.getElementsByName('roomSeats')[0].value), 
                    parseInt(document.getElementsByName('roomEnergyOutlets')[0].value), 
                    document.getElementsByName('roomDescription')[0].value, 
                    room.images,
                    document.getElementsByName('roomActive')[0].checked);
                await getRooms();
                message.success('Salon creado');
            }}>Agregar</Button>
        }
    }

    // Image Controll
    const imageSelectionDevice = () => {
        if (device.images[0] == "") {
            return <>
                <input id='imageDevice' type='file' accept='image/*' />
                <Button onClick={async () => {
                    try {
                        const file = document.getElementById('imageDevice').files[0]
                        const filename = file.name
                        await APImethods.uploadImage(file)
                        const newDevice = device;
                        device.images = [filename];
                        setDevice(newDevice);
                        setDisplayImageURL(await APImethods.getImage(filename))
                    }
                    catch (error) {
                        console.log("No se ha elegido una imagen")
                    }
                }}>Subir Imagen</Button>
            </>
        }
        else {
            return <>
                <img src={displayImageURL} alt='Imagen del recurso' height='100px' width='100px'/>
                <Button onClick={async () => {
                    console.log(device)
                    await APImethods.deleteImage(device.images[0]);
                    const newDevice = device;
                    newDevice.images = [''];
                    setDevice(newDevice);
                    setDisplayImageURL('')
                }}>Borrar Imagen</Button>
            </>
        }
    }
    const imageSelectionLicence = () => {
        if (licence.images[0] == "") {
            return <>
                <input id='imageLicence' type='file' accept='image/*' />
                <Button onClick={async () => {
                    try {
                        const file = document.getElementById('imageLicence').files[0]
                        const filename = file.name
                        await APImethods.uploadImage(file)
                        const newLicence = licence;
                        licence.images = [filename];
                        setLicence(newLicence);
                        setDisplayImageURL(await APImethods.getImage(filename))
                    }
                    catch (error) {
                        console.log("No se ha elegido una imagen")
                    }
                }}>Subir Imagen</Button>
            </>
        }
        else {
            return <>
                <img src={displayImageURL} alt='Imagen del recurso' height='100px' width='100px'/>
                <Button onClick={async () => {
                    console.log(licence)
                    await APImethods.deleteImage(licence.images[0]);
                    const newLicence = licence;
                    newLicence.images = [''];
                    setLicence(newLicence);
                    setDisplayImageURL('')
                }}>Borrar Imagen</Button>
            </>
        }
    }
    const imageSelectionRoom = () => {
        if (room.images[0] == "") {
            return <>
                <input id='imageRoom' type='file' accept='image/*' />
                <Button onClick={async () => {
                    try {
                        const file = document.getElementById('imageRoom').files[0]
                        const filename = file.name
                        await APImethods.uploadImage(file)
                        const newRoom = room;
                        room.images = [filename];
                        setRoom(newRoom);
                        setDisplayImageURL(await APImethods.getImage(filename))
                    }
                    catch (error) {
                        console.log("No se ha elegido una imagen")
                    }
                }}>Subir Imagen</Button>
            </>
        }
        else {
            return <>
                <img src={displayImageURL} alt='Imagen del recurso' height='100px' width='100px'/>
                <Button onClick={async () => {
                    console.log(room)
                    await APImethods.deleteImage(room.images[0]);
                    const newRoom = room;
                    newRoom.images = [''];
                    setRoom(newRoom);
                    setDisplayImageURL('')
                }}>Borrar Imagen</Button>
            </>
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
            <div className="item_list">
            {listDevices}
            </div>
            </Flex>
            {/* Form of Device */}
            <Flex className='form' direction="column" key={device.id}>
                <Button onClick={() => {setDevice(deviceForm); setEditingDevice(false);}}>Agregar Nuevo</Button>
                <Text fontSize={11}>Editando Equipo con ID: {device.id}</Text>
                <Flex direction="row" justifyContent='center'>
                <CheckboxField name="deviceActive" label="Disponible" defaultChecked={device.active} />
                </Flex>
                <TextField label="Nombre" name='deviceName' defaultValue={device.name} required/>
                <CheckboxField label="Portatil" name='devicePortable' defaultChecked={device.portable}/>
                <TextField label="Sistema Operativo" name='deviceOS' defaultValue={device.os}/>
                <TextField label="Procesador" name='deviceProcessor' defaultValue={device.processor}/>
                <StepperField label="Almacenamiento (GB)" name='deviceStorage' defaultValue={device.storage} step={128} min={128}/>
                <StepperField label="Memoria (GB)" name='deviceRAM' defaultValue={device.ram} step={2} min={2}/>
                <Text fontSize={16}>Imagen</Text>
                {imageSelectionDevice()}
                <TextAreaField label="Descripcion" name='deviceDescription' defaultValue={device.description} required/>
                {submitButtonDevice()}
            </Flex>
            </Flex>
            </TabItem>

            {/* ////////////////// LICENCES ////////////////// */}
            <TabItem title="Licencias">
            <Flex direction="row">
            {/* List of Devices */}
            <Flex direction="column">
            <div className="item_list">
            {listLicences}
            </div>
            </Flex>
            {/* Form of Device */}
            <Flex className='form' direction="column" key={licence.id}>
                <Button onClick={() => {setLicence(licenceForm); setEditingLicence(false);}}>Agregar Nuevo</Button>
                <Text fontSize={11}>Editando Licencia con ID: {licence.id}</Text>
                <Flex direction="row" justifyContent='center'>
                <CheckboxField name="licenceActive" label="Disponible" defaultChecked={licence.active} />
                </Flex>
                <TextField label="Nombre" name='licenceName' defaultValue={licence.name}/>
                <StepperField label="A??o" name='licenceYear' defaultValue={licence.year} step={1} min={1990}/>
                <Text fontSize={16}>Compatibilidad</Text>
                <Flex direction="row" gap="1rem">
                <CheckboxField label="Windows" name='licenceComp1'/>
                <CheckboxField label="macOS" name='licenceComp2'/>
                <CheckboxField label="Linux" name='licenceComp3'/>
                </Flex>
                <Text fontSize={16}>Categoria</Text>
                <Flex direction="row" gap="1rem">
                <CheckboxField label="Matematicas" name='licenceCat1'/>
                <CheckboxField label="Arquitectura" name='licenceCat2'/>
                <CheckboxField label="Programacion" name='licenceCat3'/>
                </Flex>
                <Flex direction="row" gap="1rem">
                <CheckboxField label="Arte" name='licenceCat4'/>
                <CheckboxField label="Economia" name='licenceCat5'/>
                </Flex>
                <Text fontSize={16}>Imagen</Text>
                {imageSelectionLicence()}
                <TextAreaField label="Descripcion" name='licenceDescription' defaultValue={licence.description} />
                {submitButtonLicence()}
            </Flex>
            </Flex>
            </TabItem>

            {/* ////////////////// ROOMS ////////////////// */}
            <TabItem title="Salones">
            <Flex direction="row">
            {/* List of Devices */}
            <Flex direction="column">
            <div className="item_list">
            {listRooms}
            </div>
            </Flex>
            {/* Form of Room */}
            <Flex className='form' direction="column" key={room.id}>
                <Button onClick={() => {setRoom(roomForm); setEditingRoom(false);}}>Agregar Nuevo</Button>
                <Text fontSize={11}>Editando Salon con ID: {room.id}</Text>
                <Flex direction="row" justifyContent='center'>
                <CheckboxField name="roomActive" label="Disponible" defaultChecked={room.active} />
                </Flex>
                <Flex direction="row" gap="1rem">
                <div>
                <TextField label="Nombre" name='roomName' defaultValue={room.name}/>
                <TextField label="Edificio" name='roomBuilding' defaultValue={room.building}/>
                <TextField label="Piso" name='roomFloor' defaultValue={room.floor}/>
                </div>
                <div>
                <Text fontSize={16}>Amenidades</Text>
                <Flex direction="row" gap="1rem">
                <CheckboxField label="Proyector" name='roomProyector' defaultChecked={room.proyector}/>
                <CheckboxField label="WIFI" name='roomWIFI' defaultChecked={room.wifi}/>
                <CheckboxField label="Pizarron" name='roomBoard' defaultChecked={room.board}/>
                </Flex>
                <Flex direction="row" gap="1rem">
                <CheckboxField label="Aire Acondicionado" name='roomAirConditioner' defaultChecked={room.air_conditioner}/>
                <CheckboxField label="Ethernet" name='roomEthernet' defaultChecked={room.ethernet}/>
                </Flex>
                <Flex direction="row" gap="1rem">
                <CheckboxField label="Computadoras" name='roomComputers' defaultChecked={room.computers}/>
                <CheckboxField label="Doble Monitor" name='roomDoubleMonitor' defaultChecked={room.double_monitor}/>
                </Flex>
                </div>
                </Flex>
                <StepperField label="Asientos" name='roomSeats' defaultValue={room.seats} step={1} min={0}/>
                <StepperField label="Tomas de Corriente" name='roomEnergyOutlets' defaultValue={room.energy_outlets} step={1} min={0}/>
                <Text fontSize={16}>Imagen</Text>
                {imageSelectionRoom()}
                <TextAreaField label="Descripcion" name='roomDescription' defaultValue={room.description} />
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

function Item(props){

    const [ready, setReady] = useState(false)
    const item = props.item;
    const [imageURL, setImageURL] = useState('');
    const [reservas, setReservas] = useState([]);

    useEffect(() =>{
        async function getImage(){
            const url = await APImethods.getImage(item.images[0]);
            setImageURL(url);
        }
        async function getReservas(){
            const reservas = await props.getReservations(item.id);
            setReservas(reservas);
        }
        getImage();
        getReservas();
        setReady(true);
        console.log(reservas);
    }, []);

    const message = reservas.length > 0 ? 'Este dispositivo tiene ' + reservas.length + ' reservas pendientes ??Esta seguro que quiere borrar el recurso?' : 'Este dispositivo no tiene reservas pendientes ??Esta seguro que quiere borrar el recurso?';
    
    return (
        <div className="item">
        <Flex direction="row" gap="2rem">
        {/* Get image url from device.image[0] */}
        {ready? <img src={imageURL} width='50px' height='50px' /> : <Loader />}
        <Flex direction="column">
        <h3>{item.name}</h3>
        <Text fontSize={9}>ID {item.id}</Text>  
        </Flex>
        <Button onClick={props.onEditClick}>Editar</Button>
        <Popconfirm
        title={message}
        onConfirm={() => {
        reservas.forEach(async (reserva) => {
            await APImethods.deleteReservation(reserva.id);
        });
        props.onDeleteClick()
        }}
        okText="Si"
        cancelText="No">
        <Button>Eliminar</Button>
        </Popconfirm>
        </Flex>
        </div>
    )
}