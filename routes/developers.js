const express = require("express")

const {
  getDevelopers,
  getDeveloper,
  createDeveloper,
  updateDeveloper,
  deleteDeveloper,
} = require("../controllers/developers")
const { verifyToken, verifyRole } = require("../middleware/auth")

const router = express.Router()

router
  .route("/")
  .get(getDevelopers)
  .post(verifyToken, verifyRole("admin"), createDeveloper)

router
  .route("/:id")
  .get(getDeveloper)
  .put(verifyToken, verifyRole("admin"), updateDeveloper)
  .delete(verifyToken, verifyRole("admin"), deleteDeveloper)

module.exports = router
