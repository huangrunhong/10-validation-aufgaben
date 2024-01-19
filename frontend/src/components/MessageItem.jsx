const MessageItem = ({ firstName, lastName, email, message, image }) => {
  return (
    <div className="message">
      <h2>
        {firstName} {lastName}
      </h2>
      <h3>{email}</h3>
      <p>{message}</p>
      <img src={image} alt="image" />
    </div>
  );
};

export default MessageItem;
