import express from "express"
import {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote
}from "../../server/controllers/noteController.js"

import authMiddleware from "../../server/middleware/authmiddleware.js"

const router =express.Router();

router.use(authMiddleware);

router.post("/",createNote);
router.get("/",getNotes);
router.get("/:id",getNoteById);
router.put("/:id",updateNote);
router.delete("/:id",deleteNote);

export default router;