import React from 'react'
import { Heading } from '@aws-amplify/ui-react'
import News_preview_list from '../components/news_preview_list';
import '../components/news.css'

function News() {
  return (
    <body className='newsBack'>
      <div className='background'>
      <Heading level={1}>Noticias</Heading>
      <News_preview_list />
      </div>
    </body>
  )
}

export default News;
