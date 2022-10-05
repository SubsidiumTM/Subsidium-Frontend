import { Flex, TextAreaField, TextField, View } from '@aws-amplify/ui-react';
import React, { useEffect, useState } from 'react'

const News_editing = (props) => {
    // Variables for page logic
    const editing = (props.news_body != null);
    const [newsBody, setNewsBody] = useState([]);

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
    function submitAction(event) {
        if (editing) {
            console.log("Se edito")
        }
        else {
            console.log("Se publico")
        }
        props.news_body = "hola"
    }


    return (
        <>
        <h1>Edicion de Noticias</h1>
        <View as="form" onSubmit={submitAction}>

        <Flex direction="column">

        <TextField name='title' placeholder='Titulo' required/>
        <TextField name='description' placeholder='Una breve descripcion' required/>
        <TextField name='date' placeholder='DD/MM/AAAA' required/>
        <TextAreaField name='content' placeholder='A escribir ...' required/>

        {submitButton()}

        </Flex>

        </View>
        </>
    )
}

export default News_editing
