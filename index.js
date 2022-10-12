const express = require("express");
const { syncModels } = require("./models/models");
const port = process.env.PORT;

const app = express();

app.get("/", (req, res) => {
  res.json({
    hello: "world!!",
  });
});

syncModels().then((_) => {
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
});
