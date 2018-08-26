import React from 'react';
import gql from 'graphql-tag';
import ApolloClient from 'apollo-boost';
import {ApolloProvider, Query} from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import 'normalize.css/normalize.css';
import 'styles/App.css';

const client = new ApolloClient({
  // By default, this client will send queries to the
  //  `/graphql` endpoint on the same host
  // Pass the configuration option { uri: YOUR_GRAPHQL_API_URL } to the `HttpLink` to connect
  // to a different host
  // link: new HttpLink({
  //   uri: 'http://localhost:8090/graphql'
  // }),
  uri: "http://localhost:8090/graphql",
  cache: new InMemoryCache()
});
const rateQuery = gql`
  query getGreetings {
    Greetings {
      id
      message
    }
  }
`;

const ExchangeRates = ({id}) => (
  <Query
    query={rateQuery}
    // variables={{ id }}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
    
      console.log(data.Greetings)
      const greetings =  data.Greetings;
      let count = 0;
      const GreetingListComponent = greetings.map(greeting => {
        return (
          <div key={count++}>
            {greeting.id} : {greeting.message}
          </div>
        )}
      )
      return (
        <div>
          {GreetingListComponent}
        </div>
      );
    }}
  </Query>
);

const App = () => (
  <ApolloProvider client={client}>
    <div>
      <p>
        My first apollo app
      </p>
      <ExchangeRates
        id="de09dc15-1848-44fe-8362-0a58504b54e9"
      />
    </div>
  </ApolloProvider>
);

export default App;
