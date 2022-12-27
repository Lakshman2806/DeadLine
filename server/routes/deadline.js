const express = require("express");
const Deadline = require("../models/deadL_model");
const router = express.Router();
const {
  getAllDeadlines,
  getSingleDeadline,
  createDeadline,
  deleteDeadline,
  updateDeadline
} = require("../controllers/deadlineController");

// get all deadlines
router.get("/", getAllDeadlines);

//get a single deadline
router.get("/:id", getSingleDeadline);

// create a deadline
router.post("/", createDeadline);

// delete a deadline
router.delete("/:id", deleteDeadline);

// update a deadline
router.patch("/:id", updateDeadline);

module.exports = router;
