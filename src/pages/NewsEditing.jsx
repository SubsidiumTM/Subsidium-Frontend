import React from 'react'
import News_editing from '../components/news_editing'
import SubsidiumAuth from '../components/AuthenticationWrap'

function NewsEditing() {
  return (
    <SubsidiumAuth jsx={<News_editing news_body={null}/>}/>
  )
}

export default NewsEditing
