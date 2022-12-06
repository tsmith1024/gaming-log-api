const express = require("express")
const logger = require("./middleware/logger")
const { syncModels } = require("./models/models")
const gamesRouter = require("./routes/games")
const platformsRouter = require("./routes/platforms")
const developersRouter = require("./routes/developers")
const categoriesRouter = require("./routes/categories")
const userGamesRouter = require("./routes/userGames")
const userRouter = require("./routes/users")
const authRouter = require("./routes/auth")

const port = process.env.PORT

const app = express()

app.use(express.json())
app.use(logger)

app.use("/games", gamesRouter)
app.use("/platforms", platformsRouter)
app.use("/developers", developersRouter)
app.use("/categories", categoriesRouter)
app.use("/userGames", userGamesRouter)
app.use("/users", userRouter)
app.use("/auth", authRouter)

app.get("/", (req, res) => {
  res.json({
    hello: "world!!",
  })
})

const updateDB = false

if (updateDB) {
  syncModels().then((_) => runApp)
} else {
  runApp()
}

function runApp() {
  app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })
}
