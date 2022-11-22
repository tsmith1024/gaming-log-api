const { User } = require("../models/user");
const bcrypt = require("bcryptjs");

// POST /users
const createUser = async (req, res, next) => {
  const { email, password, firstName } = req.body;

  let user;

  let passwordHash = bcrypt.hashSync(password, 12);
  let userData = {
    email,
    passwordHash,
    firstName,
  };

  try {
    user = await User.create(userData);
  } catch (error) {
    res.status(422).json({
      message: "error creating user in database",
      error: error,
    });
    return;
  }

  res.status(201).json({
    id: user.id,
    message: "user created successfully",
  });
};

module.exports = { createUser };
