//import './App.css';
import React, {Component} from 'react'
import { useQuery, gql } from '@apollo/client';

const getTutorialsQuery = gql`
  query GetTutorials {
    Tutorials{
      id
      title
      description
      tutor{
        name
        occupation
      }
    }
  }
`;

function DisplayTutorials() {
  const { loading, error, data } = useQuery(getTutorialsQuery);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return data.Tutorial.map(({ id, title, description}) => (
    <div>
      <li key={id}>
        <h3>{title}</h3>
        <br/>
        <b>About this tutorial:</b>
        <p>{description}</p>
        <br />
      </li>
    </div>
  ));
}

class Tutoriallist extends Component {
  render(){
    return (
      <div>
        <ul id = "Tutorial-list">
          <li>Tutorial name</li>
          <br></br>
          <DisplayTutorials/>
        </ul>
      </div>
    );
  }
  
}

export default Tutoriallist;