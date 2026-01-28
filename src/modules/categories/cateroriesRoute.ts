import { Router } from "express";
import { createCategoryController } from "./categoriesController";

const router=Router()
router.post("/", createCategoryController)
export const categoriesRouter= router;