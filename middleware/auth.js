let jwt = require("jsonwebtoken")
let { User } = require("../models/user")
const { JWT_SECRET, JWT_ISSUER } = require("../utilities/constants")

const verifyToken = async (req, res, next) => {
  // get header with auth token
  const token = req.header("Authorization")

  // check that it's the right format
  if (!token || !token.startsWith("Bearer")) {
    res.status(401).json({
      message: "Unauthorized",
    })
    return
  }

  // split to remove "Bearer"
  let jwtToken = token.split(" ")[1]
  if (!jwtToken) {
    res.status(401).json({
      message: "Unauthorized",
    })
    return
  }

  // verify the jwt token
  let payload
  try {
    payload = jwt.verify(jwtToken, JWT_SECRET, {
      issuer: JWT_ISSUER,
    })
  } catch (error) {
    res.status(401).json({
      error,
      message: "Unauthorized",
    })
    return
  }

  // fetch user based on jwt userID
  let user
  try {
    user = await User.findByPk(payload.uid)
  } catch (error) {
    res.status(404).json({
      error,
      message: "Unable to find user matching token",
    })
    return
  }

  if (user === null) {
    res.status(404).json({
      message: "Unable to find user matching token",
    })
  }

  // load userID into request for use by controllers
  req.userID = payload.uid

  // load user into request to be used by controllers
  req.user = user

  next()
}

// could build another middleware that would load user only when needed

// role verification middleware
const verifyRole = (...roles) => {
  return (req, res, next) => {
    // if we don't have a user
    // or if user role isn't in roles list
    if (!req.user || !roles.includes(req.user.role)) {
      // error
      res.status(401).json({
        message: "Role unauthorized for this route",
      })
      return
    }
    next()
  }
}

module.exports = { verifyToken, verifyRole }
