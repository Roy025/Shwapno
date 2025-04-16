const express = require("express");
const app = express();
const notes = require("./data/notes");
const env = require("dotenv").config;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/api/notes", (req, res) => {
  res.json(notes);
});

app.get("/api/notes/:id", (req, res) => {
  const note = notes.find((n) => n._id === req.params.id);
  if (note) {
    res.json(note);
  } else {
    res.status(404).send("Note not found");
  }
});

const Port = process.env.PORT || 5000;

app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});
