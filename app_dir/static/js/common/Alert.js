/* eslint no-unused-expressions: 0 */
import {jGrowl} from 'jgrowl';

class Alert {
    constructor() {
        try { jGrowl; } catch (error) {};
    }
    static notificationTheme(message, header, theme) {
        return $.jGrowl(
            message,
            {
                header: header,
                theme: theme
            }
        );
    }
    static success(message = 'nothing set', header = null) {
        this.notificationTheme(message, header, 'bg-success');
    }
    static error(message = 'nothing set', header = null) {
        this.notificationTheme(message, header, 'bg-danger');
    }
    static info(message = 'nothing set', header = null) {
        this.notificationTheme(message, header, 'bg-info');
    }
    static warning(message = 'nothing set', header = null) {
        this.notificationTheme(message, header, 'bg-orange-400');
    }
}

export default Alert;
