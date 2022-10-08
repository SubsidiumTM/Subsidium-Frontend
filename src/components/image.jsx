import React from 'react'

function Image(props) {
    return (
        <>
        <img src={props.name} alt={props.name} />
        </>
    )
}

export default Image
