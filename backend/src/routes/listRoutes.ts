import express from "express";
import { createList, getLists, updateList, deleteList, getListById } from "../controllers/listController";


const router = express.Router();

router.post("/", createList);
router.get("/", getLists);
router.get("/:id", getListById);
router.patch("/:id", updateList);
router.delete("/:id", deleteList);

export default router;