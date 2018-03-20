import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { saveStudent, fetchStudent, updateStudent } from '../actions/actions';
import GameForm from './GameForm';

class GameFormPage extends React.Component {

  state = {
    redirect: false
  }

  componentDidMount = () => {
    console.log('dd mount')
  }

  saveStudent = ({_id, title, cover }) => {
 
      return this.props.saveStudent({ title, cover }).then(
        () => { this.setState({ redirect: true })},
      );
    
  }

  render() {
    return (
      <div>
        {
          this.state.redirect ?
          <Redirect to="/games" /> :
          <GameForm
            game={this.props.game}
            saveStudent={this.saveStudent}
          />
        }
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const { match } = props;
  if (match.params._id) {
    return {
      game: state.games.find(item => item._id === match.params._id)
    }
  }

  return { game: null };
}

export default connect(mapStateToProps, { saveStudent, fetchStudent, updateStudent })(GameFormPage);
