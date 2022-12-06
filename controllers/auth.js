const { User } = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { JWT_ISSUER, JWT_SECRET } = require("../utilities/constants")

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

module.exports = { signin }
