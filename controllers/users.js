const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3")
const { User } = require("../models/user")
const bcrypt = require("bcryptjs")
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner")

// POST /users
const createUser = async (req, res, next) => {
  // get data from the res.body
  const { email, password, firstName } = req.body

  // hash the password
  let passwordHash = bcrypt.hashSync(password, 12)

  // build user data to be saved in DB
  let userData = {
    passwordHash,
    email,
    firstName,
  }

  // try creating user in db
  let user

  try {
    user = await User.create(userData)
  } catch (error) {
    // return 422 if not
    res.status(422).json({
      message: "error creating user in database",
      error,
    })
  }

  // return 201 if successful
  res.status(201).json({
    id: user.id,
    message: "user created successfully",
  })
}

const updateUser = async (req, res, next) => {
  let userID = req.params.id

  let user
  try {
    user = await User.findByPk(userID)
  } catch (error) {
    res.status(404).json({
      message: "unable to find user with that id",
      error,
    })
    return
  }

  if (user === null) {
    res.status(404).json({
      message: "unable to find user with that id",
      error,
    })
    return
  }

  const { email, firstName, role, profilePicture } = req.body

  const userData = { email, firstName, role, profilePicture }

  try {
    await user.update(userData)
  } catch (error) {
    res.status(422).json({
      message: "unable to update user with that id",
      error,
    })
    return
  }

  res.json(user)
}

const uploadURL = async (req, res, next) => {
  const s3Client = new S3Client({ region: process.env.AWS_REGION })

  const putCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `test-${Date.now()}.jpg`,
    ACL: "public-read",
  })

  const uploadURL = await getSignedUrl(s3Client, putCommand, {
    expiresIn: 600,
  })

  const imageURL = uploadURL.split("?")[0]

  // we COULD update user profile here... but that might be bad.

  return res.status(200).json({
    uploadURL,
    imageURL,
  })
}

module.exports = { createUser, updateUser, uploadURL }
