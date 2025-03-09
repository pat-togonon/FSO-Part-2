const ErrorNotification = ({ message }) => {

    const errorStyle = {
        color: 'red',
        borderStyle: 'solid',
        borderRadius: 2,
        padding: 10,
        marginBottom: 10,
        fontSize: 20
    }

    if (message === null) {
        return null;
    }

    return (
        <div style={errorStyle}>
            {message}
        </div>

    );
};

export default ErrorNotification;