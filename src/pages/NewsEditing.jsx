import React from 'react'
import News_editing from '../components/news_editing'
import SubsidiumAuth from '../components/AuthenticationWrap'
import '../components/NewsEditing.css'

function NewsEditing() {
  return (
    <body className='editingBack'>
    <SubsidiumAuth jsx={<News_editing news_body={null}/>}/>
    </body>
  )
}

export default NewsEditing
