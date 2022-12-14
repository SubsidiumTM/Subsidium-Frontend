import React, { useState, useEffect } from 'react'
import { Flex, Heading, Loader } from '@aws-amplify/ui-react'
import { APImethods } from '../api/APImethods'
import './news_preview_list.css'
import { Auth } from 'aws-amplify'
import { Button, message, Popconfirm } from 'antd'

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

    // Deleting the News
    async function deleteNews (id) {
        await APImethods.deleteNew(id);
        console.log("Borrando noticia con id: " + id);
        getNews();
        message.success("Noticia borrada");
    }

    // Fetch user data
    async function getUser() {
        const response = await Auth.currentUserInfo();
        const username = response.username;
        const userInfo = await APImethods.getUser(username);
        setUser(userInfo.listUsers.items[0].type)
        console.log(userInfo)
    }

    // Buttons by permissinon
    const editButton = (news) => {
        if (user == "ADMIN" || user == "GENERAL_ADMIN") {
            return <>
                <Button><a href={`/noticias/edicion/${news.id}`}>Editar</a></Button>
                <Popconfirm
                title="¿Estás seguro de que quieres eliminar esta noticia?"
                onConfirm={() => deleteNews(news.id)}
                okText="Sí"
                cancelText="No"
                >
                <Button>Borrar</Button>
                </Popconfirm>
            </>
        }
        else {
            return <></>
        }
    }
    const addButton = () => {
        if (user == "ADMIN" || user == "GENERAL_ADMIN") {
            return <>
                <Flex direction="row" justifyContent="center">
                <button className='Nuevo'><a href={`/noticias/edicion/nuevo`}>Escribir Noticia</a></button>
                </Flex>
            </>
        }
        else {
            return <></>
        }
    }

    // List of item variables
    const listNewsPreview = listNews.map((news) =>
        <Flex direction="row" justifyContent="center">
        <NewsItem news={news} />
        {editButton(news)}
        </Flex>
    );

    return (
        <>
        {/*rgba(190,191,186,255)*/}
        {addButton()}
            <Flex direction="column" style={{backgroundColor: "rgba(19,27,48,255)"}}>
                <p></p>
            {listNewsPreview}
            </Flex>
        </>
    )
}

export default News_preview_list

function NewsItem(props) {
  const news = props.news;
  const [imageURL, setImageURL] = useState(null);

  useEffect(() => {
    async function getImage() {
      const url = await APImethods.getImage(news.image);
      setImageURL(url);
    }
    getImage();
  }, []);

  return (
    <>
    <div className="news_panel">
        {(imageURL === null) ? <Loader /> : <img src={imageURL}/>}
        <a href={`/noticias/${news.id}`}>
        <h2>{news.title}</h2>
        <h4>{news.description}</h4>
        <h4>{news.date_published}</h4>
        </a>
    </div>
    </>
  )
}
