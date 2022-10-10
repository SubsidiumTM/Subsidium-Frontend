import { Flex, TextAreaField, TextField, View, Heading } from '@aws-amplify/ui-react';
import { Button } from 'antd';
import React, { useEffect, useState } from 'react'
import { APImethods } from '../api/APImethods';
import './news.css'

const News_editing = (props) => {
    // Data from props
    const param = window.location.pathname.substring(18);
    const [body, setBody] = useState({title:'', description:'', content:'', image:''});
    const [imageURL, setImageURL] = useState('');
    const [editing, setEditing] = useState(false);

    // First Caller
    useEffect(() => {
        getNewsBody();
        console.log(body);
    }, [],);

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
        <div className="background">
        <Heading level={1}>Edicion de Noticias</Heading>
        <View as="form" onSubmit={submitAction}>

        <Flex direction="column">

        <TextField label='Titulo' name='title' placeholder='Titulo' width='50%' defaultValue={body.title}/>
        <TextField label='Descripcion' name='description' placeholder='Una breve descripcion' width='50%'  required defaultValue={body.description}/>

        {imageSelection()}

        <TextField  label='Fecha' name='date' placeholder='DD/MM/AAAA' width='25%' required type='date'/>
        <TextAreaField label='Noticia' name='content' placeholder='A escribir ...' size='small' width='75%'  required defaultValue={body.content} />

        {submitButton()}

        </Flex>

        </View>
        </div>
        </>
    )
}

export default News_editing
