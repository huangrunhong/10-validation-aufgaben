const express = require("express");
const { readJsonFile, writeJsonFile } = require("./fsUnit");
const cors = require("cors");
const multer = require("multer");
const { schema } = require("./validation");

const app = express();

const OK = 200;
const CREATED = 201;
const INTERNAL_SERVER_ERROR = 500;
const BAD_REQUEST = 400;

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (_, file, next) => next(null, file.originalname),
});
const uploadMiddleware = multer({ storage: storage });
app.use(express.json());
app.use(cors());
app.use(express.static("uploads"));
app.use((req, res, next) => {
  console.log("new Request: ", req.method, req.url);
  next();
});

app.get("/", (_, res) => {
  readJsonFile("./messages.json")
    .then((messages) =>
      res.status(OK).json({ success: true, result: messages })
    )
    .catch((err) => {
      console.log(err);
      res
        .status(INTERNAL_SERVER_ERROR)
        .json({ success: false, error: "Failed to load messages" });
    });
});

app.post("/", uploadMiddleware.single("image"), (req, res) => {
  const { value, error } = schema.validate(req.body, req.file);
  if (error) {
    console.log(error);
    res
      .status(BAD_REQUEST)
      .json({ success: false, error: "Invalid message", errorInfo: error });
    return;
  }

  console.log(req.body);
  console.log(req.file);
  const newMessage = {
    id: Date.now(),
    firstName: value.firstName,
    lastName: value.lastName,
    email: value.email,
    message: value.message,
    image: `https://guest-book3.onrender.com/${req.file?.originalname}`,
  };
  // ================function schema anrufen===================
  // try {
  //   const value = schema.validateAsync(newMessage);
  // } catch (err) {
  //   console.log(err);
  // }

  readJsonFile("./messages.json")
    .then((messages) => [newMessage, ...messages])
    .then((updatedMessages) =>
      writeJsonFile("./messages.json", updatedMessages)
    )
    .then((updatedMessages) =>
      res.status(CREATED).json({ success: true, result: updatedMessages })
    )
    .catch((err) => {
      console.log(err);
      res
        .status(INTERNAL_SERVER_ERROR)
        .json({ success: false, error: "Failed to upload messages" });
    });
});

const PORT = 9999;
app.listen(PORT, () => console.log("here is server at Port: " + PORT));
