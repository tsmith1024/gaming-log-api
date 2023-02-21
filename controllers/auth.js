const { User } = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { JWT_ISSUER, JWT_SECRET } = require("../utilities/constants")
const { Op } = require("sequelize")
const sendgridMail = require("@sendgrid/mail")

// create signin handler
const signin = async (req, res, next) => {
  // get email and password from req.body
  const { email, password } = req.body

  let user
  // find user with that email
  try {
    user = await User.findOne({
      where: {
        email: email,
      },
    })
  } catch (error) {
    // if unable to find, return 404
    res.status(404).json({
      message: "unable to find user with matching email and password",
      error,
    })
    return
  }

  if (user === null) {
    res.status(404).json({
      message: "unable to find user with matching email and password",
    })
    return
  }

  // compare password submitted and passwordHash
  let match = bcrypt.compareSync(password, user.passwordHash)
  if (!match) {
    // if they don't match, return 401
    res.status(401).json({
      message: "unable to find user with matching email and password",
    })
    return
  }

  // if match is found
  // create a jwt token with useful data
  let token = jwt.sign(
    {
      uid: user.id,
      name: user.firstName,
      admin: false,
    },
    JWT_SECRET, // the secret key to the JWT
    {
      expiresIn: "1h",
      issuer: JWT_ISSUER,
    }
  )
  // return that token
  return res.json({ token })
}

// requestRecovery sets recoveryToken
// and expiration on a user's account
const requestRecovery = async (req, res) => {
  const { email } = req.body

  let user
  try {
    user = await User.findOne({
      where: {
        email,
      },
    })
  } catch (error) {
    res.status(500).json({
      message: "server error",
    })
    return
  }

  if (!user) {
    res.status(200).json({
      message:
        "If a user for that email exists, please check your email for instructions on resetting your password.",
    })
  }

  let token = ""
  const tokenLength = 8
  for (let i = 0; i < tokenLength; i++) {
    let letters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

    let characters = letters.split("")
    let index = Math.floor(Math.random() * characters.length).toFixed(0)

    let character = characters[index]

    token += character
  }

  const HOUR_IN_MILLISECONDS = 3600000
  const expiration = Date.now() + HOUR_IN_MILLISECONDS

  try {
    await user.update({
      recoveryToken: token,
      recoveryTokenExpiration: expiration,
    })
  } catch (error) {
    res.status(500).json({
      message: "server error",
    })
    return
  }

  // TODO: send mail with token here!
  sendgridMail.setApiKey(process.env.SENDGRID_API_KEY)

  const message = {
    to: "tsmith1024@gmail.com",
    from: "taylor@edfarm.org",
    templateId: "d-59e9c2e49d7648538e545d1954b5d753",
    dynamicTemplateData: {
      name: user.firstName,
      token,
    },

    // subject: "Testing this out!",
    // text: `Does this work? Here is your token: ${token}`,
    // html: `<h1>Hello!</h1><p>Here is your token: ${token}</p>`,
  }

  let results = await sendgridMail.send(message)

  sendgridMail.send(message).then(
    () => {
      console.log("email worked!")
    },
    (error) => {
      console.error(error)

      if (error.response) {
        console.error(error.response.body)
      }

      res.status(500).json({
        message: "Error sending recovery token",
      })
      return
    }
  )

  res.status(200).json({
    // TODO: remove the token later
    // token,
    // expiration,
    message:
      "If a user for that email exists, please check your email for instructions on resetting your password.",
  })
}

const recoverAccount = async (req, res) => {
  const { email, token, password } = req.body

  let user
  try {
    user = await User.findOne({
      where: {
        email: email,
        recoveryToken: token,
        recoveryTokenExpiration: {
          [Op.gt]: new Date(),
        },
      },
    })
  } catch (error) {
    res.status(500).json({
      message: "server error",
    })
    return
  }

  if (!user) {
    res.status(401).json({
      message: "not authorized",
    })
    return
  }

  // hash that password, save to DB, return response
  let passwordHash = bcrypt.hashSync(password, 12)

  let result
  try {
    result = await user.update({
      passwordHash,
      recoveryToken: null,
      recoveryTokenExpiration: null,
    })
  } catch (error) {
    res.status(500).json({
      message: "server error",
    })
    return
  }

  return res.status(200).json({
    message: "password reset successfully!",
  })
}

module.exports = { signin, requestRecovery, recoverAccount }
