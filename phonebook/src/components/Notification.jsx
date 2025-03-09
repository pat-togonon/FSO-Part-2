const Notification = ({ message }) => {
    if (message === null) {
        return null;
    };

    const notificationBoxStyle = {
        color: 'green',
        borderStyle: 'solid',
        borderRadius: 2,
        padding: 10,
        marginBottom: 10,
        fontSize: 20
    };

    return (
        <div style={notificationBoxStyle}>
            <p>{message}</p>         
        </div>
    )

};

export default Notification;