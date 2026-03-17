const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
  createNote,
  getAllNotes,
  getSingleNote,
  updateNote,
  archiveNote,
  deleteNote
} = require("../controllers/noteController");

router.post("/", auth, createNote);
router.get("/", auth, getAllNotes);
router.get("/:id", auth, getSingleNote);
router.put("/:id", auth, updateNote);
router.patch("/archive/:id", auth, archiveNote);
router.delete("/:id", auth, deleteNote);

module.exports = router; 