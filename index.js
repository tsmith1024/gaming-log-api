const express = require("express");
const logger = require("./middleware/logger");
const { syncModels } = require("./models/models");
const gamesRouter = require("./routes/games");

const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use(logger);

app.use("/games", gamesRouter);

app.get("/", (req, res) => {
  res.json({
    hello: "world!!",
  });
});

const updateDB = false;

if (updateDB) {
  syncModels().then((_) => runApp);
} else {
  runApp();
}

function runApp() {
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
}
