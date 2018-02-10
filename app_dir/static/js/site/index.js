import React from 'react';
import ReactDOM from 'react-dom';

import InstitutionDetails from './components/InstitutionDetails';
import SmsSettings from './components/SmsSettings';

// basic settings
ReactDOM.render(<InstitutionDetails />, document.getElementById('basic'));

// sms settings
ReactDOM.render(<SmsSettings />, document.getElementById('sms'));
