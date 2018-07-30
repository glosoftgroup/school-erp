import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
// import Character from './character';
import FinacialDetails from './FinacialDetails';

export const HERO_QUERY = gql`
query DashboardQuery(
    $year: String!
) {
    allFeeStructure(year:$year) {
        name feeItems {
          id, name, choice, compulsory, amount
        }
        course {
            id, name            
        }
        term {
          id, name
        }
        academicYear {
           id, name
        }
    }
}
`;

const App = ({ year }) => (
    <Query query={HERO_QUERY} variables={{year}}>
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
