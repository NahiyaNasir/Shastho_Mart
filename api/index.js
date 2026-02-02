// src/app.ts
import express from "express";
import { toNodeHandler } from "better-auth/node";
import cors from "cors";

// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

// src/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

// generated/prisma/client.ts
import * as path from "path";
import { fileURLToPath } from "url";

// generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.3.0",
  "engineVersion": "9d6ad21cbbceab97458517b147a6a09ff43aa735",
  "activeProvider": "postgresql",
  "inlineSchema": '// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?\n// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nenum Role {\n  CUSTOMER\n  SELLER\n  ADMIN\n}\n\nenum OrderStatus {\n  PENDING\n  CONFIRMED\n  SHIPPED\n  DELIVERED\n  CANCELLED\n}\n\nenum Status {\n  BAN\n  UNBAN\n}\n\n//////////////////////\n// CATEGORY\n//////////////////////\n\nmodel Category {\n  id        String     @id @default(uuid())\n  name      String     @unique\n  medicines Medicine[]\n\n  createdAt DateTime @default(now())\n}\n\n//////////////////////\n// MEDICINE\n//////////////////////\n\nmodel Medicine {\n  id           String  @id @default(uuid())\n  name         String\n  description  String?\n  price        Float\n  stock        Int\n  manufacturer String?\n\n  categoryId String\n  sellerId   String\n\n  category   Category    @relation(fields: [categoryId], references: [id])\n  seller     User        @relation("SellerMedicines", fields: [sellerId], references: [id])\n  reviews    Review[]\n  orderItems OrderItem[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel Profile {\n  id             String  @id @default(uuid())\n  userId         String  @unique\n  user           User    @relation(fields: [userId], references: [id])\n  bio            String? @db.VarChar(300)\n  address        String\n  location       String\n  contact_number String\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\n//////////////////////\n// ORDER\n//////////////////////\n\nmodel Order {\n  id         String      @id @default(uuid())\n  userId     String\n  status     OrderStatus @default(PENDING)\n  totalPrice Decimal     @db.Decimal(10, 2)\n  address    String\n  user       User        @relation(fields: [userId], references: [id])\n  items      OrderItem[]\n\n  createdAt DateTime @default(now())\n}\n\n//////////////////////\n// ORDER ITEM \n//////////////////////\n\nmodel OrderItem {\n  id         String  @id @default(uuid())\n  orderId    String\n  medicineId String\n  quantity   Int\n  price      Decimal @db.Decimal(10, 2)\n\n  order    Order    @relation(fields: [orderId], references: [id])\n  medicine Medicine @relation(fields: [medicineId], references: [id])\n}\n\n//////////////////////\n// REVIEW\n//////////////////////\n\nmodel Review {\n  id      String @id @default(uuid())\n  rating  Int\n  comment String @db.Text\n\n  userId     String\n  medicineId String\n\n  user     User     @relation(fields: [userId], references: [id])\n  medicine Medicine @relation(fields: [medicineId], references: [id])\n\n  createdAt DateTime @default(now())\n\n  // one review per user per medicine\n  @@unique([userId, medicineId])\n}\n\nmodel User {\n  id            String    @id\n  name          String\n  email         String\n  emailVerified Boolean   @default(false)\n  image         String?\n  createdAt     DateTime  @default(now())\n  updatedAt     DateTime  @updatedAt\n  sessions      Session[]\n  accounts      Account[]\n  callbackURL   String?\n  role          Role      @default(CUSTOMER)\n\n  status          Status     @default(UNBAN)\n  sellerMedicines Medicine[] @relation("SellerMedicines")\n  reviews         Review[]\n  orders          Order[]\n  profile         Profile?\n\n  @@unique([email])\n  @@map("user")\n}\n\nmodel Session {\n  id        String   @id\n  expiresAt DateTime\n  token     String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  ipAddress String?\n  userAgent String?\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@unique([token])\n  @@index([userId])\n  @@map("session")\n}\n\nmodel Account {\n  id                    String    @id\n  accountId             String\n  providerId            String\n  userId                String\n  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n  accessToken           String?\n  refreshToken          String?\n  idToken               String?\n  accessTokenExpiresAt  DateTime?\n  refreshTokenExpiresAt DateTime?\n  scope                 String?\n  password              String?\n  createdAt             DateTime  @default(now())\n  updatedAt             DateTime  @updatedAt\n\n  @@index([userId])\n  @@map("account")\n}\n\nmodel Verification {\n  id         String   @id\n  identifier String\n  value      String\n  expiresAt  DateTime\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  @@index([identifier])\n  @@map("verification")\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"Category":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"medicines","kind":"object","type":"Medicine","relationName":"CategoryToMedicine"},{"name":"createdAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Medicine":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Float"},{"name":"stock","kind":"scalar","type":"Int"},{"name":"manufacturer","kind":"scalar","type":"String"},{"name":"categoryId","kind":"scalar","type":"String"},{"name":"sellerId","kind":"scalar","type":"String"},{"name":"category","kind":"object","type":"Category","relationName":"CategoryToMedicine"},{"name":"seller","kind":"object","type":"User","relationName":"SellerMedicines"},{"name":"reviews","kind":"object","type":"Review","relationName":"MedicineToReview"},{"name":"orderItems","kind":"object","type":"OrderItem","relationName":"MedicineToOrderItem"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Profile":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"ProfileToUser"},{"name":"bio","kind":"scalar","type":"String"},{"name":"address","kind":"scalar","type":"String"},{"name":"location","kind":"scalar","type":"String"},{"name":"contact_number","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Order":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"OrderStatus"},{"name":"totalPrice","kind":"scalar","type":"Decimal"},{"name":"address","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"OrderToUser"},{"name":"items","kind":"object","type":"OrderItem","relationName":"OrderToOrderItem"},{"name":"createdAt","kind":"scalar","type":"DateTime"}],"dbName":null},"OrderItem":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"orderId","kind":"scalar","type":"String"},{"name":"medicineId","kind":"scalar","type":"String"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"price","kind":"scalar","type":"Decimal"},{"name":"order","kind":"object","type":"Order","relationName":"OrderToOrderItem"},{"name":"medicine","kind":"object","type":"Medicine","relationName":"MedicineToOrderItem"}],"dbName":null},"Review":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"rating","kind":"scalar","type":"Int"},{"name":"comment","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"medicineId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"ReviewToUser"},{"name":"medicine","kind":"object","type":"Medicine","relationName":"MedicineToReview"},{"name":"createdAt","kind":"scalar","type":"DateTime"}],"dbName":null},"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"image","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"},{"name":"callbackURL","kind":"scalar","type":"String"},{"name":"role","kind":"enum","type":"Role"},{"name":"status","kind":"enum","type":"Status"},{"name":"sellerMedicines","kind":"object","type":"Medicine","relationName":"SellerMedicines"},{"name":"reviews","kind":"object","type":"Review","relationName":"ReviewToUser"},{"name":"orders","kind":"object","type":"Order","relationName":"OrderToUser"},{"name":"profile","kind":"object","type":"Profile","relationName":"ProfileToUser"}],"dbName":"user"},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"token","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"}],"dbName":"session"},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"accountId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"},{"name":"accessToken","kind":"scalar","type":"String"},{"name":"refreshToken","kind":"scalar","type":"String"},{"name":"idToken","kind":"scalar","type":"String"},{"name":"accessTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"refreshTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"scope","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"account"},"Verification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"identifier","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"verification"}},"enums":{},"types":{}}');
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer } = await import("buffer");
  const wasmArray = Buffer.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// generated/prisma/internal/prismaNamespace.ts
