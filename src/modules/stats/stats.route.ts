import { Router } from "express";
import { getStats } from "./stats.controller";

const router = Router();

// Public — no auth() wrapper. Only safe aggregate counts are returned
// (see stats.service.ts), never revenue or per-user data.
router.get("/", getStats);

export const statsRouter = router;