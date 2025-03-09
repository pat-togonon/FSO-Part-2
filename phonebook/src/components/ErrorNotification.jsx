const ErrorNotification = ({ message }) => {

    if (message === null) {
        return null;
    }

    const notificationStyle = {
        color: 'red',
        borderStyle: 'solid',
        borderRadius: 2,
        padding: 10,
        marginBottom: 10,
        fontSize: 20
    };

    return (
        <div style={notificationStyle}>
            <p>{message}</p>
        </div>

    );

};

export default ErrorNotification;