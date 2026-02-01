import { NextFunction, Request, Response } from "express";
declare const createMedicineController: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
declare const getMedicine: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const getMedicineById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const updateMedicine: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const deleteMedicine: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export { createMedicineController, getMedicine, getMedicineById, updateMedicine, deleteMedicine };
//# sourceMappingURL=medicineController.d.ts.map