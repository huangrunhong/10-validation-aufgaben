const express = require("express");
const { readJsonFile, writeJsonFile } = require("./fsUnit");
const cors = require("cors");
const Joi = require("joi");

const app = express();
const OK = 200;
const INTERNAL_SERVER_ERROR = 500;
const BAD_REQUEST = 400;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
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

app.post("/", (req, res) => {
  const schema = Joi.object({
    firstName: Joi.string().alphanum().min(3).max(30).required(),
    lastName: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "de"] },
    }),
    message: Joi.string().min(3).max(1000).required(),
    id: Joi.number(),
  });

  console.log(req.body);
  const newMessage = {
    id: Date.now(),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    message: req.body.message,
  };

  try {
    const value = schema.validateAsync(newMessage);
  } catch (err) {
    console.log(err);
  }

  readJsonFile("./messages.json")
    .then((messages) => [newMessage, ...messages])
    .then((updatedMessages) =>
      writeJsonFile("./messages.json", updatedMessages)
    )
    .then((updatedMessages) =>
      res.status(OK).json({ success: true, result: updatedMessages })
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
