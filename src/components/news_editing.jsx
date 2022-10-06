import { Flex, TextAreaField, TextField, View, Heading } from '@aws-amplify/ui-react';
import React, { useEffect, useState } from 'react'
import { APImethods } from '../api/APImethods';

const News_editing = (props) => {
    // Data from props
    const param = window.location.pathname.substring(18);
    const [body, setBody] = useState([{title:'', description:'', content:''}]);
    const [editing, setEditing] = useState(false);

    // First Caller
    useEffect(() => {
        getNewsBody();
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
                "", // TOFDO: Add image
                form.get('content'),
            );
            console.log("Se publico")
        }
        props.news_body = "hola"
    }


    return (
        <>
        <Heading level={1}>Edicion de Noticias</Heading>
        <View as="form" onSubmit={submitAction}>

        <Flex direction="column">

        <TextField label='Titulo' name='title' placeholder='Titulo' width='50%' defaultValue={body.title}/>
        <TextField label='Descripcion' name='description' placeholder='Una breve descripcion' width='50%'  required defaultValue={body.description}/>
        <TextField  label='Fecha' name='date' placeholder='DD/MM/AAAA' width='25%' required type='date'/>
        <TextAreaField label='Noticia' name='content' placeholder='A escribir ...' size='small' width='75%'  required defaultValue={body.content} />

        {submitButton()}

        </Flex>

        </View>
        </>
    )
}

export default News_editing
