const { User } = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// POST /auth/signin
const signIn = async (req, res) => {
  // Get the email and password from the request body
  const { email, password } = req.body;

  // Find the user in the database by email
  let user;

  try {
    user = await User.findOne({
      where: { email },
    });
  } catch (error) {
    // If the user isn't found, send back a 401 status code
    res.status(401).json({
      message: "unable to find user",
      error,
    });
    return;
  }

  // Compare the password from the request body to the password in the database
  let match = await bcrypt.compare(password, user.passwordHash);

  if (!match) {
    // If the passwords don't match, send back a 401 status code
    res.status(401).json({
      message: "incorrect password",
    });
    return;
  }

  // If the passwords match, generate a JWT and send it back to the client
  let token = jwt.sign(
    {
      id: user.id,
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    },
    "secret"
  );

  return res.json({ token });

  // If there's an error, send back a 500 status code
};

module.exports = { signIn };