import * as runtime2 from "@prisma/client/runtime/client";
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var defineExtension = runtime2.Extensions.defineExtension;

// generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/lib/prisma.ts
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/lib/auth.ts
var auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
    // or "mysql", "postgresql", ...etc
  }),
  trustedOrigins: [process.env.APP_URL],
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "CUSTOMER"
      },
      phone: {
        type: "string",
        required: false
      }
    }
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true
  },
  socialProviders: {
    google: {
      prompt: "select_account",
      accessType: "offline",
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }
  }
});

// src/modules/medicine/medicineRoute.ts
import { Router } from "express";

// src/modules/medicine/medicineService.ts
var createMedicineService = async (data, userId, categoryId) => {
  const result = await prisma.medicine.create({
    data: {
      ...data,
      sellerId: userId,
      categoryId
    }
  });
  return result;
};
var getMedicineService = async ({
  search,
  category,
  manufacturer,
  page,
  limit,
  skip,
  sortBy,
  sortOrder
}) => {
  const addCondition = [];
  if (search) {
    addCondition.push({
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } }
      ]
    });
  }
  if (category) {
    addCondition.push({
      category: {
        name: {
          equals: category,
          mode: "insensitive"
        }
      }
    });
  }
  if (manufacturer) {
    addCondition.push({
      manufacturer: {
        contains: manufacturer,
        mode: "insensitive"
      }
    });
  }
  const allMedicine = await prisma.medicine.findMany({
    skip,
    take: limit,
    where: {
      AND: addCondition
    },
    orderBy: {
      [sortBy]: sortOrder
    },
    include: {
      category: true
    }
  });
  const total = await prisma.medicine.count({
    where: {
      AND: addCondition
    }
  });
  return {
    date: allMedicine,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  };
};
var getMedicineByIdService = async (medicineId) => {
  const result = await prisma.medicine.findUnique({
    where: { id: medicineId }
  });
  return result;
};
var updateMedicineService = async (medicineId, data, sellerId) => {
  const medicineData = await prisma.medicine.findUniqueOrThrow({
    where: { id: medicineId },
    select: { sellerId: true }
  });
  if (medicineData.sellerId !== sellerId) {
    throw new Error("You are unauthorized to update this medicine");
  }
  const result = await prisma.medicine.update({
    where: { id: medicineId },
    data
  });
  return result;
};
var deleteMedicineService = async (medicineId, isAdmin, sellerId) => {
  const medicineData = await prisma.medicine.findUniqueOrThrow({
    where: { id: medicineId },
    select: { sellerId: true }
  });
  if (!isAdmin && medicineData.sellerId !== sellerId) {
    throw new Error("You are unauthorized to delete this medicine");
  }
  const result = await prisma.medicine.delete({
    where: { id: medicineId }
  });
  return result;
};

