const MessageItem = ({ firstName, lastName, email, message }) => {
  return (
    <div className="message">
      <h2>
        {firstName} {lastName}
      </h2>
      <h3>{email}</h3>
      <p>{message}</p>
    </div>
  );
};

export default MessageItem;
