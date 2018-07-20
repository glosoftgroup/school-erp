import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
// import Character from './character';

export const HERO_QUERY = gql`
  query allFeeStructure {
    term {
      name
    } academicYear {
      name
    }
  }
`;

const App = ({ episode }) => (
  <Query query={HERO_QUERY} >
    {result => {
      const { loading, error, data } = result;

      if (loading) {
        return <div>Loading</div>;
      }
      if (error) {
        return <h1>ERROR</h1>;
      }

      return <div>sdfsdfsdfsdff</div>
    }}
  </Query>
);

export default App;