// src/middleware/middleware.ts
var auth2 = (...roles) => {
  return async (req, res, next) => {
    try {
      const session = await auth.api.getSession({
        headers: req.headers
      });
      if (!session) {
        return res.status(403).json({
          success: false,
          message: "You are not authorized!"
        });
      }
      if (!session.user.emailVerified) {
        return res.status(403).json({
          success: false,
          message: "Email verification required. Please verify your email!"
        });
      }
      req.user = {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: session.user.role,
        emailVerified: session.user.emailVerified
      };
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden! You don't have permission to access this resources!"
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
var middleware_default = auth2;

// src/helper/paginationHelper.ts
var paginationSortingHelper = (options) => {
  const page = Number(options.page) || 1;
  const limit = Number(options.limit) || 10;
  const skip = (page - 1) * limit;
  const sortBy = options.sortBy || "createdAt";
  const sortOrder = options.sortOrder || "desc";
  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder
  };
};
var paginationHelper_default = paginationSortingHelper;

// src/modules/medicine/medicineController.ts
var createMedicineController = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(400).json({
        error: "Unauthorized!"
      });
    }
    const result = await createMedicineService(req.body, user.id, req.body.categoryId);
    console.log(result);
    res.status(201).json(
      {
        success: true,
        data: result
      }
    );
  } catch (error) {
    next(error);
  }
};
var getMedicine = async (req, res, next) => {
  try {
    const { search } = req.query;
    const searchType = typeof search === "string" ? search : void 0;
    const category = req.query.category;
    const manufacturer = req.query.manufacturer;
    console.log(manufacturer, "controller");
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_default(req.query);
    const result = await getMedicineService({ search: searchType, category, manufacturer, page, limit, skip, sortBy, sortOrder });
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var getMedicineById = async (req, res, next) => {
  try {
    const medicineId = req.params.id;
    const result = await getMedicineByIdService(medicineId);
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var updateMedicine = async (req, res, next) => {
  try {
    const medicineId = req.params.medicineId;
    console.log(medicineId);
    const result = await updateMedicineService(medicineId, req.body, req.user?.id);
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var deleteMedicine = async (req, res, next) => {
  try {
    const medicineId = req.params.medicineId;
    const user = req.user;
    if (!user) {
      throw new Error("You are unauthorized!");
    }
    const isAdmin = user.role === "ADMIN" /* ADMIN */;
    const result = await deleteMedicineService(medicineId, isAdmin, user.id);
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

// src/modules/medicine/medicineRoute.ts
var router = Router();
router.get("/", getMedicine);
router.get("/:medicineId", getMedicineById);
router.post("/", middleware_default("ADMIN" /* ADMIN */, "SELLER" /* SELLER */), createMedicineController);
router.patch("/:medicineId", middleware_default("ADMIN" /* ADMIN */, "SELLER" /* SELLER */), updateMedicine);
router.delete("/:medicineId", middleware_default("ADMIN" /* ADMIN */, "SELLER" /* SELLER */), deleteMedicine);
var medicineRouter = router;

// src/modules/categories/cateroriesRoute.ts
import { Router as Router2 } from "express";

// src/modules/categories/categoriesService.ts
var createCategoryService = async (data) => {
  const result = await prisma.category.create({
    data
  });
  return result;
};
var getAllCategoriesService = async () => {
  const result = await prisma.category.findMany();
  return result;
};
var deleteCategoryService = async (categoryId, isAdmin) => {
  const categoryData = await prisma.category.findUniqueOrThrow({
    where: { id: categoryId }
  });
  if (!categoryData) {
    throw new Error("Category not found");
  }
  if (!isAdmin) {
    throw new Error("Unauthorized to delete category");
  }
  const result = await prisma.category.delete({
    where: { id: categoryId }
  });
  return result;
};

// src/modules/categories/categoriesController.ts
var createCategoryController = async (req, res, next) => {
  try {
    const result = await createCategoryService(req.body);
    console.log(result);
    res.status(201).json(
      result
    );
  } catch (error) {
    next(error);
  }
};
var getAllCategory = async (req, res, next) => {
  try {
    const result = await getAllCategoriesService();
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var deleteCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;
    console.log(categoryId, "controller");
    const isAdmin = req.user?.role === "ADMIN";
    const result = await deleteCategoryService(categoryId, isAdmin);
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

// src/modules/categories/cateroriesRoute.ts
var router2 = Router2();
router2.get("/", getAllCategory);
router2.post("/", middleware_default("ADMIN" /* ADMIN */), createCategoryController);
router2.delete("/:categoryId", middleware_default("ADMIN" /* ADMIN */), deleteCategory);
var categoriesRouter = router2;

// src/modules/orders/ordersRoute.ts
import { Router as Router3 } from "express";

// src/modules/orders/ordersService.ts
var CreateOrderService = async (data, userId) => {
  return await prisma.$transaction(async (tx) => {
    let totalAmount = 0;
    const orderItemsForPrisma = [];
    for (let item of data.items) {
      const medicine = await tx.medicine.findUnique({
        where: { id: item.medicineId }
      });
      if (!medicine || medicine.stock < item.quantity) {
        throw new Error(
          `Medicine ${medicine?.name || "Unknown"} is out of stock`
        );
      }
      const calculatePrice = Number(medicine.price) * item.quantity;
      totalAmount += calculatePrice;
      console.log(totalAmount);
      orderItemsForPrisma.push({
        medicineId: item.medicineId,
        quantity: item.quantity,
        price: medicine.price
      });
      await tx.medicine.update({
        where: { id: item.medicineId },
        data: {
          stock: { decrement: item.quantity }
        }
      });
    }
    return await prisma.order.create({
      data: {
        ...data,
        userId,
        totalPrice: totalAmount,
        items: { create: orderItemsForPrisma }
      },
      include: { items: true }
    });
  });
};
var getAllOrderService = async (status) => {
  const orders = await prisma.order.findMany({
    where: {
      status
    },
    include: {
      user: {
        select: {
          name: true,
          email: true
        }
      },
      items: {
        select: {
          quantity: true,
          medicine: {
            select: {
              name: true,
              price: true,
              category: {
                select: {
                  name: true
                }
              }
            }
          }
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return orders;
};
var getOrderByIdService = async (orderId, userId) => {
  const order = await prisma.order.findFirstOrThrow({
    where: {
      id: orderId,
      userId
    },
    include: {
      items: true
    }
  });
  return order;
};
var updateOrderStatus = async (orderId, status) => {
  const isExist = await prisma.order.findUniqueOrThrow({
    where: {
      id: orderId
    },
    select: { id: true }
  });
  console.log(isExist);
  return await prisma.order.update({
    where: {
      id: isExist.id
    },
    data: { status }
  });
};

// src/modules/orders/ordersController.ts
var CreateOrders = async (req, res, next) => {
  try {
    const user = req.user;
    const data = req.body;
    console.log(data);
    const result = await CreateOrderService(data, user?.id);
    console.log(result);
    res.status(201).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var getAllOrder = async (req, res, next) => {
  try {
    const result = await getAllOrderService(req.query.status);
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var getOrderById = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const user = req.user;
    console.log(orderId);
    if (!user) {
      res.status(401).json({ success: false, message: "User not authenticated" });
      return;
    }
    const result = await getOrderByIdService(orderId, user.id);
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var updateOrder = async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    console.log(orderId);
    const status = req.body.status;
    console.log(status);
    const result = await updateOrderStatus(orderId, status);
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

// src/modules/orders/ordersRoute.ts
var router3 = Router3();
router3.post("/", middleware_default("CUSTOMER" /* CUSTOMER */), CreateOrders);
router3.get("/", middleware_default("ADMIN" /* ADMIN */), getAllOrder);
router3.get("/seller/orders", middleware_default("SELLER" /* SELLER */), getAllOrder);
router3.get("/:orderId", middleware_default("CUSTOMER" /* CUSTOMER */), getOrderById);
router3.patch("/:orderId/seller", middleware_default("SELLER" /* SELLER */), updateOrder);

// src/modules/review/reviewRoute.ts
import { Router as Router4 } from "express";

// src/modules/review/reviewService.ts
var createReviewService = async (data, userId) => {
  const existing = await prisma.review.findFirst({
    where: {
      userId: {
        equals: userId
      },
      medicineId: {
        equals: data.medicineId
      }
    }
  });
  if (existing) {
    throw new Error("You have already reviewed this medicine");
  }
  const result = await prisma.review.create({
    data: { ...data, userId }
  });
  return result;
};
var getReviewsService = async () => {
  const review = await prisma.review.findMany({
    include: {
      user: {
        select: {
          name: true,
          email: true,
          emailVerified: true,
          image: true
        }
      }
    },
    orderBy: { createdAt: "desc" }
  });
  return review;
};
var updateReviewByUser = async (userId, data, reviewId) => {
  const reviewData = await prisma.review.findUniqueOrThrow({
    where: { id: reviewId }
  });
  if (reviewData.userId !== userId) {
    throw new Error("You are not authorized to update this review");
  }
  const updatedReview = await prisma.review.update({
    where: { id: reviewId },
    data
  });
  return updatedReview;
};
var deleteReviewByAdmin = async (reviewId) => {
  const review = await prisma.review.findUniqueOrThrow({
    where: { id: reviewId }
  });
  if (!review) {
    throw new Error("Review not found");
  }
  return await prisma.review.delete({
    where: { id: reviewId }
  });
};

// src/modules/review/reviewController.ts
var createReview = async (req, res, next) => {
  try {
    const user = req.user;
    console.log(user);
    if (!user) {
      return res.status(401).json({
        error: "Unauthorized!"
      });
    }
    const result = await createReviewService(req.body, user.id);
    console.log(result);
    res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var getReviews = async (req, res, next) => {
  try {
    const result = await getReviewsService();
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var updateReview = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({
        error: "Unauthorized!"
      });
    }
    const { reviewId } = req.params;
    const result = await updateReviewByUser(
      user.id,
      req.body,
      reviewId
    );
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

// src/modules/review/reviewRoute.ts
var router4 = Router4();
router4.get("/", getReviews);
router4.post("/create", middleware_default("CUSTOMER" /* CUSTOMER */), createReview);
router4.patch("/:reviewId", middleware_default("CUSTOMER" /* CUSTOMER */), updateReview);
router4.delete("/:reviewId", middleware_default("ADMIN" /* ADMIN */), deleteReviewByAdmin);

// src/app.ts
var app = express();
app.use(
  cors({
    origin: process.env.APP_URL,
    credentials: true
  })
);
app.use(express.json());
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use("/api/medicine", medicineRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/orders", router3);
app.use("/api/review", router4);
app.get("/", (req, res) => {
  res.send("Hello, from shastho mart");
});
var app_default = app;

// src/index.ts
var PORT = process.env.PORT || 5e3;
async function main() {
  try {
    await prisma.$connect();
    console.log("server is running");
    app_default.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log("an encrusted happen", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}
main();
var index_default = app_default;
export {
  index_default as default
};
