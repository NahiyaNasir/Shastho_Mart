import express from "express";
import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import { auth } from "./lib/auth";
import { medicineRouter } from "./modules/medicine/medicineRoute";

import { ordersRouter } from "./modules/orders/ordersRoute";
import { reviewRouter } from "./modules/review/reviewRoute";
import { categoriesRouter } from "./modules/categories/categoriesRoute";

const app = express();
const allowedOrigins = [

  process.env.APP_URL || "http://localhost:3000",

  process.env.PROD_APP_URL, // Production frontend URL

].filter(Boolean); // Remove undefined values
app.use(

  cors({

    origin: (origin, callback) => {

      // Allow requests with no origin (mobile apps, Postman, etc.)

      if (!origin) return callback(null, true);


      // Check if origin is in allowedOrigins or matches Vercel preview pattern

      const isAllowed =

        allowedOrigins.includes(origin) ||

        /^https:\/\/next-blog-client.*\.vercel\.app$/.test(origin) ||

        /^https:\/\/.*\.vercel\.app$/.test(origin); // Any Vercel deployment


      if (isAllowed) {

        callback(null, true);

      } else {

        callback(new Error(`Origin ${origin} not allowed by CORS`));

      }

    },

    credentials: true,

    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],

    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],

    exposedHeaders: ["Set-Cookie"],

  }),

);


app.use(express.json());
app.all('/api/auth/*splat', toNodeHandler(auth));
app.use("/api/medicine", medicineRouter);
app.use("/api/categories",categoriesRouter)
app.use("/api/orders",ordersRouter);
app.use("/api/review",reviewRouter);
app.get("/", (req, res) => {
  res.send("Hello, from shastho mart");
});

export default app;
