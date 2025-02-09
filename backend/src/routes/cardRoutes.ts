
import express from "express";
import { updateCard, createCard, deleteCard, getCards, getCardsById } from "../controllers/cardController";

const router = express.Router();

router.post("/", createCard);
router.get("/", getCards);
router.get("/:id", getCardsById);
router.patch("/:id", updateCard);
router.delete("/:id", deleteCard);

export default router;
