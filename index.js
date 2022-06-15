const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express());

app.post("/:input", async (request, response) => {
  const input = request.params.input;
  const API_URL = ``;
  const fetch_response = await fetch(API_URL);
  const json = await fetch_response.json();
  response.json(json);
});

app.listen(8080, () => {
  console.log("Listening on 8080");
});