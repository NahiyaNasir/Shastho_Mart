import { Router } from "express";
import { createMedicineController } from "./medicinecontroller";
const router= Router();

router.post('/', createMedicineController);

export const medicineRouter= router;