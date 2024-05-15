import React from 'react';
import ReactDOM from 'react-dom';
import ApolloProviderWrapper from './ApolloClient';
import App from './App';
import './index.css'; // Import your CSS file

ReactDOM.render(
  <React.StrictMode>
    <ApolloProviderWrapper>
      <App />
    </ApolloProviderWrapper>
  </React.StrictMode>,
  document.getElementById('root')
);