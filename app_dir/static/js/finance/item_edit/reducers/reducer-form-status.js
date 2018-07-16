import SET_STATUS from '../actions/action-form-status';

const initial = {'id': true};

export default function (state = initial, action) {
  switch (action.type) {
    case SET_STATUS:
      return action.payload;
  }
  return state;
}
