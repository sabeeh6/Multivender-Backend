import express from "express";
import { createCategary, delCategary, getAllCategaries, updateCategary } from "../../controllers/categary/categary.js";

export const catRouter = express.Router();

catRouter.post("/add-categary" , createCategary)
catRouter.get("/get-categary" , getAllCategaries)
catRouter.put("/update-categary" , updateCategary)
catRouter.delete("/del-categary" , delCategary)
