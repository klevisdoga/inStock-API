const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const warehousesRoute = require("./routes/warehouses");
app.use("/warehouses", warehousesRoute);

const inventoriesRoute = require("./routes/inventories");
app.use("/inventories", inventoriesRoute);

app.post("/:input", async (request, response) => {
  const input = request.params.input;
  const API_URL = ``;
  const fetch_response = await fetch(API_URL);
  const json = await fetch_response.json();
  response.json(json);
});

app.listen(8080, () => {
  console.log("server is listening!");
});
