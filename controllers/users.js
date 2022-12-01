const { User } = require("../models/user");
const bcrypt = require("bcryptjs");

// POST /users
const createUser = async (req, res, next) => {
  // get data from the res.body
  const { email, password, firstName } = req.body;

  // hash the password
  let passwordHash = bcrypt.hashSync(password, 12);

  // build user data to be saved in DB
  let userData = {
    passwordHash,
    email,
    firstName,
  };

  // try creating user in db
  let user;

  try {
    user = await User.create(userData);
  } catch (error) {
    // return 422 if not
    res.status(422).json({
      message: "error creating user in database",
      error,
    });
  }

  // return 201 if successful
  res.status(201).json({
    id: user.id,
    message: "user created successfully",
  });
};

module.exports = { createUser };
