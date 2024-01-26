import { useEffect, useState } from "react";
import "./Home.scss";
import MessageItem from "../components/MessageItem";
const Home = () => {
  const [guestMessages, setGuestMessages] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  // const ref = useRef();

  useEffect(() => {
    fetch(backendUrl, { method: "GET" })
      .then((res) => res.json())
      .then(({ success, result, error }) => {
        if (!success) console.log(error);
        setGuestMessages(result);
      });
  }, []);

  const addMessage = () => {
    const data = new FormData();
    // const fileField = document.querySelector('input[type="file"]');
    data.append("firstName", firstName);
    data.append("lastName", lastName);
    data.append("email", email);
    data.append("message", message);

    if (image) {
      data.append("image", image, image.name); // value ist ein string
    }
    fetch(backendUrl, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then(({ success, result, error }) => {
        if (!success) console.log(error);
        else setGuestMessages(result);
      });
    console.log(data.get("image"));
  };

  console.log(guestMessages);

  return (
    <section className="homePage">
      <div className="messageInput">
        <h1>Dear Guest, please leave your message</h1>
        <form>
          <input
            type="text"
            placeholder="first name"
            onChange={(event) => setFirstName(event.target.value)}
            value={firstName}
          />
          <input
            type="text"
            placeholder="last name"
            onChange={(event) => setLastName(event.target.value)}
            value={lastName}
          />
          <input
            type="email"
            placeholder="E-Mail"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
          />
          <textarea
            name="message"
            id="message"
            cols="30"
            rows="10"
            placeholder="Please leave your message"
            onChange={(event) => setMessage(event.target.value)}
            value={message}
          ></textarea>
          <input
            type="file"
            onChange={(event) => setImage(event.target.files[0])}
          />
        </form>
        <button onClick={addMessage}>Submit</button>
      </div>
      <article className="messages">
        <h1>GUESTBOOK</h1>
        <div className="messagesList">
          {guestMessages ? (
            guestMessages.map((guestMessage) => (
              <MessageItem
                key={guestMessage.id}
                firstName={guestMessage.firstName}
                lastName={guestMessage.lastName}
                email={guestMessage.email}
                message={guestMessage.message}
                image={guestMessage.image}
              />
            ))
          ) : (
            <p>no messages</p>
          )}
        </div>
      </article>
    </section>
  );
};

export default Home;
