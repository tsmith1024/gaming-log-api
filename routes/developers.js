const express = require("express");

const {
  getDevelopers,
  getDeveloper,
  createDeveloper,
  updateDeveloper,
  deleteDeveloper,
} = require("../controllers/developers");

const router = express.Router();

router.route("/").get(getDevelopers).post(createDeveloper);

router
  .route("/:id")
  .get(getDeveloper)
  .put(updateDeveloper)
  .delete(deleteDeveloper);

module.exports = router;
