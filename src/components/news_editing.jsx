import { Flex, TextAreaField, TextField, View, Heading } from '@aws-amplify/ui-react';
import { Button } from 'antd';
import React, { useEffect, useState } from 'react'
import { Auth } from 'aws-amplify'
import { APImethods } from '../api/APImethods';
import './news.css'

const News_editing = (props) => {
    // Data from props
    const param = window.location.pathname.substring(18);
    const [user, setUser] = useState([])
    const [body, setBody] = useState({title:'', description:'', content:'', image:''});
    const [imageURL, setImageURL] = useState('');
    const [editing, setEditing] = useState(false);

    // First Caller
    useEffect(async () => {
        await (getUser())
        getNewsBody();
    }, [],);

    // Checking User Permission
    async function getUser() {
        const response = await Auth.currentUserInfo();
        const username = response.username;
        const userInfo = await APImethods.getUser(username);
        setUser(userInfo.listUsers.items[0].type)
        console.log(userInfo)
    }

    // Get News Body
    async function getNewsBody() {
        const response = await APImethods.getNew(param);
        
        console.log(response);
        if (response == null) {
            setEditing(false);
        }
        else {
            setEditing(true);
            setBody(response);
            try {
                const url = await APImethods.getImage(response.image);
                setImageURL(url);
            } catch (error) {
                console.log("Error getting file: ", error);
            }
        }
    }

    // Activation Buttons
    const submitButton = () => {
        if (editing) {
            return <button type='submit'>Modificar</button>
        }
        else {
            return <button type='submit'>Publicar</button>
        }
    }

    const imageSelection = () => {
        if (body.image == "") {
            return <>
                <input id='image' type='file' accept='image/*' />
                <Button onClick={async () => {
                    try {
                        const file = document.getElementById('image').files[0]
                        const filename = file.name
                        await APImethods.uploadImage(file)
                        const newBody = body;
                        newBody.image = filename;
                        setBody(newBody);
                        setImageURL(await APImethods.getImage(filename))
                    }
                    catch (error) {
                        console.log("No se ha elegido una imagen")
                    }
                }}>Subir Imagen</Button>
            </>
        }
        else {
            return <>
                <img src={imageURL} alt='Imagen de la noticia' height='100px' width='100px'/>
                <Button onClick={async () => {
                    console.log(body)
                    await APImethods.deleteImage(body.image);
                    const newBody = body;
                    newBody.image = '';
                    setBody(newBody);
                    setImageURL('');
                }}>Borrar Imagen</Button>
            </>
        }
    }

    // API Creation or Mutation of News
    async function submitAction(event) {
        if (editing) {
            const form = new FormData(event.target);
            await APImethods.updateNew(
                body.id,
                form.get('title'),
                form.get('description'),
                form.get('date'),
                body.image,
                form.get('content'),
            );
            console.log("Se edito")
        }
        else {
            const form = new FormData(event.target);
            await APImethods.createNew(
                form.get('title'),
                form.get('description'),
                form.get('date'),
                body.image, // TOFDO: Add image
                form.get('content'),
            );
            console.log("Se publico")
        }
        props.news_body = "hola"
    }


    return (
        <>
        {(user == "ADMIN" || user == "GENERAL_ADMIN") ?
        
        <div className="background">
        <Heading level={1}>Edicion de Noticias</Heading>
        <View as="form" onSubmit={submitAction}>

        <Flex direction="column">

        <TextField label='Titulo' name='title' placeholder='Titulo' width='100%' defaultValue={body.title}/>
        <TextField label='Descripcion' name='description' placeholder='Una breve descripcion' width='100%'  required defaultValue={body.description}/>

        <div className="image">
        <Flex direction='column'>
        {imageSelection()}
        </Flex>
        </div>

        <TextField  label='Fecha' name='date' placeholder='DD/MM/AAAA' width='100%' required type='date'/>
        <TextAreaField label='Noticia' name='content' placeholder='A escribir ...' size='small' width='100%'  required defaultValue={body.content} />

        {submitButton()}

        </Flex>

        </View>
        </div>

        :
        <div className="background">
        <Heading level={1}>No tienes permisos para ver esta pagina</Heading>
        </div>
        }
        </>
    )
}

export default News_editing
