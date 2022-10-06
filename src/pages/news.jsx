import React from 'react'
import { Heading } from '@aws-amplify/ui-react'
import News_preview_list from '../components/news_preview_list';

function News() {
  return (
    <div>
    <Heading level={1}>Noticias</Heading>
    <News_preview_list />
    </div>
  )
}

export default News;
