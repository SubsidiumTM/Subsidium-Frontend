import React, { useState, useEffect } from 'react'
import { Flex, Heading } from '@aws-amplify/ui-react';
import { APImethods } from '../api/APImethods';
import { Loader } from '@aws-amplify/ui-react';
import './news.css'

const News_reading = (props) => {
    // Data from props
    const [body, setBody] = useState([])
    const [image, setImage] = useState([<Loader />])
    const param = window.location.pathname.substring(10);

    // First Caller
    useEffect(() => {
        getNewsBody();
    }, [],);

    async function getNewsBody() {
        console.log(param);
        const response = await APImethods.getNew(param);
        setBody(response);
        if (response.image != "") {
        try {
            const url = await APImethods.getImage(response.image);
            setImage(<img className='read' src={url} alt={"Error cargando la imagen"}/>)
        } catch (error) {
            console.log("Error getting file: ", error);
        }
        }
    }

    return (
        <>
        <div className="background">
            
        <Heading level={1}>Noticias</Heading>
        <Flex direction="column">

        <h2>{body.title}</h2>
        <div className="image">
        {image}
        </div>

        <h3>{body.description}</h3> 
        <h3>{body.date_published}</h3>

        <p>{body.content}</p>


        </Flex>
        </div>
        </>
    )
}

export default News_reading
