import { Router } from "express";
import { createMedicineController, deleteMedicine, getMedicine, getMedicineById, updateMedicine } from "./medicineController";
import auth, { UserRole } from "../../middleware/middleware";
const router = Router();
router.get('/', getMedicine);
router.get('/:medicineId', getMedicineById);
router.post('/', auth(UserRole.ADMIN, UserRole.SELLER), createMedicineController);
router.patch("/:medicineId", auth(UserRole.ADMIN, UserRole.SELLER), updateMedicine);
router.delete("/:medicineId", auth(UserRole.ADMIN, UserRole.SELLER), deleteMedicine);
export const medicineRouter = router;
//# sourceMappingURL=medicineRoute.js.map