class Alert {
    static notification_theme(message, header, theme){
        return $.jGrowl(
            message,
            {
                header: header,
                theme: theme
            }
        );
    }
    static success(message='nothing set', header=null){
        this.notification_theme(message, header,'bg-success')
    }
    static error(message='nothing set', header=null) {
        this.notification_theme(message, header, 'bg-danger')
    }
    static info(message='nothing set', header=null) {
        this.notification_theme(message, header, 'bg-info')
    }
    static warning(message='nothing set', header=null) {
        this.notification_theme(message, header, 'bg-orange-400')
    }
}

export default Alert