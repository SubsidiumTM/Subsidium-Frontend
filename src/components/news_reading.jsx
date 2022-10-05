import React, { useState, useEffect } from 'react'
import { Flex } from '@aws-amplify/ui-react';
import { APImethods } from '../api/APImethods';

const News_reading = (props) => {
    // Data from props
    const [body, setBody] = useState([])
    const param = window.location.pathname.substring(10);

    // First Caller
    useEffect(() => {
        getNewsBody();
    }, [],);

    async function getNewsBody() {
        console.log(param);
        const response = await APImethods.getNew(param);
        setBody(response);
    }

    return (
        <>
        <h1>Noticias</h1>
        <Flex direction="column">

        <h2>{body.title}</h2>

        <h3>{body.description}</h3> 
        <h3>{body.date_published}</h3>

        <p>{body.content}</p>

        </Flex>
        </>
    )
}

export default News_reading
