/* eslint no-unused-expressions: 0 */
import { toast } from 'react-toastify';
import './css/styles.scss';

class Alert {
    /*
    * React-tTastify
    * Import: import { ToastContainer, toast } from 'react-toastify';
    * Css: import './css/styles.scss';
    * Usage: (import and Call the <ToastContainer /> at the main parent component
    *         or in the calling component e.g)
    *   class App extends React.Component{
    *       render(){
    *           return (
    *               <div>
    *                   <SampleComponent>
    *                   <ToastContainer />
    *               </div>
    *           );
    *       }
    *   }
    *  Using Alert.js
    *   import Alert from '../common/Alert';
    *
    *   handleAlert = () => {
    *       Alert.success('my message');
    *   }
    *
    */
    static notificationTheme(message, theme) {
        return toast(message, {
            type: theme,
            position: toast.POSITION.TOP_RIGHT,
            autoClose: true,
            hideProgressBar: true
        });
    }
    static success(message = 'nothing set') {
        this.notificationTheme(message, 'success');
    }
    static error(message = 'nothing set') {
        this.notificationTheme(message, 'danger');
    }
    static info(message = 'nothing set') {
        this.notificationTheme(message, 'info');
    }
    static warning(message = 'nothing set') {
        this.notificationTheme(message, 'warning');
    }
}

export default Alert;
