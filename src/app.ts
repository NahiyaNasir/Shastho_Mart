import express from "express";
import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import { auth } from "./lib/auth";
import { medicineRouter } from "./modules/medicine/medicineRoute";
import { categoriesRouter } from "./modules/categories/cateroriesRoute";
import { ordersRouter } from "./modules/orders/ordersRoute";

const app = express();
app.use(
  cors({
    origin: process.env.APP_URL ,
    credentials: true,
  }),
);
app.use(express.json());
app.all('/api/auth/*splat', toNodeHandler(auth));
app.use("/api/medicine", medicineRouter);
app.use("/api/categories",categoriesRouter)
app.use("/api/orders",ordersRouter);
app.get("/", (req, res) => {
  res.send("Hello, from shastho mart");
});

export default app;
