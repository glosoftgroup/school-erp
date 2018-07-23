import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
// import Character from './character';
import FinacialDetails from './FinacialDetails';

export const HERO_QUERY = gql`
{
  allFeeStructure {
    id, amount, course {
      id, name
    }, feeItems {
      id, name, amount, compulsory, choice
    } term {
      id, name
    } academicYear {
      id, name
   }, 
  }
}
`;

const App = ({ episode }) => (
    <Query query={HERO_QUERY} variables={{id: 1}}>
        {result => {
            const { loading, error, data } = result;

            if (loading) {
                return <div>Loading</div>;
            }
            if (error) {
                return <h1>ERROR</h1>;
            }

            return <FinacialDetails data={data} />;
        }}
    </Query>
);

export default App;
