import React, { useState, useEffect } from 'react'
import { Flex } from '@aws-amplify/ui-react'
import { APImethods } from '../api/APImethods'
import './news_preview_list.css'
import { Auth } from 'aws-amplify'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import News_reading from './news_reading'

const News_preview_list = () => {
    // List of news
    const [listNews, setListNews] = useState([])
    const [user, setUser] = useState([])

    // First Caller
    useEffect(() => {
        getNews();
        getUser();
    }, [],);

    // Fetching the News
    async function getNews() {
        const response = await APImethods.allNews();
        setListNews(response);
    }

    // Fetch user data
    async function getUser() {
        const response = await Auth.currentUserInfo();
        const username = response.username;
        const userInfo = await APImethods.getUser();
        setUser(userInfo.listUsers.items[0].type)
    }

    // Buttons by permissinon
    const editButton = (news) => {
        if (user == "ADMIN" || user == "GENERAL_ADMIN") {
            return <>
                <button>Editar</button>
                <button>Borrar</button>
            </>
        }
        else {
            return <></>
        }
    }

    const addButton = () => {
        if (user == "USER" || user == "GENERAL_ADMIN") {
            return <>
                <Flex direction="row" justifyContent="center">
                <a>
                <button className='Nuevo'>Escribir Noticia</button>
                </a>
                </Flex>
            </>
        }
        else {
            return <></>
        }
    }

    function test () {
        console.log("Hola");
    }

    // List of item variables
    const listNewsPreview = listNews.map((news) =>
        <Flex direction="row" justifyContent="center">
        <div className="news_panel">
        <a href={`/noticias/${news.id}`}>
        <h2>{news.title}</h2>
        </a>
        </div>
        {editButton(news)}
        </Flex>
    );

    return (
        <>
        {addButton()}
        <Flex direction="column" gap="2rem">
        {listNewsPreview}
        </Flex>
        </>
    )
}

export default News_preview_list
