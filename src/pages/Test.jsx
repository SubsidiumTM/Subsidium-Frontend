import React, { useState } from 'react'
import { Storage } from 'aws-amplify'
import Image from '../components/image'
import { APImethods } from '../api/APImethods'
import { Loader } from '@aws-amplify/ui-react'

function Test() {
    const [filename, setFile] = useState(null)
    const [fileUrl, setFileUrl] = useState(null)
    const [image, setImage] = useState(<Loader />)

    function imageExists() {
        try {
            const file = document.getElementById('image').files[0]
            console.log(file)
            const filename = file.name
            setFile('filename')
            console.log(filename)
        }
        catch (error) {
            console.log("No se ha elegido una imagen")
        }
    }

    async function upload() {
        const file = document.getElementById('image').files[0]
        await APImethods.uploadImage(file)
        setFile(file.name)
        await download()
    }

    async function download() {
        const url = await APImethods.getImage(filename);
        setFileUrl(url)
        console.log(url)
        setImage(<Image name={url} />)
    }

    async function deleteImage() {
        await APImethods.deleteImage(filename)
        console.log("Imagen eliminada")
        setImage(<Loader />)
    }

    return (
        <div>
        <h1>Pruebas</h1>

        <input id='image' type="file"/>;

        <button onClick={() => {imageExists()}}>Exist</button>
        <button onClick={() => {upload()}}>Upload</button>
        <button onClick={() => {deleteImage()}}>Erase</button>
        <button onClick={() => {download()}}>Download</button>
        <p>Hola</p>
        {image}
        <p>Adios</p>
        
        </div>
    )
}

export default Test
