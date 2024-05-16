import React from 'react';
import { ApolloClient, InMemoryCache, HttpLink, ApolloProvider } from '@apollo/client';

// Define the GraphQL endpoint
const GRAPHQL_ENDPOINT = 'http://localhost:8010/proxy/better-prof/graphql';

// Create an Apollo Client instance
const client = new ApolloClient({
  link: new HttpLink({
    uri: GRAPHQL_ENDPOINT,
  }),
  cache: new InMemoryCache(),
});

// Create a wrapper component for ApolloProvider
const ApolloProviderWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);

export default ApolloProviderWrapper;
