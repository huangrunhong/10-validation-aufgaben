const MessageItem = ({ firstName, lastName, email, message, image }) => {
  return (
    <div className="message">
      <div className="infomation">
        <h2>
          {firstName} {lastName}
        </h2>
        <h3>{email}</h3>
        <p>{message}</p>
      </div>
      <div className="imageFrame">
        <img src={image} alt="image" />
      </div>
    </div>
  );
};

export default MessageItem;
