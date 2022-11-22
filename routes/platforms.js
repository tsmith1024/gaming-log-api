const express = require("express");
const { getPlatforms } = require("../controllers/platforms");

// const {}

const router = express.Router();

// http://localhost:3000/platforms
router
  .route("/")
  .get(getPlatforms) // GET list of platforms
  .post(() => {}); // POST create

// http://localhost:3000/platforms/12345
router
  .route("/:id")
  .get(() => {}) // GET detail/single
  .put(() => {}) // PUT update
  .delete(() => {}); // DELETE destroy

module.exports = router;
