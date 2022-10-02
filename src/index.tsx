import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './scss/styles.scss';

import Amplify from 'aws-amplify';
import config from './aws-exports';
// import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
Amplify.configure(config);

// const client = new ApolloClient({
//   uri: 'https://l6drs6iexbbdhhkad7u5dwb3fe.appsync-api.us-east-1.amazonaws.com/graphql',
//   cache: new InMemoryCache(),
// });


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  // <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  // </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
