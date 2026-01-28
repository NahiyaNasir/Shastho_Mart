import { Router } from "express";
import { createMedicineController } from "./medicineController";
import auth, { UserRole } from "../../middleware/middleware";
const router= Router();

router.post('/',  auth(UserRole.ADMIN,UserRole.SELLER)  , createMedicineController);

export const medicineRouter= router;