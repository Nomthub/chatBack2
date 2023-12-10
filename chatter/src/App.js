import './App.css';
import React, {Component} from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

//components
import TutorialList from './components/Tutoriallist';

//apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

class App extends Component {
  render(){
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <h1> Build 3</h1>
          <TutorialList/>
        </div>
      </ApolloProvider>
    );
  }
  
}

export default App;
