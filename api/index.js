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

// src/generated/prisma/client.ts
import * as path from "path";
import { fileURLToPath } from "url";

// src/generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.8.0",
  "engineVersion": "3c6e192761c0362d496ed980de936e2f3cebcd3a",
  "activeProvider": "postgresql",
  "inlineSchema": 'model Categories {\n  id          String  @id @default(uuid())\n  name        String  @unique\n  image       String?\n  description String?\n\n  medicines Medicine[]\n  slug      String     @unique\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nenum Role {\n  CUSTOMER\n  SELLER\n  ADMIN\n}\n\nenum OrderStatus {\n  PENDING\n  CONFIRMED\n  SHIPPED\n  DELIVERED\n  CANCELLED\n  PROCESSING\n}\n\nenum Status {\n  BAN\n  UNBAN\n}\n\nenum UnitType {\n  Pcs\n  Strip\n  Box\n  Bottle\n}\n\nmodel Medicine {\n  id         String     @id @default(uuid())\n  sellerId   String\n  seller     User       @relation(fields: [sellerId], references: [id])\n  categoryId String\n  category   Categories @relation(fields: [categoryId], references: [id])\n\n  name        String   @db.VarChar(200)\n  genericName String   @db.VarChar(200)\n  strength    String?  @db.VarChar(50)\n  unitType    UnitType @default(Pcs)\n\n  group       String? @db.VarChar(255)\n  description String  @db.Text\n  overview    String  @db.Text\n\n  price         Decimal  @db.Decimal(10, 2)\n  discountPrice Decimal? @db.Decimal(10, 2)\n  stock         Int      @default(0)\n\n  image String\n  tags  String[]\n\n  isPrescriptionRequired Boolean   @default(false)\n  expiryDate             DateTime?\n  sku                    String?   @db.VarChar(100)\n\n  views   Int         @default(0)\n  orders  OrderItem[]\n  reviews Review[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@unique([name, sellerId])\n  @@index([categoryId])\n}\n\nmodel Order {\n  id         String      @id @default(uuid())\n  userId     String\n  status     OrderStatus @default(PENDING)\n  totalPrice Decimal     @db.Decimal(10, 2)\n  address    String\n  user       User        @relation(fields: [userId], references: [id])\n  items      OrderItem[]\n\n  createdAt DateTime @default(now())\n}\n\nmodel OrderItem {\n  id         String  @id @default(uuid())\n  orderId    String\n  medicineId String\n  quantity   Int\n  price      Decimal @db.Decimal(10, 2)\n\n  order    Order    @relation(fields: [orderId], references: [id])\n  medicine Medicine @relation(fields: [medicineId], references: [id])\n}\n\nmodel Profile {\n  id             String  @id @default(uuid())\n  userId         String  @unique\n  user           User    @relation(fields: [userId], references: [id])\n  bio            String? @db.VarChar(300)\n  address        String\n  location       String\n  contact_number String\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel Review {\n  id      String @id @default(uuid())\n  rating  Int\n  comment String @db.Text\n\n  userId     String\n  medicineId String\n\n  user     User     @relation(fields: [userId], references: [id])\n  medicine Medicine @relation(fields: [medicineId], references: [id])\n\n  createdAt DateTime @default(now())\n\n  @@unique([userId, medicineId])\n}\n\n// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?\n// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../../src/generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nmodel User {\n  id            String     @id\n  name          String\n  email         String\n  emailVerified Boolean    @default(false)\n  image         String?\n  createdAt     DateTime   @default(now())\n  updatedAt     DateTime   @updatedAt\n  sessions      Session[]\n  accounts      Account[]\n  callbackURL   String?\n  role          Role       @default(CUSTOMER)\n  status        Status     @default(UNBAN)\n  reviews       Review[]\n  orders        Order[]\n  profile       Profile?\n  medicines     Medicine[]\n\n  @@unique([email])\n  @@map("user")\n}\n\nmodel Session {\n  id        String   @id\n  expiresAt DateTime\n  token     String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  ipAddress String?\n  userAgent String?\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@unique([token])\n  @@index([userId])\n  @@map("session")\n}\n\nmodel Account {\n  id                    String    @id\n  accountId             String\n  providerId            String\n  userId                String\n  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n  accessToken           String?\n  refreshToken          String?\n  idToken               String?\n  accessTokenExpiresAt  DateTime?\n  refreshTokenExpiresAt DateTime?\n  scope                 String?\n  password              String?\n  createdAt             DateTime  @default(now())\n  updatedAt             DateTime  @updatedAt\n\n  @@index([userId])\n  @@map("account")\n}\n\nmodel Verification {\n  id         String   @id\n  identifier String\n  value      String\n  expiresAt  DateTime\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  @@index([identifier])\n  @@map("verification")\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  },
  "parameterizationSchema": {
    "strings": [],
    "graph": ""
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"Categories":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"image","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"medicines","kind":"object","type":"Medicine","relationName":"CategoriesToMedicine"},{"name":"slug","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Medicine":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"sellerId","kind":"scalar","type":"String"},{"name":"seller","kind":"object","type":"User","relationName":"MedicineToUser"},{"name":"categoryId","kind":"scalar","type":"String"},{"name":"category","kind":"object","type":"Categories","relationName":"CategoriesToMedicine"},{"name":"name","kind":"scalar","type":"String"},{"name":"genericName","kind":"scalar","type":"String"},{"name":"strength","kind":"scalar","type":"String"},{"name":"unitType","kind":"enum","type":"UnitType"},{"name":"group","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"overview","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Decimal"},{"name":"discountPrice","kind":"scalar","type":"Decimal"},{"name":"stock","kind":"scalar","type":"Int"},{"name":"image","kind":"scalar","type":"String"},{"name":"tags","kind":"scalar","type":"String"},{"name":"isPrescriptionRequired","kind":"scalar","type":"Boolean"},{"name":"expiryDate","kind":"scalar","type":"DateTime"},{"name":"sku","kind":"scalar","type":"String"},{"name":"views","kind":"scalar","type":"Int"},{"name":"orders","kind":"object","type":"OrderItem","relationName":"MedicineToOrderItem"},{"name":"reviews","kind":"object","type":"Review","relationName":"MedicineToReview"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Order":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"OrderStatus"},{"name":"totalPrice","kind":"scalar","type":"Decimal"},{"name":"address","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"OrderToUser"},{"name":"items","kind":"object","type":"OrderItem","relationName":"OrderToOrderItem"},{"name":"createdAt","kind":"scalar","type":"DateTime"}],"dbName":null},"OrderItem":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"orderId","kind":"scalar","type":"String"},{"name":"medicineId","kind":"scalar","type":"String"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"price","kind":"scalar","type":"Decimal"},{"name":"order","kind":"object","type":"Order","relationName":"OrderToOrderItem"},{"name":"medicine","kind":"object","type":"Medicine","relationName":"MedicineToOrderItem"}],"dbName":null},"Profile":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"ProfileToUser"},{"name":"bio","kind":"scalar","type":"String"},{"name":"address","kind":"scalar","type":"String"},{"name":"location","kind":"scalar","type":"String"},{"name":"contact_number","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Review":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"rating","kind":"scalar","type":"Int"},{"name":"comment","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"medicineId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"ReviewToUser"},{"name":"medicine","kind":"object","type":"Medicine","relationName":"MedicineToReview"},{"name":"createdAt","kind":"scalar","type":"DateTime"}],"dbName":null},"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"image","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"},{"name":"callbackURL","kind":"scalar","type":"String"},{"name":"role","kind":"enum","type":"Role"},{"name":"status","kind":"enum","type":"Status"},{"name":"reviews","kind":"object","type":"Review","relationName":"ReviewToUser"},{"name":"orders","kind":"object","type":"Order","relationName":"OrderToUser"},{"name":"profile","kind":"object","type":"Profile","relationName":"ProfileToUser"},{"name":"medicines","kind":"object","type":"Medicine","relationName":"MedicineToUser"}],"dbName":"user"},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"token","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"}],"dbName":"session"},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"accountId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"},{"name":"accessToken","kind":"scalar","type":"String"},{"name":"refreshToken","kind":"scalar","type":"String"},{"name":"idToken","kind":"scalar","type":"String"},{"name":"accessTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"refreshTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"scope","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"account"},"Verification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"identifier","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"verification"}},"enums":{},"types":{}}');
config.parameterizationSchema = {
  strings: JSON.parse('["where","orderBy","cursor","user","sessions","accounts","medicine","reviews","order","items","_count","orders","profile","medicines","seller","category","Categories.findUnique","Categories.findUniqueOrThrow","Categories.findFirst","Categories.findFirstOrThrow","Categories.findMany","data","Categories.createOne","Categories.createMany","Categories.createManyAndReturn","Categories.updateOne","Categories.updateMany","Categories.updateManyAndReturn","create","update","Categories.upsertOne","Categories.deleteOne","Categories.deleteMany","having","_min","_max","Categories.groupBy","Categories.aggregate","Medicine.findUnique","Medicine.findUniqueOrThrow","Medicine.findFirst","Medicine.findFirstOrThrow","Medicine.findMany","Medicine.createOne","Medicine.createMany","Medicine.createManyAndReturn","Medicine.updateOne","Medicine.updateMany","Medicine.updateManyAndReturn","Medicine.upsertOne","Medicine.deleteOne","Medicine.deleteMany","_avg","_sum","Medicine.groupBy","Medicine.aggregate","Order.findUnique","Order.findUniqueOrThrow","Order.findFirst","Order.findFirstOrThrow","Order.findMany","Order.createOne","Order.createMany","Order.createManyAndReturn","Order.updateOne","Order.updateMany","Order.updateManyAndReturn","Order.upsertOne","Order.deleteOne","Order.deleteMany","Order.groupBy","Order.aggregate","OrderItem.findUnique","OrderItem.findUniqueOrThrow","OrderItem.findFirst","OrderItem.findFirstOrThrow","OrderItem.findMany","OrderItem.createOne","OrderItem.createMany","OrderItem.createManyAndReturn","OrderItem.updateOne","OrderItem.updateMany","OrderItem.updateManyAndReturn","OrderItem.upsertOne","OrderItem.deleteOne","OrderItem.deleteMany","OrderItem.groupBy","OrderItem.aggregate","Profile.findUnique","Profile.findUniqueOrThrow","Profile.findFirst","Profile.findFirstOrThrow","Profile.findMany","Profile.createOne","Profile.createMany","Profile.createManyAndReturn","Profile.updateOne","Profile.updateMany","Profile.updateManyAndReturn","Profile.upsertOne","Profile.deleteOne","Profile.deleteMany","Profile.groupBy","Profile.aggregate","Review.findUnique","Review.findUniqueOrThrow","Review.findFirst","Review.findFirstOrThrow","Review.findMany","Review.createOne","Review.createMany","Review.createManyAndReturn","Review.updateOne","Review.updateMany","Review.updateManyAndReturn","Review.upsertOne","Review.deleteOne","Review.deleteMany","Review.groupBy","Review.aggregate","User.findUnique","User.findUniqueOrThrow","User.findFirst","User.findFirstOrThrow","User.findMany","User.createOne","User.createMany","User.createManyAndReturn","User.updateOne","User.updateMany","User.updateManyAndReturn","User.upsertOne","User.deleteOne","User.deleteMany","User.groupBy","User.aggregate","Session.findUnique","Session.findUniqueOrThrow","Session.findFirst","Session.findFirstOrThrow","Session.findMany","Session.createOne","Session.createMany","Session.createManyAndReturn","Session.updateOne","Session.updateMany","Session.updateManyAndReturn","Session.upsertOne","Session.deleteOne","Session.deleteMany","Session.groupBy","Session.aggregate","Account.findUnique","Account.findUniqueOrThrow","Account.findFirst","Account.findFirstOrThrow","Account.findMany","Account.createOne","Account.createMany","Account.createManyAndReturn","Account.updateOne","Account.updateMany","Account.updateManyAndReturn","Account.upsertOne","Account.deleteOne","Account.deleteMany","Account.groupBy","Account.aggregate","Verification.findUnique","Verification.findUniqueOrThrow","Verification.findFirst","Verification.findFirstOrThrow","Verification.findMany","Verification.createOne","Verification.createMany","Verification.createManyAndReturn","Verification.updateOne","Verification.updateMany","Verification.updateManyAndReturn","Verification.upsertOne","Verification.deleteOne","Verification.deleteMany","Verification.groupBy","Verification.aggregate","AND","OR","NOT","id","identifier","value","expiresAt","createdAt","updatedAt","equals","in","notIn","lt","lte","gt","gte","not","contains","startsWith","endsWith","accountId","providerId","userId","accessToken","refreshToken","idToken","accessTokenExpiresAt","refreshTokenExpiresAt","scope","password","token","ipAddress","userAgent","name","email","emailVerified","image","callbackURL","Role","role","Status","status","every","some","none","rating","comment","medicineId","bio","address","location","contact_number","orderId","quantity","price","OrderStatus","totalPrice","sellerId","categoryId","genericName","strength","UnitType","unitType","group","description","overview","discountPrice","stock","tags","isPrescriptionRequired","expiryDate","sku","views","has","hasEvery","hasSome","slug","userId_medicineId","name_sellerId","is","isNot","connectOrCreate","upsert","createMany","set","disconnect","delete","connect","updateMany","deleteMany","push","increment","decrement","multiply","divide"]'),
  graph: "7ARdoAELDQAAtgIAILgBAADPAgAwuQEAACoAELoBAADPAgAwuwEBAAAAAb8BQACYAgAhwAFAAJgCACHZAQEAAAAB3AEBAK4CACH4AQEArgIAIYQCAQAAAAEBAAAAAQAgHAcAALMCACALAADXAgAgDgAAvQIAIA8AAOECACC4AQAA3gIAMLkBAAADABC6AQAA3gIAMLsBAQCXAgAhvwFAAJgCACHAAUAAmAIAIdkBAQCXAgAh3AEBAJcCACHuARAA0gIAIfEBAQCXAgAh8gEBAJcCACHzAQEAlwIAIfQBAQCuAgAh9gEAAN8C9gEi9wEBAK4CACH4AQEAlwIAIfkBAQCXAgAh-gEQAOACACH7AQIA0QIAIfwBAADJAgAg_QEgAK0CACH-AUAA2wIAIf8BAQCuAgAhgAICANECACEJBwAA_gMAIAsAALAEACAOAACMBAAgDwAAsQQAIPQBAADnAgAg9wEAAOcCACD6AQAA5wIAIP4BAADnAgAg_wEAAOcCACAdBwAAswIAIAsAANcCACAOAAC9AgAgDwAA4QIAILgBAADeAgAwuQEAAAMAELoBAADeAgAwuwEBAAAAAb8BQACYAgAhwAFAAJgCACHZAQEAlwIAIdwBAQCXAgAh7gEQANICACHxAQEAlwIAIfIBAQCXAgAh8wEBAJcCACH0AQEArgIAIfYBAADfAvYBIvcBAQCuAgAh-AEBAJcCACH5AQEAlwIAIfoBEADgAgAh-wECANECACH8AQAAyQIAIP0BIACtAgAh_gFAANsCACH_AQEArgIAIYACAgDRAgAhhgIAAN0CACADAAAAAwAgAQAABAAwAgAABQAgDAMAAL0CACC4AQAA3AIAMLkBAAAHABC6AQAA3AIAMLsBAQCXAgAhvgFAAJgCACG_AUAAmAIAIcABQACYAgAhzgEBAJcCACHWAQEAlwIAIdcBAQCuAgAh2AEBAK4CACEDAwAAjAQAINcBAADnAgAg2AEAAOcCACAMAwAAvQIAILgBAADcAgAwuQEAAAcAELoBAADcAgAwuwEBAAAAAb4BQACYAgAhvwFAAJgCACHAAUAAmAIAIc4BAQCXAgAh1gEBAAAAAdcBAQCuAgAh2AEBAK4CACEDAAAABwAgAQAACAAwAgAACQAgEQMAAL0CACC4AQAA2gIAMLkBAAALABC6AQAA2gIAMLsBAQCXAgAhvwFAAJgCACHAAUAAmAIAIcwBAQCXAgAhzQEBAJcCACHOAQEAlwIAIc8BAQCuAgAh0AEBAK4CACHRAQEArgIAIdIBQADbAgAh0wFAANsCACHUAQEArgIAIdUBAQCuAgAhCAMAAIwEACDPAQAA5wIAINABAADnAgAg0QEAAOcCACDSAQAA5wIAINMBAADnAgAg1AEAAOcCACDVAQAA5wIAIBEDAAC9AgAguAEAANoCADC5AQAACwAQugEAANoCADC7AQEAAAABvwFAAJgCACHAAUAAmAIAIcwBAQCXAgAhzQEBAJcCACHOAQEAlwIAIc8BAQCuAgAh0AEBAK4CACHRAQEArgIAIdIBQADbAgAh0wFAANsCACHUAQEArgIAIdUBAQCuAgAhAwAAAAsAIAEAAAwAMAIAAA0AIAsDAAC9AgAgBgAA1AIAILgBAADZAgAwuQEAAA8AELoBAADZAgAwuwEBAJcCACG_AUAAmAIAIc4BAQCXAgAh5QECANECACHmAQEAlwIAIecBAQCXAgAhAgMAAIwEACAGAACvBAAgDAMAAL0CACAGAADUAgAguAEAANkCADC5AQAADwAQugEAANkCADC7AQEAAAABvwFAAJgCACHOAQEAlwIAIeUBAgDRAgAh5gEBAJcCACHnAQEAlwIAIYUCAADYAgAgAwAAAA8AIAEAABAAMAIAABEAIAsDAAC9AgAgCQAA1wIAILgBAADVAgAwuQEAABMAELoBAADVAgAwuwEBAJcCACG_AUAAmAIAIc4BAQCXAgAh4QEAANYC8AEi6QEBAJcCACHwARAA0gIAIQIDAACMBAAgCQAAsAQAIAsDAAC9AgAgCQAA1wIAILgBAADVAgAwuQEAABMAELoBAADVAgAwuwEBAAAAAb8BQACYAgAhzgEBAJcCACHhAQAA1gLwASLpAQEAlwIAIfABEADSAgAhAwAAABMAIAEAABQAMAIAABUAIAoGAADUAgAgCAAA0wIAILgBAADQAgAwuQEAABcAELoBAADQAgAwuwEBAJcCACHnAQEAlwIAIewBAQCXAgAh7QECANECACHuARAA0gIAIQIGAACvBAAgCAAArgQAIAoGAADUAgAgCAAA0wIAILgBAADQAgAwuQEAABcAELoBAADQAgAwuwEBAAAAAecBAQCXAgAh7AEBAJcCACHtAQIA0QIAIe4BEADSAgAhAwAAABcAIAEAABgAMAIAABkAIAEAAAAXACAMAwAAvQIAILgBAAC8AgAwuQEAABwAELoBAAC8AgAwuwEBAJcCACG_AUAAmAIAIcABQACYAgAhzgEBAJcCACHoAQEArgIAIekBAQCXAgAh6gEBAJcCACHrAQEAlwIAIQEAAAAcACADAAAAAwAgAQAABAAwAgAABQAgAQAAAAcAIAEAAAALACABAAAADwAgAQAAABMAIAEAAAADACADAAAAFwAgAQAAGAAwAgAAGQAgAwAAAA8AIAEAABAAMAIAABEAIAEAAAAXACABAAAADwAgAQAAAAMAIAEAAAABACALDQAAtgIAILgBAADPAgAwuQEAACoAELoBAADPAgAwuwEBAJcCACG_AUAAmAIAIcABQACYAgAh2QEBAJcCACHcAQEArgIAIfgBAQCuAgAhhAIBAJcCACEDDQAAgQQAINwBAADnAgAg-AEAAOcCACADAAAAKgAgAQAAKwAwAgAAAQAgAwAAACoAIAEAACsAMAIAAAEAIAMAAAAqACABAAArADACAAABACAIDQAArQQAILsBAQAAAAG_AUAAAAABwAFAAAAAAdkBAQAAAAHcAQEAAAAB-AEBAAAAAYQCAQAAAAEBFQAALwAgB7sBAQAAAAG_AUAAAAABwAFAAAAAAdkBAQAAAAHcAQEAAAAB-AEBAAAAAYQCAQAAAAEBFQAAMQAwARUAADEAMAgNAACjBAAguwEBAOUCACG_AUAA5gIAIcABQADmAgAh2QEBAOUCACHcAQEA6wIAIfgBAQDrAgAhhAIBAOUCACECAAAAAQAgFQAANAAgB7sBAQDlAgAhvwFAAOYCACHAAUAA5gIAIdkBAQDlAgAh3AEBAOsCACH4AQEA6wIAIYQCAQDlAgAhAgAAACoAIBUAADYAIAIAAAAqACAVAAA2ACADAAAAAQAgHAAALwAgHQAANAAgAQAAAAEAIAEAAAAqACAFCgAAoAQAICIAAKIEACAjAAChBAAg3AEAAOcCACD4AQAA5wIAIAq4AQAAzgIAMLkBAAA9ABC6AQAAzgIAMLsBAQCPAgAhvwFAAJACACHAAUAAkAIAIdkBAQCPAgAh3AEBAJoCACH4AQEAmgIAIYQCAQCPAgAhAwAAACoAIAEAADwAMCEAAD0AIAMAAAAqACABAAArADACAAABACABAAAABQAgAQAAAAUAIAMAAAADACABAAAEADACAAAFACADAAAAAwAgAQAABAAwAgAABQAgAwAAAAMAIAEAAAQAMAIAAAUAIBkHAACzAwAgCwAAsgMAIA4AAJ8EACAPAACxAwAguwEBAAAAAb8BQAAAAAHAAUAAAAAB2QEBAAAAAdwBAQAAAAHuARAAAAAB8QEBAAAAAfIBAQAAAAHzAQEAAAAB9AEBAAAAAfYBAAAA9gEC9wEBAAAAAfgBAQAAAAH5AQEAAAAB-gEQAAAAAfsBAgAAAAH8AQAAsAMAIP0BIAAAAAH-AUAAAAAB_wEBAAAAAYACAgAAAAEBFQAARQAgFbsBAQAAAAG_AUAAAAABwAFAAAAAAdkBAQAAAAHcAQEAAAAB7gEQAAAAAfEBAQAAAAHyAQEAAAAB8wEBAAAAAfQBAQAAAAH2AQAAAPYBAvcBAQAAAAH4AQEAAAAB-QEBAAAAAfoBEAAAAAH7AQIAAAAB_AEAALADACD9ASAAAAAB_gFAAAAAAf8BAQAAAAGAAgIAAAABARUAAEcAMAEVAABHADAZBwAAkgMAIAsAAJEDACAOAACeBAAgDwAAkAMAILsBAQDlAgAhvwFAAOYCACHAAUAA5gIAIdkBAQDlAgAh3AEBAOUCACHuARAAiwMAIfEBAQDlAgAh8gEBAOUCACHzAQEA5QIAIfQBAQDrAgAh9gEAAIoD9gEi9wEBAOsCACH4AQEA5QIAIfkBAQDlAgAh-gEQAIwDACH7AQIAjQMAIfwBAACOAwAg_QEgAPcCACH-AUAA7AIAIf8BAQDrAgAhgAICAI0DACECAAAABQAgFQAASgAgFbsBAQDlAgAhvwFAAOYCACHAAUAA5gIAIdkBAQDlAgAh3AEBAOUCACHuARAAiwMAIfEBAQDlAgAh8gEBAOUCACHzAQEA5QIAIfQBAQDrAgAh9gEAAIoD9gEi9wEBAOsCACH4AQEA5QIAIfkBAQDlAgAh-gEQAIwDACH7AQIAjQMAIfwBAACOAwAg_QEgAPcCACH-AUAA7AIAIf8BAQDrAgAhgAICAI0DACECAAAAAwAgFQAATAAgAgAAAAMAIBUAAEwAIAMAAAAFACAcAABFACAdAABKACABAAAABQAgAQAAAAMAIAoKAACZBAAgIgAAnAQAICMAAJsEACA0AACaBAAgNQAAnQQAIPQBAADnAgAg9wEAAOcCACD6AQAA5wIAIP4BAADnAgAg_wEAAOcCACAYuAEAAMYCADC5AQAAUwAQugEAAMYCADC7AQEAjwIAIb8BQACQAgAhwAFAAJACACHZAQEAjwIAIdwBAQCPAgAh7gEQAL8CACHxAQEAjwIAIfIBAQCPAgAh8wEBAI8CACH0AQEAmgIAIfYBAADHAvYBIvcBAQCaAgAh-AEBAI8CACH5AQEAjwIAIfoBEADIAgAh-wECALgCACH8AQAAyQIAIP0BIACjAgAh_gFAAJsCACH_AQEAmgIAIYACAgC4AgAhAwAAAAMAIAEAAFIAMCEAAFMAIAMAAAADACABAAAEADACAAAFACABAAAAFQAgAQAAABUAIAMAAAATACABAAAUADACAAAVACADAAAAEwAgAQAAFAAwAgAAFQAgAwAAABMAIAEAABQAMAIAABUAIAgDAACYBAAgCQAA0gMAILsBAQAAAAG_AUAAAAABzgEBAAAAAeEBAAAA8AEC6QEBAAAAAfABEAAAAAEBFQAAWwAgBrsBAQAAAAG_AUAAAAABzgEBAAAAAeEBAAAA8AEC6QEBAAAAAfABEAAAAAEBFQAAXQAwARUAAF0AMAgDAACXBAAgCQAAxQMAILsBAQDlAgAhvwFAAOYCACHOAQEA5QIAIeEBAADDA_ABIukBAQDlAgAh8AEQAIsDACECAAAAFQAgFQAAYAAgBrsBAQDlAgAhvwFAAOYCACHOAQEA5QIAIeEBAADDA_ABIukBAQDlAgAh8AEQAIsDACECAAAAEwAgFQAAYgAgAgAAABMAIBUAAGIAIAMAAAAVACAcAABbACAdAABgACABAAAAFQAgAQAAABMAIAUKAACSBAAgIgAAlQQAICMAAJQEACA0AACTBAAgNQAAlgQAIAm4AQAAwgIAMLkBAABpABC6AQAAwgIAMLsBAQCPAgAhvwFAAJACACHOAQEAjwIAIeEBAADDAvABIukBAQCPAgAh8AEQAL8CACEDAAAAEwAgAQAAaAAwIQAAaQAgAwAAABMAIAEAABQAMAIAABUAIAEAAAAZACABAAAAGQAgAwAAABcAIAEAABgAMAIAABkAIAMAAAAXACABAAAYADACAAAZACADAAAAFwAgAQAAGAAwAgAAGQAgBwYAANADACAIAACuAwAguwEBAAAAAecBAQAAAAHsAQEAAAAB7QECAAAAAe4BEAAAAAEBFQAAcQAgBbsBAQAAAAHnAQEAAAAB7AEBAAAAAe0BAgAAAAHuARAAAAABARUAAHMAMAEVAABzADAHBgAAzgMAIAgAAKwDACC7AQEA5QIAIecBAQDlAgAh7AEBAOUCACHtAQIAjQMAIe4BEACLAwAhAgAAABkAIBUAAHYAIAW7AQEA5QIAIecBAQDlAgAh7AEBAOUCACHtAQIAjQMAIe4BEACLAwAhAgAAABcAIBUAAHgAIAIAAAAXACAVAAB4ACADAAAAGQAgHAAAcQAgHQAAdgAgAQAAABkAIAEAAAAXACAFCgAAjQQAICIAAJAEACAjAACPBAAgNAAAjgQAIDUAAJEEACAIuAEAAL4CADC5AQAAfwAQugEAAL4CADC7AQEAjwIAIecBAQCPAgAh7AEBAI8CACHtAQIAuAIAIe4BEAC_AgAhAwAAABcAIAEAAH4AMCEAAH8AIAMAAAAXACABAAAYADACAAAZACAMAwAAvQIAILgBAAC8AgAwuQEAABwAELoBAAC8AgAwuwEBAAAAAb8BQACYAgAhwAFAAJgCACHOAQEAAAAB6AEBAK4CACHpAQEAlwIAIeoBAQCXAgAh6wEBAJcCACEBAAAAggEAIAEAAACCAQAgAgMAAIwEACDoAQAA5wIAIAMAAAAcACABAACFAQAwAgAAggEAIAMAAAAcACABAACFAQAwAgAAggEAIAMAAAAcACABAACFAQAwAgAAggEAIAkDAACLBAAguwEBAAAAAb8BQAAAAAHAAUAAAAABzgEBAAAAAegBAQAAAAHpAQEAAAAB6gEBAAAAAesBAQAAAAEBFQAAiQEAIAi7AQEAAAABvwFAAAAAAcABQAAAAAHOAQEAAAAB6AEBAAAAAekBAQAAAAHqAQEAAAAB6wEBAAAAAQEVAACLAQAwARUAAIsBADAJAwAAigQAILsBAQDlAgAhvwFAAOYCACHAAUAA5gIAIc4BAQDlAgAh6AEBAOsCACHpAQEA5QIAIeoBAQDlAgAh6wEBAOUCACECAAAAggEAIBUAAI4BACAIuwEBAOUCACG_AUAA5gIAIcABQADmAgAhzgEBAOUCACHoAQEA6wIAIekBAQDlAgAh6gEBAOUCACHrAQEA5QIAIQIAAAAcACAVAACQAQAgAgAAABwAIBUAAJABACADAAAAggEAIBwAAIkBACAdAACOAQAgAQAAAIIBACABAAAAHAAgBAoAAIcEACAiAACJBAAgIwAAiAQAIOgBAADnAgAgC7gBAAC7AgAwuQEAAJcBABC6AQAAuwIAMLsBAQCPAgAhvwFAAJACACHAAUAAkAIAIc4BAQCPAgAh6AEBAJoCACHpAQEAjwIAIeoBAQCPAgAh6wEBAI8CACEDAAAAHAAgAQAAlgEAMCEAAJcBACADAAAAHAAgAQAAhQEAMAIAAIIBACABAAAAEQAgAQAAABEAIAMAAAAPACABAAAQADACAAARACADAAAADwAgAQAAEAAwAgAAEQAgAwAAAA8AIAEAABAAMAIAABEAIAgDAACgAwAgBgAA3QMAILsBAQAAAAG_AUAAAAABzgEBAAAAAeUBAgAAAAHmAQEAAAAB5wEBAAAAAQEVAACfAQAgBrsBAQAAAAG_AUAAAAABzgEBAAAAAeUBAgAAAAHmAQEAAAAB5wEBAAAAAQEVAAChAQAwARUAAKEBADAIAwAAngMAIAYAANsDACC7AQEA5QIAIb8BQADmAgAhzgEBAOUCACHlAQIAjQMAIeYBAQDlAgAh5wEBAOUCACECAAAAEQAgFQAApAEAIAa7AQEA5QIAIb8BQADmAgAhzgEBAOUCACHlAQIAjQMAIeYBAQDlAgAh5wEBAOUCACECAAAADwAgFQAApgEAIAIAAAAPACAVAACmAQAgAwAAABEAIBwAAJ8BACAdAACkAQAgAQAAABEAIAEAAAAPACAFCgAAggQAICIAAIUEACAjAACEBAAgNAAAgwQAIDUAAIYEACAJuAEAALcCADC5AQAArQEAELoBAAC3AgAwuwEBAI8CACG_AUAAkAIAIc4BAQCPAgAh5QECALgCACHmAQEAjwIAIecBAQCPAgAhAwAAAA8AIAEAAKwBADAhAACtAQAgAwAAAA8AIAEAABAAMAIAABEAIBMEAACxAgAgBQAAsgIAIAcAALMCACALAAC0AgAgDAAAtQIAIA0AALYCACC4AQAArAIAMLkBAACzAQAQugEAAKwCADC7AQEAAAABvwFAAJgCACHAAUAAmAIAIdkBAQCXAgAh2gEBAAAAAdsBIACtAgAh3AEBAK4CACHdAQEArgIAId8BAACvAt8BIuEBAACwAuEBIgEAAACwAQAgAQAAALABACATBAAAsQIAIAUAALICACAHAACzAgAgCwAAtAIAIAwAALUCACANAAC2AgAguAEAAKwCADC5AQAAswEAELoBAACsAgAwuwEBAJcCACG_AUAAmAIAIcABQACYAgAh2QEBAJcCACHaAQEAlwIAIdsBIACtAgAh3AEBAK4CACHdAQEArgIAId8BAACvAt8BIuEBAACwAuEBIggEAAD8AwAgBQAA_QMAIAcAAP4DACALAAD_AwAgDAAAgAQAIA0AAIEEACDcAQAA5wIAIN0BAADnAgAgAwAAALMBACABAAC0AQAwAgAAsAEAIAMAAACzAQAgAQAAtAEAMAIAALABACADAAAAswEAIAEAALQBADACAACwAQAgEAQAAPYDACAFAAD3AwAgBwAA-AMAIAsAAPkDACAMAAD6AwAgDQAA-wMAILsBAQAAAAG_AUAAAAABwAFAAAAAAdkBAQAAAAHaAQEAAAAB2wEgAAAAAdwBAQAAAAHdAQEAAAAB3wEAAADfAQLhAQAAAOEBAgEVAAC4AQAgCrsBAQAAAAG_AUAAAAABwAFAAAAAAdkBAQAAAAHaAQEAAAAB2wEgAAAAAdwBAQAAAAHdAQEAAAAB3wEAAADfAQLhAQAAAOEBAgEVAAC6AQAwARUAALoBADAQBAAA-gIAIAUAAPsCACAHAAD8AgAgCwAA_QIAIAwAAP4CACANAAD_AgAguwEBAOUCACG_AUAA5gIAIcABQADmAgAh2QEBAOUCACHaAQEA5QIAIdsBIAD3AgAh3AEBAOsCACHdAQEA6wIAId8BAAD4At8BIuEBAAD5AuEBIgIAAACwAQAgFQAAvQEAIAq7AQEA5QIAIb8BQADmAgAhwAFAAOYCACHZAQEA5QIAIdoBAQDlAgAh2wEgAPcCACHcAQEA6wIAId0BAQDrAgAh3wEAAPgC3wEi4QEAAPkC4QEiAgAAALMBACAVAAC_AQAgAgAAALMBACAVAAC_AQAgAwAAALABACAcAAC4AQAgHQAAvQEAIAEAAACwAQAgAQAAALMBACAFCgAA9AIAICIAAPYCACAjAAD1AgAg3AEAAOcCACDdAQAA5wIAIA24AQAAogIAMLkBAADGAQAQugEAAKICADC7AQEAjwIAIb8BQACQAgAhwAFAAJACACHZAQEAjwIAIdoBAQCPAgAh2wEgAKMCACHcAQEAmgIAId0BAQCaAgAh3wEAAKQC3wEi4QEAAKUC4QEiAwAAALMBACABAADFAQAwIQAAxgEAIAMAAACzAQAgAQAAtAEAMAIAALABACABAAAACQAgAQAAAAkAIAMAAAAHACABAAAIADACAAAJACADAAAABwAgAQAACAAwAgAACQAgAwAAAAcAIAEAAAgAMAIAAAkAIAkDAADzAgAguwEBAAAAAb4BQAAAAAG_AUAAAAABwAFAAAAAAc4BAQAAAAHWAQEAAAAB1wEBAAAAAdgBAQAAAAEBFQAAzgEAIAi7AQEAAAABvgFAAAAAAb8BQAAAAAHAAUAAAAABzgEBAAAAAdYBAQAAAAHXAQEAAAAB2AEBAAAAAQEVAADQAQAwARUAANABADAJAwAA8gIAILsBAQDlAgAhvgFAAOYCACG_AUAA5gIAIcABQADmAgAhzgEBAOUCACHWAQEA5QIAIdcBAQDrAgAh2AEBAOsCACECAAAACQAgFQAA0wEAIAi7AQEA5QIAIb4BQADmAgAhvwFAAOYCACHAAUAA5gIAIc4BAQDlAgAh1gEBAOUCACHXAQEA6wIAIdgBAQDrAgAhAgAAAAcAIBUAANUBACACAAAABwAgFQAA1QEAIAMAAAAJACAcAADOAQAgHQAA0wEAIAEAAAAJACABAAAABwAgBQoAAO8CACAiAADxAgAgIwAA8AIAINcBAADnAgAg2AEAAOcCACALuAEAAKECADC5AQAA3AEAELoBAAChAgAwuwEBAI8CACG-AUAAkAIAIb8BQACQAgAhwAFAAJACACHOAQEAjwIAIdYBAQCPAgAh1wEBAJoCACHYAQEAmgIAIQMAAAAHACABAADbAQAwIQAA3AEAIAMAAAAHACABAAAIADACAAAJACABAAAADQAgAQAAAA0AIAMAAAALACABAAAMADACAAANACADAAAACwAgAQAADAAwAgAADQAgAwAAAAsAIAEAAAwAMAIAAA0AIA4DAADuAgAguwEBAAAAAb8BQAAAAAHAAUAAAAABzAEBAAAAAc0BAQAAAAHOAQEAAAABzwEBAAAAAdABAQAAAAHRAQEAAAAB0gFAAAAAAdMBQAAAAAHUAQEAAAAB1QEBAAAAAQEVAADkAQAgDbsBAQAAAAG_AUAAAAABwAFAAAAAAcwBAQAAAAHNAQEAAAABzgEBAAAAAc8BAQAAAAHQAQEAAAAB0QEBAAAAAdIBQAAAAAHTAUAAAAAB1AEBAAAAAdUBAQAAAAEBFQAA5gEAMAEVAADmAQAwDgMAAO0CACC7AQEA5QIAIb8BQADmAgAhwAFAAOYCACHMAQEA5QIAIc0BAQDlAgAhzgEBAOUCACHPAQEA6wIAIdABAQDrAgAh0QEBAOsCACHSAUAA7AIAIdMBQADsAgAh1AEBAOsCACHVAQEA6wIAIQIAAAANACAVAADpAQAgDbsBAQDlAgAhvwFAAOYCACHAAUAA5gIAIcwBAQDlAgAhzQEBAOUCACHOAQEA5QIAIc8BAQDrAgAh0AEBAOsCACHRAQEA6wIAIdIBQADsAgAh0wFAAOwCACHUAQEA6wIAIdUBAQDrAgAhAgAAAAsAIBUAAOsBACACAAAACwAgFQAA6wEAIAMAAAANACAcAADkAQAgHQAA6QEAIAEAAAANACABAAAACwAgCgoAAOgCACAiAADqAgAgIwAA6QIAIM8BAADnAgAg0AEAAOcCACDRAQAA5wIAINIBAADnAgAg0wEAAOcCACDUAQAA5wIAINUBAADnAgAgELgBAACZAgAwuQEAAPIBABC6AQAAmQIAMLsBAQCPAgAhvwFAAJACACHAAUAAkAIAIcwBAQCPAgAhzQEBAI8CACHOAQEAjwIAIc8BAQCaAgAh0AEBAJoCACHRAQEAmgIAIdIBQACbAgAh0wFAAJsCACHUAQEAmgIAIdUBAQCaAgAhAwAAAAsAIAEAAPEBADAhAADyAQAgAwAAAAsAIAEAAAwAMAIAAA0AIAm4AQAAlgIAMLkBAAD4AQAQugEAAJYCADC7AQEAAAABvAEBAJcCACG9AQEAlwIAIb4BQACYAgAhvwFAAJgCACHAAUAAmAIAIQEAAAD1AQAgAQAAAPUBACAJuAEAAJYCADC5AQAA-AEAELoBAACWAgAwuwEBAJcCACG8AQEAlwIAIb0BAQCXAgAhvgFAAJgCACG_AUAAmAIAIcABQACYAgAhAAMAAAD4AQAgAQAA-QEAMAIAAPUBACADAAAA-AEAIAEAAPkBADACAAD1AQAgAwAAAPgBACABAAD5AQAwAgAA9QEAIAa7AQEAAAABvAEBAAAAAb0BAQAAAAG-AUAAAAABvwFAAAAAAcABQAAAAAEBFQAA_QEAIAa7AQEAAAABvAEBAAAAAb0BAQAAAAG-AUAAAAABvwFAAAAAAcABQAAAAAEBFQAA_wEAMAEVAAD_AQAwBrsBAQDlAgAhvAEBAOUCACG9AQEA5QIAIb4BQADmAgAhvwFAAOYCACHAAUAA5gIAIQIAAAD1AQAgFQAAggIAIAa7AQEA5QIAIbwBAQDlAgAhvQEBAOUCACG-AUAA5gIAIb8BQADmAgAhwAFAAOYCACECAAAA-AEAIBUAAIQCACACAAAA-AEAIBUAAIQCACADAAAA9QEAIBwAAP0BACAdAACCAgAgAQAAAPUBACABAAAA-AEAIAMKAADiAgAgIgAA5AIAICMAAOMCACAJuAEAAI4CADC5AQAAiwIAELoBAACOAgAwuwEBAI8CACG8AQEAjwIAIb0BAQCPAgAhvgFAAJACACG_AUAAkAIAIcABQACQAgAhAwAAAPgBACABAACKAgAwIQAAiwIAIAMAAAD4AQAgAQAA-QEAMAIAAPUBACAJuAEAAI4CADC5AQAAiwIAELoBAACOAgAwuwEBAI8CACG8AQEAjwIAIb0BAQCPAgAhvgFAAJACACG_AUAAkAIAIcABQACQAgAhDgoAAJICACAiAACVAgAgIwAAlQIAIMEBAQAAAAHCAQEAAAAEwwEBAAAABMQBAQAAAAHFAQEAAAABxgEBAAAAAccBAQAAAAHIAQEAlAIAIckBAQAAAAHKAQEAAAABywEBAAAAAQsKAACSAgAgIgAAkwIAICMAAJMCACDBAUAAAAABwgFAAAAABMMBQAAAAATEAUAAAAABxQFAAAAAAcYBQAAAAAHHAUAAAAAByAFAAJECACELCgAAkgIAICIAAJMCACAjAACTAgAgwQFAAAAAAcIBQAAAAATDAUAAAAAExAFAAAAAAcUBQAAAAAHGAUAAAAABxwFAAAAAAcgBQACRAgAhCMEBAgAAAAHCAQIAAAAEwwECAAAABMQBAgAAAAHFAQIAAAABxgECAAAAAccBAgAAAAHIAQIAkgIAIQjBAUAAAAABwgFAAAAABMMBQAAAAATEAUAAAAABxQFAAAAAAcYBQAAAAAHHAUAAAAAByAFAAJMCACEOCgAAkgIAICIAAJUCACAjAACVAgAgwQEBAAAAAcIBAQAAAATDAQEAAAAExAEBAAAAAcUBAQAAAAHGAQEAAAABxwEBAAAAAcgBAQCUAgAhyQEBAAAAAcoBAQAAAAHLAQEAAAABC8EBAQAAAAHCAQEAAAAEwwEBAAAABMQBAQAAAAHFAQEAAAABxgEBAAAAAccBAQAAAAHIAQEAlQIAIckBAQAAAAHKAQEAAAABywEBAAAAAQm4AQAAlgIAMLkBAAD4AQAQugEAAJYCADC7AQEAlwIAIbwBAQCXAgAhvQEBAJcCACG-AUAAmAIAIb8BQACYAgAhwAFAAJgCACELwQEBAAAAAcIBAQAAAATDAQEAAAAExAEBAAAAAcUBAQAAAAHGAQEAAAABxwEBAAAAAcgBAQCVAgAhyQEBAAAAAcoBAQAAAAHLAQEAAAABCMEBQAAAAAHCAUAAAAAEwwFAAAAABMQBQAAAAAHFAUAAAAABxgFAAAAAAccBQAAAAAHIAUAAkwIAIRC4AQAAmQIAMLkBAADyAQAQugEAAJkCADC7AQEAjwIAIb8BQACQAgAhwAFAAJACACHMAQEAjwIAIc0BAQCPAgAhzgEBAI8CACHPAQEAmgIAIdABAQCaAgAh0QEBAJoCACHSAUAAmwIAIdMBQACbAgAh1AEBAJoCACHVAQEAmgIAIQ4KAACdAgAgIgAAoAIAICMAAKACACDBAQEAAAABwgEBAAAABcMBAQAAAAXEAQEAAAABxQEBAAAAAcYBAQAAAAHHAQEAAAAByAEBAJ8CACHJAQEAAAABygEBAAAAAcsBAQAAAAELCgAAnQIAICIAAJ4CACAjAACeAgAgwQFAAAAAAcIBQAAAAAXDAUAAAAAFxAFAAAAAAcUBQAAAAAHGAUAAAAABxwFAAAAAAcgBQACcAgAhCwoAAJ0CACAiAACeAgAgIwAAngIAIMEBQAAAAAHCAUAAAAAFwwFAAAAABcQBQAAAAAHFAUAAAAABxgFAAAAAAccBQAAAAAHIAUAAnAIAIQjBAQIAAAABwgECAAAABcMBAgAAAAXEAQIAAAABxQECAAAAAcYBAgAAAAHHAQIAAAAByAECAJ0CACEIwQFAAAAAAcIBQAAAAAXDAUAAAAAFxAFAAAAAAcUBQAAAAAHGAUAAAAABxwFAAAAAAcgBQACeAgAhDgoAAJ0CACAiAACgAgAgIwAAoAIAIMEBAQAAAAHCAQEAAAAFwwEBAAAABcQBAQAAAAHFAQEAAAABxgEBAAAAAccBAQAAAAHIAQEAnwIAIckBAQAAAAHKAQEAAAABywEBAAAAAQvBAQEAAAABwgEBAAAABcMBAQAAAAXEAQEAAAABxQEBAAAAAcYBAQAAAAHHAQEAAAAByAEBAKACACHJAQEAAAABygEBAAAAAcsBAQAAAAELuAEAAKECADC5AQAA3AEAELoBAAChAgAwuwEBAI8CACG-AUAAkAIAIb8BQACQAgAhwAFAAJACACHOAQEAjwIAIdYBAQCPAgAh1wEBAJoCACHYAQEAmgIAIQ24AQAAogIAMLkBAADGAQAQugEAAKICADC7AQEAjwIAIb8BQACQAgAhwAFAAJACACHZAQEAjwIAIdoBAQCPAgAh2wEgAKMCACHcAQEAmgIAId0BAQCaAgAh3wEAAKQC3wEi4QEAAKUC4QEiBQoAAJICACAiAACrAgAgIwAAqwIAIMEBIAAAAAHIASAAqgIAIQcKAACSAgAgIgAAqQIAICMAAKkCACDBAQAAAN8BAsIBAAAA3wEIwwEAAADfAQjIAQAAqALfASIHCgAAkgIAICIAAKcCACAjAACnAgAgwQEAAADhAQLCAQAAAOEBCMMBAAAA4QEIyAEAAKYC4QEiBwoAAJICACAiAACnAgAgIwAApwIAIMEBAAAA4QECwgEAAADhAQjDAQAAAOEBCMgBAACmAuEBIgTBAQAAAOEBAsIBAAAA4QEIwwEAAADhAQjIAQAApwLhASIHCgAAkgIAICIAAKkCACAjAACpAgAgwQEAAADfAQLCAQAAAN8BCMMBAAAA3wEIyAEAAKgC3wEiBMEBAAAA3wECwgEAAADfAQjDAQAAAN8BCMgBAACpAt8BIgUKAACSAgAgIgAAqwIAICMAAKsCACDBASAAAAAByAEgAKoCACECwQEgAAAAAcgBIACrAgAhEwQAALECACAFAACyAgAgBwAAswIAIAsAALQCACAMAAC1AgAgDQAAtgIAILgBAACsAgAwuQEAALMBABC6AQAArAIAMLsBAQCXAgAhvwFAAJgCACHAAUAAmAIAIdkBAQCXAgAh2gEBAJcCACHbASAArQIAIdwBAQCuAgAh3QEBAK4CACHfAQAArwLfASLhAQAAsALhASICwQEgAAAAAcgBIACrAgAhC8EBAQAAAAHCAQEAAAAFwwEBAAAABcQBAQAAAAHFAQEAAAABxgEBAAAAAccBAQAAAAHIAQEAoAIAIckBAQAAAAHKAQEAAAABywEBAAAAAQTBAQAAAN8BAsIBAAAA3wEIwwEAAADfAQjIAQAAqQLfASIEwQEAAADhAQLCAQAAAOEBCMMBAAAA4QEIyAEAAKcC4QEiA-IBAAAHACDjAQAABwAg5AEAAAcAIAPiAQAACwAg4wEAAAsAIOQBAAALACAD4gEAAA8AIOMBAAAPACDkAQAADwAgA-IBAAATACDjAQAAEwAg5AEAABMAIA4DAAC9AgAguAEAALwCADC5AQAAHAAQugEAALwCADC7AQEAlwIAIb8BQACYAgAhwAFAAJgCACHOAQEAlwIAIegBAQCuAgAh6QEBAJcCACHqAQEAlwIAIesBAQCXAgAhhwIAABwAIIgCAAAcACAD4gEAAAMAIOMBAAADACDkAQAAAwAgCbgBAAC3AgAwuQEAAK0BABC6AQAAtwIAMLsBAQCPAgAhvwFAAJACACHOAQEAjwIAIeUBAgC4AgAh5gEBAI8CACHnAQEAjwIAIQ0KAACSAgAgIgAAkgIAICMAAJICACA0AAC6AgAgNQAAkgIAIMEBAgAAAAHCAQIAAAAEwwECAAAABMQBAgAAAAHFAQIAAAABxgECAAAAAccBAgAAAAHIAQIAuQIAIQ0KAACSAgAgIgAAkgIAICMAAJICACA0AAC6AgAgNQAAkgIAIMEBAgAAAAHCAQIAAAAEwwECAAAABMQBAgAAAAHFAQIAAAABxgECAAAAAccBAgAAAAHIAQIAuQIAIQjBAQgAAAABwgEIAAAABMMBCAAAAATEAQgAAAABxQEIAAAAAcYBCAAAAAHHAQgAAAAByAEIALoCACELuAEAALsCADC5AQAAlwEAELoBAAC7AgAwuwEBAI8CACG_AUAAkAIAIcABQACQAgAhzgEBAI8CACHoAQEAmgIAIekBAQCPAgAh6gEBAI8CACHrAQEAjwIAIQwDAAC9AgAguAEAALwCADC5AQAAHAAQugEAALwCADC7AQEAlwIAIb8BQACYAgAhwAFAAJgCACHOAQEAlwIAIegBAQCuAgAh6QEBAJcCACHqAQEAlwIAIesBAQCXAgAhFQQAALECACAFAACyAgAgBwAAswIAIAsAALQCACAMAAC1AgAgDQAAtgIAILgBAACsAgAwuQEAALMBABC6AQAArAIAMLsBAQCXAgAhvwFAAJgCACHAAUAAmAIAIdkBAQCXAgAh2gEBAJcCACHbASAArQIAIdwBAQCuAgAh3QEBAK4CACHfAQAArwLfASLhAQAAsALhASKHAgAAswEAIIgCAACzAQAgCLgBAAC-AgAwuQEAAH8AELoBAAC-AgAwuwEBAI8CACHnAQEAjwIAIewBAQCPAgAh7QECALgCACHuARAAvwIAIQ0KAACSAgAgIgAAwQIAICMAAMECACA0AADBAgAgNQAAwQIAIMEBEAAAAAHCARAAAAAEwwEQAAAABMQBEAAAAAHFARAAAAABxgEQAAAAAccBEAAAAAHIARAAwAIAIQ0KAACSAgAgIgAAwQIAICMAAMECACA0AADBAgAgNQAAwQIAIMEBEAAAAAHCARAAAAAEwwEQAAAABMQBEAAAAAHFARAAAAABxgEQAAAAAccBEAAAAAHIARAAwAIAIQjBARAAAAABwgEQAAAABMMBEAAAAATEARAAAAABxQEQAAAAAcYBEAAAAAHHARAAAAAByAEQAMECACEJuAEAAMICADC5AQAAaQAQugEAAMICADC7AQEAjwIAIb8BQACQAgAhzgEBAI8CACHhAQAAwwLwASLpAQEAjwIAIfABEAC_AgAhBwoAAJICACAiAADFAgAgIwAAxQIAIMEBAAAA8AECwgEAAADwAQjDAQAAAPABCMgBAADEAvABIgcKAACSAgAgIgAAxQIAICMAAMUCACDBAQAAAPABAsIBAAAA8AEIwwEAAADwAQjIAQAAxALwASIEwQEAAADwAQLCAQAAAPABCMMBAAAA8AEIyAEAAMUC8AEiGLgBAADGAgAwuQEAAFMAELoBAADGAgAwuwEBAI8CACG_AUAAkAIAIcABQACQAgAh2QEBAI8CACHcAQEAjwIAIe4BEAC_AgAh8QEBAI8CACHyAQEAjwIAIfMBAQCPAgAh9AEBAJoCACH2AQAAxwL2ASL3AQEAmgIAIfgBAQCPAgAh-QEBAI8CACH6ARAAyAIAIfsBAgC4AgAh_AEAAMkCACD9ASAAowIAIf4BQACbAgAh_wEBAJoCACGAAgIAuAIAIQcKAACSAgAgIgAAzQIAICMAAM0CACDBAQAAAPYBAsIBAAAA9gEIwwEAAAD2AQjIAQAAzAL2ASINCgAAnQIAICIAAMsCACAjAADLAgAgNAAAywIAIDUAAMsCACDBARAAAAABwgEQAAAABcMBEAAAAAXEARAAAAABxQEQAAAAAcYBEAAAAAHHARAAAAAByAEQAMoCACEEwQEBAAAABYECAQAAAAGCAgEAAAAEgwIBAAAABA0KAACdAgAgIgAAywIAICMAAMsCACA0AADLAgAgNQAAywIAIMEBEAAAAAHCARAAAAAFwwEQAAAABcQBEAAAAAHFARAAAAABxgEQAAAAAccBEAAAAAHIARAAygIAIQjBARAAAAABwgEQAAAABcMBEAAAAAXEARAAAAABxQEQAAAAAcYBEAAAAAHHARAAAAAByAEQAMsCACEHCgAAkgIAICIAAM0CACAjAADNAgAgwQEAAAD2AQLCAQAAAPYBCMMBAAAA9gEIyAEAAMwC9gEiBMEBAAAA9gECwgEAAAD2AQjDAQAAAPYBCMgBAADNAvYBIgq4AQAAzgIAMLkBAAA9ABC6AQAAzgIAMLsBAQCPAgAhvwFAAJACACHAAUAAkAIAIdkBAQCPAgAh3AEBAJoCACH4AQEAmgIAIYQCAQCPAgAhCw0AALYCACC4AQAAzwIAMLkBAAAqABC6AQAAzwIAMLsBAQCXAgAhvwFAAJgCACHAAUAAmAIAIdkBAQCXAgAh3AEBAK4CACH4AQEArgIAIYQCAQCXAgAhCgYAANQCACAIAADTAgAguAEAANACADC5AQAAFwAQugEAANACADC7AQEAlwIAIecBAQCXAgAh7AEBAJcCACHtAQIA0QIAIe4BEADSAgAhCMEBAgAAAAHCAQIAAAAEwwECAAAABMQBAgAAAAHFAQIAAAABxgECAAAAAccBAgAAAAHIAQIAkgIAIQjBARAAAAABwgEQAAAABMMBEAAAAATEARAAAAABxQEQAAAAAcYBEAAAAAHHARAAAAAByAEQAMECACENAwAAvQIAIAkAANcCACC4AQAA1QIAMLkBAAATABC6AQAA1QIAMLsBAQCXAgAhvwFAAJgCACHOAQEAlwIAIeEBAADWAvABIukBAQCXAgAh8AEQANICACGHAgAAEwAgiAIAABMAIB4HAACzAgAgCwAA1wIAIA4AAL0CACAPAADhAgAguAEAAN4CADC5AQAAAwAQugEAAN4CADC7AQEAlwIAIb8BQACYAgAhwAFAAJgCACHZAQEAlwIAIdwBAQCXAgAh7gEQANICACHxAQEAlwIAIfIBAQCXAgAh8wEBAJcCACH0AQEArgIAIfYBAADfAvYBIvcBAQCuAgAh-AEBAJcCACH5AQEAlwIAIfoBEADgAgAh-wECANECACH8AQAAyQIAIP0BIACtAgAh_gFAANsCACH_AQEArgIAIYACAgDRAgAhhwIAAAMAIIgCAAADACALAwAAvQIAIAkAANcCACC4AQAA1QIAMLkBAAATABC6AQAA1QIAMLsBAQCXAgAhvwFAAJgCACHOAQEAlwIAIeEBAADWAvABIukBAQCXAgAh8AEQANICACEEwQEAAADwAQLCAQAAAPABCMMBAAAA8AEIyAEAAMUC8AEiA-IBAAAXACDjAQAAFwAg5AEAABcAIALOAQEAAAAB5wEBAAAAAQsDAAC9AgAgBgAA1AIAILgBAADZAgAwuQEAAA8AELoBAADZAgAwuwEBAJcCACG_AUAAmAIAIc4BAQCXAgAh5QECANECACHmAQEAlwIAIecBAQCXAgAhEQMAAL0CACC4AQAA2gIAMLkBAAALABC6AQAA2gIAMLsBAQCXAgAhvwFAAJgCACHAAUAAmAIAIcwBAQCXAgAhzQEBAJcCACHOAQEAlwIAIc8BAQCuAgAh0AEBAK4CACHRAQEArgIAIdIBQADbAgAh0wFAANsCACHUAQEArgIAIdUBAQCuAgAhCMEBQAAAAAHCAUAAAAAFwwFAAAAABcQBQAAAAAHFAUAAAAABxgFAAAAAAccBQAAAAAHIAUAAngIAIQwDAAC9AgAguAEAANwCADC5AQAABwAQugEAANwCADC7AQEAlwIAIb4BQACYAgAhvwFAAJgCACHAAUAAmAIAIc4BAQCXAgAh1gEBAJcCACHXAQEArgIAIdgBAQCuAgAhAtkBAQAAAAHxAQEAAAABHAcAALMCACALAADXAgAgDgAAvQIAIA8AAOECACC4AQAA3gIAMLkBAAADABC6AQAA3gIAMLsBAQCXAgAhvwFAAJgCACHAAUAAmAIAIdkBAQCXAgAh3AEBAJcCACHuARAA0gIAIfEBAQCXAgAh8gEBAJcCACHzAQEAlwIAIfQBAQCuAgAh9gEAAN8C9gEi9wEBAK4CACH4AQEAlwIAIfkBAQCXAgAh-gEQAOACACH7AQIA0QIAIfwBAADJAgAg_QEgAK0CACH-AUAA2wIAIf8BAQCuAgAhgAICANECACEEwQEAAAD2AQLCAQAAAPYBCMMBAAAA9gEIyAEAAM0C9gEiCMEBEAAAAAHCARAAAAAFwwEQAAAABcQBEAAAAAHFARAAAAABxgEQAAAAAccBEAAAAAHIARAAywIAIQ0NAAC2AgAguAEAAM8CADC5AQAAKgAQugEAAM8CADC7AQEAlwIAIb8BQACYAgAhwAFAAJgCACHZAQEAlwIAIdwBAQCuAgAh-AEBAK4CACGEAgEAlwIAIYcCAAAqACCIAgAAKgAgAAAAAYwCAQAAAAEBjAJAAAAAAQAAAAABjAIBAAAAAQGMAkAAAAABBRwAAOgEACAdAADrBAAgiQIAAOkEACCKAgAA6gQAII8CAACwAQAgAxwAAOgEACCJAgAA6QQAII8CAACwAQAgAAAABRwAAOMEACAdAADmBAAgiQIAAOQEACCKAgAA5QQAII8CAACwAQAgAxwAAOMEACCJAgAA5AQAII8CAACwAQAgAAAAAYwCIAAAAAEBjAIAAADfAQIBjAIAAADhAQILHAAA6gMAMB0AAO8DADCJAgAA6wMAMIoCAADsAwAwiwIAAO0DACCMAgAA7gMAMI0CAADuAwAwjgIAAO4DADCPAgAA7gMAMJACAADwAwAwkQIAAPEDADALHAAA3gMAMB0AAOMDADCJAgAA3wMAMIoCAADgAwAwiwIAAOEDACCMAgAA4gMAMI0CAADiAwAwjgIAAOIDADCPAgAA4gMAMJACAADkAwAwkQIAAOUDADALHAAA0wMAMB0AANcDADCJAgAA1AMAMIoCAADVAwAwiwIAANYDACCMAgAAlwMAMI0CAACXAwAwjgIAAJcDADCPAgAAlwMAMJACAADYAwAwkQIAAJoDADALHAAAuQMAMB0AAL4DADCJAgAAugMAMIoCAAC7AwAwiwIAALwDACCMAgAAvQMAMI0CAAC9AwAwjgIAAL0DADCPAgAAvQMAMJACAAC_AwAwkQIAAMADADAHHAAAtAMAIB0AALcDACCJAgAAtQMAIIoCAAC2AwAgjQIAABwAII4CAAAcACCPAgAAggEAIAscAACAAwAwHQAAhQMAMIkCAACBAwAwigIAAIIDADCLAgAAgwMAIIwCAACEAwAwjQIAAIQDADCOAgAAhAMAMI8CAACEAwAwkAIAAIYDADCRAgAAhwMAMBcHAACzAwAgCwAAsgMAIA8AALEDACC7AQEAAAABvwFAAAAAAcABQAAAAAHZAQEAAAAB3AEBAAAAAe4BEAAAAAHyAQEAAAAB8wEBAAAAAfQBAQAAAAH2AQAAAPYBAvcBAQAAAAH4AQEAAAAB-QEBAAAAAfoBEAAAAAH7AQIAAAAB_AEAALADACD9ASAAAAAB_gFAAAAAAf8BAQAAAAGAAgIAAAABAgAAAAUAIBwAAK8DACADAAAABQAgHAAArwMAIB0AAI8DACABFQAA4gQAMB0HAACzAgAgCwAA1wIAIA4AAL0CACAPAADhAgAguAEAAN4CADC5AQAAAwAQugEAAN4CADC7AQEAAAABvwFAAJgCACHAAUAAmAIAIdkBAQCXAgAh3AEBAJcCACHuARAA0gIAIfEBAQCXAgAh8gEBAJcCACHzAQEAlwIAIfQBAQCuAgAh9gEAAN8C9gEi9wEBAK4CACH4AQEAlwIAIfkBAQCXAgAh-gEQAOACACH7AQIA0QIAIfwBAADJAgAg_QEgAK0CACH-AUAA2wIAIf8BAQCuAgAhgAICANECACGGAgAA3QIAIAIAAAAFACAVAACPAwAgAgAAAIgDACAVAACJAwAgGLgBAACHAwAwuQEAAIgDABC6AQAAhwMAMLsBAQCXAgAhvwFAAJgCACHAAUAAmAIAIdkBAQCXAgAh3AEBAJcCACHuARAA0gIAIfEBAQCXAgAh8gEBAJcCACHzAQEAlwIAIfQBAQCuAgAh9gEAAN8C9gEi9wEBAK4CACH4AQEAlwIAIfkBAQCXAgAh-gEQAOACACH7AQIA0QIAIfwBAADJAgAg_QEgAK0CACH-AUAA2wIAIf8BAQCuAgAhgAICANECACEYuAEAAIcDADC5AQAAiAMAELoBAACHAwAwuwEBAJcCACG_AUAAmAIAIcABQACYAgAh2QEBAJcCACHcAQEAlwIAIe4BEADSAgAh8QEBAJcCACHyAQEAlwIAIfMBAQCXAgAh9AEBAK4CACH2AQAA3wL2ASL3AQEArgIAIfgBAQCXAgAh-QEBAJcCACH6ARAA4AIAIfsBAgDRAgAh_AEAAMkCACD9ASAArQIAIf4BQADbAgAh_wEBAK4CACGAAgIA0QIAIRS7AQEA5QIAIb8BQADmAgAhwAFAAOYCACHZAQEA5QIAIdwBAQDlAgAh7gEQAIsDACHyAQEA5QIAIfMBAQDlAgAh9AEBAOsCACH2AQAAigP2ASL3AQEA6wIAIfgBAQDlAgAh-QEBAOUCACH6ARAAjAMAIfsBAgCNAwAh_AEAAI4DACD9ASAA9wIAIf4BQADsAgAh_wEBAOsCACGAAgIAjQMAIQGMAgAAAPYBAgWMAhAAAAABkwIQAAAAAZQCEAAAAAGVAhAAAAABlgIQAAAAAQWMAhAAAAABkwIQAAAAAZQCEAAAAAGVAhAAAAABlgIQAAAAAQWMAgIAAAABkwICAAAAAZQCAgAAAAGVAgIAAAABlgICAAAAAQKMAgEAAAAEkgIBAAAABRcHAACSAwAgCwAAkQMAIA8AAJADACC7AQEA5QIAIb8BQADmAgAhwAFAAOYCACHZAQEA5QIAIdwBAQDlAgAh7gEQAIsDACHyAQEA5QIAIfMBAQDlAgAh9AEBAOsCACH2AQAAigP2ASL3AQEA6wIAIfgBAQDlAgAh-QEBAOUCACH6ARAAjAMAIfsBAgCNAwAh_AEAAI4DACD9ASAA9wIAIf4BQADsAgAh_wEBAOsCACGAAgIAjQMAIQUcAADRBAAgHQAA4AQAIIkCAADSBAAgigIAAN8EACCPAgAAAQAgCxwAAKEDADAdAACmAwAwiQIAAKIDADCKAgAAowMAMIsCAACkAwAgjAIAAKUDADCNAgAApQMAMI4CAAClAwAwjwIAAKUDADCQAgAApwMAMJECAACoAwAwCxwAAJMDADAdAACYAwAwiQIAAJQDADCKAgAAlQMAMIsCAACWAwAgjAIAAJcDADCNAgAAlwMAMI4CAACXAwAwjwIAAJcDADCQAgAAmQMAMJECAACaAwAwBgMAAKADACC7AQEAAAABvwFAAAAAAc4BAQAAAAHlAQIAAAAB5gEBAAAAAQIAAAARACAcAACfAwAgAwAAABEAIBwAAJ8DACAdAACdAwAgARUAAN4EADAMAwAAvQIAIAYAANQCACC4AQAA2QIAMLkBAAAPABC6AQAA2QIAMLsBAQAAAAG_AUAAmAIAIc4BAQCXAgAh5QECANECACHmAQEAlwIAIecBAQCXAgAhhQIAANgCACACAAAAEQAgFQAAnQMAIAIAAACbAwAgFQAAnAMAIAm4AQAAmgMAMLkBAACbAwAQugEAAJoDADC7AQEAlwIAIb8BQACYAgAhzgEBAJcCACHlAQIA0QIAIeYBAQCXAgAh5wEBAJcCACEJuAEAAJoDADC5AQAAmwMAELoBAACaAwAwuwEBAJcCACG_AUAAmAIAIc4BAQCXAgAh5QECANECACHmAQEAlwIAIecBAQCXAgAhBbsBAQDlAgAhvwFAAOYCACHOAQEA5QIAIeUBAgCNAwAh5gEBAOUCACEGAwAAngMAILsBAQDlAgAhvwFAAOYCACHOAQEA5QIAIeUBAgCNAwAh5gEBAOUCACEFHAAA2QQAIB0AANwEACCJAgAA2gQAIIoCAADbBAAgjwIAALABACAGAwAAoAMAILsBAQAAAAG_AUAAAAABzgEBAAAAAeUBAgAAAAHmAQEAAAABAxwAANkEACCJAgAA2gQAII8CAACwAQAgBQgAAK4DACC7AQEAAAAB7AEBAAAAAe0BAgAAAAHuARAAAAABAgAAABkAIBwAAK0DACADAAAAGQAgHAAArQMAIB0AAKsDACABFQAA2AQAMAoGAADUAgAgCAAA0wIAILgBAADQAgAwuQEAABcAELoBAADQAgAwuwEBAAAAAecBAQCXAgAh7AEBAJcCACHtAQIA0QIAIe4BEADSAgAhAgAAABkAIBUAAKsDACACAAAAqQMAIBUAAKoDACAIuAEAAKgDADC5AQAAqQMAELoBAACoAwAwuwEBAJcCACHnAQEAlwIAIewBAQCXAgAh7QECANECACHuARAA0gIAIQi4AQAAqAMAMLkBAACpAwAQugEAAKgDADC7AQEAlwIAIecBAQCXAgAh7AEBAJcCACHtAQIA0QIAIe4BEADSAgAhBLsBAQDlAgAh7AEBAOUCACHtAQIAjQMAIe4BEACLAwAhBQgAAKwDACC7AQEA5QIAIewBAQDlAgAh7QECAI0DACHuARAAiwMAIQUcAADTBAAgHQAA1gQAIIkCAADUBAAgigIAANUEACCPAgAAFQAgBQgAAK4DACC7AQEAAAAB7AEBAAAAAe0BAgAAAAHuARAAAAABAxwAANMEACCJAgAA1AQAII8CAAAVACAXBwAAswMAIAsAALIDACAPAACxAwAguwEBAAAAAb8BQAAAAAHAAUAAAAAB2QEBAAAAAdwBAQAAAAHuARAAAAAB8gEBAAAAAfMBAQAAAAH0AQEAAAAB9gEAAAD2AQL3AQEAAAAB-AEBAAAAAfkBAQAAAAH6ARAAAAAB-wECAAAAAfwBAACwAwAg_QEgAAAAAf4BQAAAAAH_AQEAAAABgAICAAAAAQGMAgEAAAAEAxwAANEEACCJAgAA0gQAII8CAAABACAEHAAAoQMAMIkCAACiAwAwiwIAAKQDACCPAgAApQMAMAQcAACTAwAwiQIAAJQDADCLAgAAlgMAII8CAACXAwAwB7sBAQAAAAG_AUAAAAABwAFAAAAAAegBAQAAAAHpAQEAAAAB6gEBAAAAAesBAQAAAAECAAAAggEAIBwAALQDACADAAAAHAAgHAAAtAMAIB0AALgDACAJAAAAHAAgFQAAuAMAILsBAQDlAgAhvwFAAOYCACHAAUAA5gIAIegBAQDrAgAh6QEBAOUCACHqAQEA5QIAIesBAQDlAgAhB7sBAQDlAgAhvwFAAOYCACHAAUAA5gIAIegBAQDrAgAh6QEBAOUCACHqAQEA5QIAIesBAQDlAgAhBgkAANIDACC7AQEAAAABvwFAAAAAAeEBAAAA8AEC6QEBAAAAAfABEAAAAAECAAAAFQAgHAAA0QMAIAMAAAAVACAcAADRAwAgHQAAxAMAIAEVAADQBAAwCwMAAL0CACAJAADXAgAguAEAANUCADC5AQAAEwAQugEAANUCADC7AQEAAAABvwFAAJgCACHOAQEAlwIAIeEBAADWAvABIukBAQCXAgAh8AEQANICACECAAAAFQAgFQAAxAMAIAIAAADBAwAgFQAAwgMAIAm4AQAAwAMAMLkBAADBAwAQugEAAMADADC7AQEAlwIAIb8BQACYAgAhzgEBAJcCACHhAQAA1gLwASLpAQEAlwIAIfABEADSAgAhCbgBAADAAwAwuQEAAMEDABC6AQAAwAMAMLsBAQCXAgAhvwFAAJgCACHOAQEAlwIAIeEBAADWAvABIukBAQCXAgAh8AEQANICACEFuwEBAOUCACG_AUAA5gIAIeEBAADDA_ABIukBAQDlAgAh8AEQAIsDACEBjAIAAADwAQIGCQAAxQMAILsBAQDlAgAhvwFAAOYCACHhAQAAwwPwASLpAQEA5QIAIfABEACLAwAhCxwAAMYDADAdAADKAwAwiQIAAMcDADCKAgAAyAMAMIsCAADJAwAgjAIAAKUDADCNAgAApQMAMI4CAAClAwAwjwIAAKUDADCQAgAAywMAMJECAACoAwAwBQYAANADACC7AQEAAAAB5wEBAAAAAe0BAgAAAAHuARAAAAABAgAAABkAIBwAAM8DACADAAAAGQAgHAAAzwMAIB0AAM0DACABFQAAzwQAMAIAAAAZACAVAADNAwAgAgAAAKkDACAVAADMAwAgBLsBAQDlAgAh5wEBAOUCACHtAQIAjQMAIe4BEACLAwAhBQYAAM4DACC7AQEA5QIAIecBAQDlAgAh7QECAI0DACHuARAAiwMAIQUcAADKBAAgHQAAzQQAIIkCAADLBAAgigIAAMwEACCPAgAABQAgBQYAANADACC7AQEAAAAB5wEBAAAAAe0BAgAAAAHuARAAAAABAxwAAMoEACCJAgAAywQAII8CAAAFACAGCQAA0gMAILsBAQAAAAG_AUAAAAAB4QEAAADwAQLpAQEAAAAB8AEQAAAAAQQcAADGAwAwiQIAAMcDADCLAgAAyQMAII8CAAClAwAwBgYAAN0DACC7AQEAAAABvwFAAAAAAeUBAgAAAAHmAQEAAAAB5wEBAAAAAQIAAAARACAcAADcAwAgAwAAABEAIBwAANwDACAdAADaAwAgARUAAMkEADACAAAAEQAgFQAA2gMAIAIAAACbAwAgFQAA2QMAIAW7AQEA5QIAIb8BQADmAgAh5QECAI0DACHmAQEA5QIAIecBAQDlAgAhBgYAANsDACC7AQEA5QIAIb8BQADmAgAh5QECAI0DACHmAQEA5QIAIecBAQDlAgAhBRwAAMQEACAdAADHBAAgiQIAAMUEACCKAgAAxgQAII8CAAAFACAGBgAA3QMAILsBAQAAAAG_AUAAAAAB5QECAAAAAeYBAQAAAAHnAQEAAAABAxwAAMQEACCJAgAAxQQAII8CAAAFACAMuwEBAAAAAb8BQAAAAAHAAUAAAAABzAEBAAAAAc0BAQAAAAHPAQEAAAAB0AEBAAAAAdEBAQAAAAHSAUAAAAAB0wFAAAAAAdQBAQAAAAHVAQEAAAABAgAAAA0AIBwAAOkDACADAAAADQAgHAAA6QMAIB0AAOgDACABFQAAwwQAMBEDAAC9AgAguAEAANoCADC5AQAACwAQugEAANoCADC7AQEAAAABvwFAAJgCACHAAUAAmAIAIcwBAQCXAgAhzQEBAJcCACHOAQEAlwIAIc8BAQCuAgAh0AEBAK4CACHRAQEArgIAIdIBQADbAgAh0wFAANsCACHUAQEArgIAIdUBAQCuAgAhAgAAAA0AIBUAAOgDACACAAAA5gMAIBUAAOcDACAQuAEAAOUDADC5AQAA5gMAELoBAADlAwAwuwEBAJcCACG_AUAAmAIAIcABQACYAgAhzAEBAJcCACHNAQEAlwIAIc4BAQCXAgAhzwEBAK4CACHQAQEArgIAIdEBAQCuAgAh0gFAANsCACHTAUAA2wIAIdQBAQCuAgAh1QEBAK4CACEQuAEAAOUDADC5AQAA5gMAELoBAADlAwAwuwEBAJcCACG_AUAAmAIAIcABQACYAgAhzAEBAJcCACHNAQEAlwIAIc4BAQCXAgAhzwEBAK4CACHQAQEArgIAIdEBAQCuAgAh0gFAANsCACHTAUAA2wIAIdQBAQCuAgAh1QEBAK4CACEMuwEBAOUCACG_AUAA5gIAIcABQADmAgAhzAEBAOUCACHNAQEA5QIAIc8BAQDrAgAh0AEBAOsCACHRAQEA6wIAIdIBQADsAgAh0wFAAOwCACHUAQEA6wIAIdUBAQDrAgAhDLsBAQDlAgAhvwFAAOYCACHAAUAA5gIAIcwBAQDlAgAhzQEBAOUCACHPAQEA6wIAIdABAQDrAgAh0QEBAOsCACHSAUAA7AIAIdMBQADsAgAh1AEBAOsCACHVAQEA6wIAIQy7AQEAAAABvwFAAAAAAcABQAAAAAHMAQEAAAABzQEBAAAAAc8BAQAAAAHQAQEAAAAB0QEBAAAAAdIBQAAAAAHTAUAAAAAB1AEBAAAAAdUBAQAAAAEHuwEBAAAAAb4BQAAAAAG_AUAAAAABwAFAAAAAAdYBAQAAAAHXAQEAAAAB2AEBAAAAAQIAAAAJACAcAAD1AwAgAwAAAAkAIBwAAPUDACAdAAD0AwAgARUAAMIEADAMAwAAvQIAILgBAADcAgAwuQEAAAcAELoBAADcAgAwuwEBAAAAAb4BQACYAgAhvwFAAJgCACHAAUAAmAIAIc4BAQCXAgAh1gEBAAAAAdcBAQCuAgAh2AEBAK4CACECAAAACQAgFQAA9AMAIAIAAADyAwAgFQAA8wMAIAu4AQAA8QMAMLkBAADyAwAQugEAAPEDADC7AQEAlwIAIb4BQACYAgAhvwFAAJgCACHAAUAAmAIAIc4BAQCXAgAh1gEBAJcCACHXAQEArgIAIdgBAQCuAgAhC7gBAADxAwAwuQEAAPIDABC6AQAA8QMAMLsBAQCXAgAhvgFAAJgCACG_AUAAmAIAIcABQACYAgAhzgEBAJcCACHWAQEAlwIAIdcBAQCuAgAh2AEBAK4CACEHuwEBAOUCACG-AUAA5gIAIb8BQADmAgAhwAFAAOYCACHWAQEA5QIAIdcBAQDrAgAh2AEBAOsCACEHuwEBAOUCACG-AUAA5gIAIb8BQADmAgAhwAFAAOYCACHWAQEA5QIAIdcBAQDrAgAh2AEBAOsCACEHuwEBAAAAAb4BQAAAAAG_AUAAAAABwAFAAAAAAdYBAQAAAAHXAQEAAAAB2AEBAAAAAQQcAADqAwAwiQIAAOsDADCLAgAA7QMAII8CAADuAwAwBBwAAN4DADCJAgAA3wMAMIsCAADhAwAgjwIAAOIDADAEHAAA0wMAMIkCAADUAwAwiwIAANYDACCPAgAAlwMAMAQcAAC5AwAwiQIAALoDADCLAgAAvAMAII8CAAC9AwAwAxwAALQDACCJAgAAtQMAII8CAACCAQAgBBwAAIADADCJAgAAgQMAMIsCAACDAwAgjwIAAIQDADAAAAAAAgMAAIwEACDoAQAA5wIAIAAAAAAAAAAAAAUcAAC9BAAgHQAAwAQAIIkCAAC-BAAgigIAAL8EACCPAgAAsAEAIAMcAAC9BAAgiQIAAL4EACCPAgAAsAEAIAgEAAD8AwAgBQAA_QMAIAcAAP4DACALAAD_AwAgDAAAgAQAIA0AAIEEACDcAQAA5wIAIN0BAADnAgAgAAAAAAAAAAAAAAUcAAC4BAAgHQAAuwQAIIkCAAC5BAAgigIAALoEACCPAgAAsAEAIAMcAAC4BAAgiQIAALkEACCPAgAAsAEAIAAAAAAABRwAALMEACAdAAC2BAAgiQIAALQEACCKAgAAtQQAII8CAACwAQAgAxwAALMEACCJAgAAtAQAII8CAACwAQAgAAAACxwAAKQEADAdAACoBAAwiQIAAKUEADCKAgAApgQAMIsCAACnBAAgjAIAAIQDADCNAgAAhAMAMI4CAACEAwAwjwIAAIQDADCQAgAAqQQAMJECAACHAwAwFwcAALMDACALAACyAwAgDgAAnwQAILsBAQAAAAG_AUAAAAABwAFAAAAAAdkBAQAAAAHcAQEAAAAB7gEQAAAAAfEBAQAAAAHzAQEAAAAB9AEBAAAAAfYBAAAA9gEC9wEBAAAAAfgBAQAAAAH5AQEAAAAB-gEQAAAAAfsBAgAAAAH8AQAAsAMAIP0BIAAAAAH-AUAAAAAB_wEBAAAAAYACAgAAAAECAAAABQAgHAAArAQAIAMAAAAFACAcAACsBAAgHQAAqwQAIAEVAACyBAAwAgAAAAUAIBUAAKsEACACAAAAiAMAIBUAAKoEACAUuwEBAOUCACG_AUAA5gIAIcABQADmAgAh2QEBAOUCACHcAQEA5QIAIe4BEACLAwAh8QEBAOUCACHzAQEA5QIAIfQBAQDrAgAh9gEAAIoD9gEi9wEBAOsCACH4AQEA5QIAIfkBAQDlAgAh-gEQAIwDACH7AQIAjQMAIfwBAACOAwAg_QEgAPcCACH-AUAA7AIAIf8BAQDrAgAhgAICAI0DACEXBwAAkgMAIAsAAJEDACAOAACeBAAguwEBAOUCACG_AUAA5gIAIcABQADmAgAh2QEBAOUCACHcAQEA5QIAIe4BEACLAwAh8QEBAOUCACHzAQEA5QIAIfQBAQDrAgAh9gEAAIoD9gEi9wEBAOsCACH4AQEA5QIAIfkBAQDlAgAh-gEQAIwDACH7AQIAjQMAIfwBAACOAwAg_QEgAPcCACH-AUAA7AIAIf8BAQDrAgAhgAICAI0DACEXBwAAswMAIAsAALIDACAOAACfBAAguwEBAAAAAb8BQAAAAAHAAUAAAAAB2QEBAAAAAdwBAQAAAAHuARAAAAAB8QEBAAAAAfMBAQAAAAH0AQEAAAAB9gEAAAD2AQL3AQEAAAAB-AEBAAAAAfkBAQAAAAH6ARAAAAAB-wECAAAAAfwBAACwAwAg_QEgAAAAAf4BQAAAAAH_AQEAAAABgAICAAAAAQQcAACkBAAwiQIAAKUEADCLAgAApwQAII8CAACEAwAwAgMAAIwEACAJAACwBAAgCQcAAP4DACALAACwBAAgDgAAjAQAIA8AALEEACD0AQAA5wIAIPcBAADnAgAg-gEAAOcCACD-AQAA5wIAIP8BAADnAgAgAAMNAACBBAAg3AEAAOcCACD4AQAA5wIAIBS7AQEAAAABvwFAAAAAAcABQAAAAAHZAQEAAAAB3AEBAAAAAe4BEAAAAAHxAQEAAAAB8wEBAAAAAfQBAQAAAAH2AQAAAPYBAvcBAQAAAAH4AQEAAAAB-QEBAAAAAfoBEAAAAAH7AQIAAAAB_AEAALADACD9ASAAAAAB_gFAAAAAAf8BAQAAAAGAAgIAAAABDwQAAPYDACAFAAD3AwAgBwAA-AMAIAsAAPkDACAMAAD6AwAguwEBAAAAAb8BQAAAAAHAAUAAAAAB2QEBAAAAAdoBAQAAAAHbASAAAAAB3AEBAAAAAd0BAQAAAAHfAQAAAN8BAuEBAAAA4QECAgAAALABACAcAACzBAAgAwAAALMBACAcAACzBAAgHQAAtwQAIBEAAACzAQAgBAAA-gIAIAUAAPsCACAHAAD8AgAgCwAA_QIAIAwAAP4CACAVAAC3BAAguwEBAOUCACG_AUAA5gIAIcABQADmAgAh2QEBAOUCACHaAQEA5QIAIdsBIAD3AgAh3AEBAOsCACHdAQEA6wIAId8BAAD4At8BIuEBAAD5AuEBIg8EAAD6AgAgBQAA-wIAIAcAAPwCACALAAD9AgAgDAAA_gIAILsBAQDlAgAhvwFAAOYCACHAAUAA5gIAIdkBAQDlAgAh2gEBAOUCACHbASAA9wIAIdwBAQDrAgAh3QEBAOsCACHfAQAA-ALfASLhAQAA-QLhASIPBAAA9gMAIAUAAPcDACAHAAD4AwAgDAAA-gMAIA0AAPsDACC7AQEAAAABvwFAAAAAAcABQAAAAAHZAQEAAAAB2gEBAAAAAdsBIAAAAAHcAQEAAAAB3QEBAAAAAd8BAAAA3wEC4QEAAADhAQICAAAAsAEAIBwAALgEACADAAAAswEAIBwAALgEACAdAAC8BAAgEQAAALMBACAEAAD6AgAgBQAA-wIAIAcAAPwCACAMAAD-AgAgDQAA_wIAIBUAALwEACC7AQEA5QIAIb8BQADmAgAhwAFAAOYCACHZAQEA5QIAIdoBAQDlAgAh2wEgAPcCACHcAQEA6wIAId0BAQDrAgAh3wEAAPgC3wEi4QEAAPkC4QEiDwQAAPoCACAFAAD7AgAgBwAA_AIAIAwAAP4CACANAAD_AgAguwEBAOUCACG_AUAA5gIAIcABQADmAgAh2QEBAOUCACHaAQEA5QIAIdsBIAD3AgAh3AEBAOsCACHdAQEA6wIAId8BAAD4At8BIuEBAAD5AuEBIg8EAAD2AwAgBQAA9wMAIAcAAPgDACALAAD5AwAgDQAA-wMAILsBAQAAAAG_AUAAAAABwAFAAAAAAdkBAQAAAAHaAQEAAAAB2wEgAAAAAdwBAQAAAAHdAQEAAAAB3wEAAADfAQLhAQAAAOEBAgIAAACwAQAgHAAAvQQAIAMAAACzAQAgHAAAvQQAIB0AAMEEACARAAAAswEAIAQAAPoCACAFAAD7AgAgBwAA_AIAIAsAAP0CACANAAD_AgAgFQAAwQQAILsBAQDlAgAhvwFAAOYCACHAAUAA5gIAIdkBAQDlAgAh2gEBAOUCACHbASAA9wIAIdwBAQDrAgAh3QEBAOsCACHfAQAA-ALfASLhAQAA-QLhASIPBAAA-gIAIAUAAPsCACAHAAD8AgAgCwAA_QIAIA0AAP8CACC7AQEA5QIAIb8BQADmAgAhwAFAAOYCACHZAQEA5QIAIdoBAQDlAgAh2wEgAPcCACHcAQEA6wIAId0BAQDrAgAh3wEAAPgC3wEi4QEAAPkC4QEiB7sBAQAAAAG-AUAAAAABvwFAAAAAAcABQAAAAAHWAQEAAAAB1wEBAAAAAdgBAQAAAAEMuwEBAAAAAb8BQAAAAAHAAUAAAAABzAEBAAAAAc0BAQAAAAHPAQEAAAAB0AEBAAAAAdEBAQAAAAHSAUAAAAAB0wFAAAAAAdQBAQAAAAHVAQEAAAABGAsAALIDACAOAACfBAAgDwAAsQMAILsBAQAAAAG_AUAAAAABwAFAAAAAAdkBAQAAAAHcAQEAAAAB7gEQAAAAAfEBAQAAAAHyAQEAAAAB8wEBAAAAAfQBAQAAAAH2AQAAAPYBAvcBAQAAAAH4AQEAAAAB-QEBAAAAAfoBEAAAAAH7AQIAAAAB_AEAALADACD9ASAAAAAB_gFAAAAAAf8BAQAAAAGAAgIAAAABAgAAAAUAIBwAAMQEACADAAAAAwAgHAAAxAQAIB0AAMgEACAaAAAAAwAgCwAAkQMAIA4AAJ4EACAPAACQAwAgFQAAyAQAILsBAQDlAgAhvwFAAOYCACHAAUAA5gIAIdkBAQDlAgAh3AEBAOUCACHuARAAiwMAIfEBAQDlAgAh8gEBAOUCACHzAQEA5QIAIfQBAQDrAgAh9gEAAIoD9gEi9wEBAOsCACH4AQEA5QIAIfkBAQDlAgAh-gEQAIwDACH7AQIAjQMAIfwBAACOAwAg_QEgAPcCACH-AUAA7AIAIf8BAQDrAgAhgAICAI0DACEYCwAAkQMAIA4AAJ4EACAPAACQAwAguwEBAOUCACG_AUAA5gIAIcABQADmAgAh2QEBAOUCACHcAQEA5QIAIe4BEACLAwAh8QEBAOUCACHyAQEA5QIAIfMBAQDlAgAh9AEBAOsCACH2AQAAigP2ASL3AQEA6wIAIfgBAQDlAgAh-QEBAOUCACH6ARAAjAMAIfsBAgCNAwAh_AEAAI4DACD9ASAA9wIAIf4BQADsAgAh_wEBAOsCACGAAgIAjQMAIQW7AQEAAAABvwFAAAAAAeUBAgAAAAHmAQEAAAAB5wEBAAAAARgHAACzAwAgDgAAnwQAIA8AALEDACC7AQEAAAABvwFAAAAAAcABQAAAAAHZAQEAAAAB3AEBAAAAAe4BEAAAAAHxAQEAAAAB8gEBAAAAAfMBAQAAAAH0AQEAAAAB9gEAAAD2AQL3AQEAAAAB-AEBAAAAAfkBAQAAAAH6ARAAAAAB-wECAAAAAfwBAACwAwAg_QEgAAAAAf4BQAAAAAH_AQEAAAABgAICAAAAAQIAAAAFACAcAADKBAAgAwAAAAMAIBwAAMoEACAdAADOBAAgGgAAAAMAIAcAAJIDACAOAACeBAAgDwAAkAMAIBUAAM4EACC7AQEA5QIAIb8BQADmAgAhwAFAAOYCACHZAQEA5QIAIdwBAQDlAgAh7gEQAIsDACHxAQEA5QIAIfIBAQDlAgAh8wEBAOUCACH0AQEA6wIAIfYBAACKA_YBIvcBAQDrAgAh-AEBAOUCACH5AQEA5QIAIfoBEACMAwAh-wECAI0DACH8AQAAjgMAIP0BIAD3AgAh_gFAAOwCACH_AQEA6wIAIYACAgCNAwAhGAcAAJIDACAOAACeBAAgDwAAkAMAILsBAQDlAgAhvwFAAOYCACHAAUAA5gIAIdkBAQDlAgAh3AEBAOUCACHuARAAiwMAIfEBAQDlAgAh8gEBAOUCACHzAQEA5QIAIfQBAQDrAgAh9gEAAIoD9gEi9wEBAOsCACH4AQEA5QIAIfkBAQDlAgAh-gEQAIwDACH7AQIAjQMAIfwBAACOAwAg_QEgAPcCACH-AUAA7AIAIf8BAQDrAgAhgAICAI0DACEEuwEBAAAAAecBAQAAAAHtAQIAAAAB7gEQAAAAAQW7AQEAAAABvwFAAAAAAeEBAAAA8AEC6QEBAAAAAfABEAAAAAEHuwEBAAAAAb8BQAAAAAHAAUAAAAAB2QEBAAAAAdwBAQAAAAH4AQEAAAABhAIBAAAAAQIAAAABACAcAADRBAAgBwMAAJgEACC7AQEAAAABvwFAAAAAAc4BAQAAAAHhAQAAAPABAukBAQAAAAHwARAAAAABAgAAABUAIBwAANMEACADAAAAEwAgHAAA0wQAIB0AANcEACAJAAAAEwAgAwAAlwQAIBUAANcEACC7AQEA5QIAIb8BQADmAgAhzgEBAOUCACHhAQAAwwPwASLpAQEA5QIAIfABEACLAwAhBwMAAJcEACC7AQEA5QIAIb8BQADmAgAhzgEBAOUCACHhAQAAwwPwASLpAQEA5QIAIfABEACLAwAhBLsBAQAAAAHsAQEAAAAB7QECAAAAAe4BEAAAAAEPBAAA9gMAIAUAAPcDACALAAD5AwAgDAAA-gMAIA0AAPsDACC7AQEAAAABvwFAAAAAAcABQAAAAAHZAQEAAAAB2gEBAAAAAdsBIAAAAAHcAQEAAAAB3QEBAAAAAd8BAAAA3wEC4QEAAADhAQICAAAAsAEAIBwAANkEACADAAAAswEAIBwAANkEACAdAADdBAAgEQAAALMBACAEAAD6AgAgBQAA-wIAIAsAAP0CACAMAAD-AgAgDQAA_wIAIBUAAN0EACC7AQEA5QIAIb8BQADmAgAhwAFAAOYCACHZAQEA5QIAIdoBAQDlAgAh2wEgAPcCACHcAQEA6wIAId0BAQDrAgAh3wEAAPgC3wEi4QEAAPkC4QEiDwQAAPoCACAFAAD7AgAgCwAA_QIAIAwAAP4CACANAAD_AgAguwEBAOUCACG_AUAA5gIAIcABQADmAgAh2QEBAOUCACHaAQEA5QIAIdsBIAD3AgAh3AEBAOsCACHdAQEA6wIAId8BAAD4At8BIuEBAAD5AuEBIgW7AQEAAAABvwFAAAAAAc4BAQAAAAHlAQIAAAAB5gEBAAAAAQMAAAAqACAcAADRBAAgHQAA4QQAIAkAAAAqACAVAADhBAAguwEBAOUCACG_AUAA5gIAIcABQADmAgAh2QEBAOUCACHcAQEA6wIAIfgBAQDrAgAhhAIBAOUCACEHuwEBAOUCACG_AUAA5gIAIcABQADmAgAh2QEBAOUCACHcAQEA6wIAIfgBAQDrAgAhhAIBAOUCACEUuwEBAAAAAb8BQAAAAAHAAUAAAAAB2QEBAAAAAdwBAQAAAAHuARAAAAAB8gEBAAAAAfMBAQAAAAH0AQEAAAAB9gEAAAD2AQL3AQEAAAAB-AEBAAAAAfkBAQAAAAH6ARAAAAAB-wECAAAAAfwBAACwAwAg_QEgAAAAAf4BQAAAAAH_AQEAAAABgAICAAAAAQ8FAAD3AwAgBwAA-AMAIAsAAPkDACAMAAD6AwAgDQAA-wMAILsBAQAAAAG_AUAAAAABwAFAAAAAAdkBAQAAAAHaAQEAAAAB2wEgAAAAAdwBAQAAAAHdAQEAAAAB3wEAAADfAQLhAQAAAOEBAgIAAACwAQAgHAAA4wQAIAMAAACzAQAgHAAA4wQAIB0AAOcEACARAAAAswEAIAUAAPsCACAHAAD8AgAgCwAA_QIAIAwAAP4CACANAAD_AgAgFQAA5wQAILsBAQDlAgAhvwFAAOYCACHAAUAA5gIAIdkBAQDlAgAh2gEBAOUCACHbASAA9wIAIdwBAQDrAgAh3QEBAOsCACHfAQAA-ALfASLhAQAA-QLhASIPBQAA-wIAIAcAAPwCACALAAD9AgAgDAAA_gIAIA0AAP8CACC7AQEA5QIAIb8BQADmAgAhwAFAAOYCACHZAQEA5QIAIdoBAQDlAgAh2wEgAPcCACHcAQEA6wIAId0BAQDrAgAh3wEAAPgC3wEi4QEAAPkC4QEiDwQAAPYDACAHAAD4AwAgCwAA-QMAIAwAAPoDACANAAD7AwAguwEBAAAAAb8BQAAAAAHAAUAAAAAB2QEBAAAAAdoBAQAAAAHbASAAAAAB3AEBAAAAAd0BAQAAAAHfAQAAAN8BAuEBAAAA4QECAgAAALABACAcAADoBAAgAwAAALMBACAcAADoBAAgHQAA7AQAIBEAAACzAQAgBAAA-gIAIAcAAPwCACALAAD9AgAgDAAA_gIAIA0AAP8CACAVAADsBAAguwEBAOUCACG_AUAA5gIAIcABQADmAgAh2QEBAOUCACHaAQEA5QIAIdsBIAD3AgAh3AEBAOsCACHdAQEA6wIAId8BAAD4At8BIuEBAAD5AuEBIg8EAAD6AgAgBwAA_AIAIAsAAP0CACAMAAD-AgAgDQAA_wIAILsBAQDlAgAhvwFAAOYCACHAAUAA5gIAIdkBAQDlAgAh2gEBAOUCACHbASAA9wIAIdwBAQDrAgAh3QEBAOsCACHfAQAA-ALfASLhAQAA-QLhASICCgANDQYCBQclBgoADAskCA4AAw8AAQcECgQFDgUHEgYKAAsLFgcMHQoNHgIBAwADAQMAAwIDAAMGAAIDAwADCRoICgAJAgYAAggABwEJGwABAwADBQQfAAUgAAchAAsiAA0jAAIHJwALJgABDSgAAAAAAwoAEiIAEyMAFAAAAAMKABIiABMjABQCDgADDwABAg4AAw8AAQUKABkiABwjAB00ABo1ABsAAAAAAAUKABkiABwjAB00ABo1ABsBAwADAQMAAwUKACIiACUjACY0ACM1ACQAAAAAAAUKACIiACUjACY0ACM1ACQCBgACCAAHAgYAAggABwUKACsiAC4jAC80ACw1AC0AAAAAAAUKACsiAC4jAC80ACw1AC0BAwADAQMAAwMKADQiADUjADYAAAADCgA0IgA1IwA2AgMAAwYAAgIDAAMGAAIFCgA7IgA-IwA_NAA8NQA9AAAAAAAFCgA7IgA-IwA_NAA8NQA9AAADCgBEIgBFIwBGAAAAAwoARCIARSMARgEDAAMBAwADAwoASyIATCMATQAAAAMKAEsiAEwjAE0BAwADAQMAAwMKAFIiAFMjAFQAAAADCgBSIgBTIwBUAAAAAwoAWiIAWyMAXAAAAAMKAFoiAFsjAFwQAgERKQESLAETLQEULgEWMAEXMg4YMw8ZNQEaNw4bOBAeOQEfOgEgOw4kPhElPxUmQAInQQIoQgIpQwIqRAIrRgIsSA4tSRYuSwIvTQ4wThcxTwIyUAIzUQ42VBg3VR44Vgc5Vwc6WAc7WQc8Wgc9XAc-Xg4_Xx9AYQdBYw5CZCBDZQdEZgdFZw5GaiFHaydIbAhJbQhKbghLbwhMcAhNcghOdA5PdShQdwhReQ5SeilTewhUfAhVfQ5WgAEqV4EBMFiDAQpZhAEKWoYBCluHAQpciAEKXYoBCl6MAQ5fjQExYI8BCmGRAQ5ikgEyY5MBCmSUAQpllQEOZpgBM2eZATdomgEGaZsBBmqcAQZrnQEGbJ4BBm2gAQZuogEOb6MBOHClAQZxpwEOcqgBOXOpAQZ0qgEGdasBDnauATp3rwFAeLEBA3myAQN6tQEDe7YBA3y3AQN9uQEDfrsBDn-8AUGAAb4BA4EBwAEOggHBAUKDAcIBA4QBwwEDhQHEAQ6GAccBQ4cByAFHiAHJAQSJAcoBBIoBywEEiwHMAQSMAc0BBI0BzwEEjgHRAQ6PAdIBSJAB1AEEkQHWAQ6SAdcBSZMB2AEElAHZAQSVAdoBDpYB3QFKlwHeAU6YAd8BBZkB4AEFmgHhAQWbAeIBBZwB4wEFnQHlAQWeAecBDp8B6AFPoAHqAQWhAewBDqIB7QFQowHuAQWkAe8BBaUB8AEOpgHzAVGnAfQBVagB9gFWqQH3AVaqAfoBVqsB-wFWrAH8AVatAf4BVq4BgAIOrwGBAlewAYMCVrEBhQIOsgGGAlizAYcCVrQBiAJWtQGJAg62AYwCWbcBjQJd"
};
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

// src/generated/prisma/internal/prismaNamespace.ts
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

// src/generated/prisma/client.ts
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
  trustedOrigins: [
    process.env.APP_URL,
    "http://localhost:3000",
    "http://localhost:3001"
  ],
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
    enabled: true
    // requireEmailVerification:true
  },
  socialProviders: {
    google: {
      prompt: "select_account",
      accessType: "offline",
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60
      // 5 minutes
    }
  },
  advanced: {
    cookiePrefix: "better-auth",
    useSecureCookies: process.env.NODE_ENV === "production",
    crossSubDomainCookies: {
      enabled: false
    },
    disableCSRFCheck: true
    // Allow requests without Origin header (Postman, mobile apps, etc.)
  }
});

// src/modules/medicine/medicineRoute.ts
import { Router } from "express";

// src/config/query.config.ts
var medicinesSearchableFields = ["name", "genericName", "group", "category.name", "tags"];
var medicinesFilterableFields = ["categoryId", "sellerId", "isPrescriptionRequired", "price", "discountPrice"];
var medicinesIncludeConfig = {
  category: {
    select: {
      id: true,
      name: true,
      slug: true
    }
  },
  seller: {
    select: {
      id: true,
      name: true,
      email: true
    }
  },
  reviews: {
    select: {
      id: true,
      rating: true,
      comment: true,
      user: {
        select: {
          name: true,
          image: true
        }
      }
    }
  },
  orders: true
};
var userSearchableFields = ["name", "email"];
var userFilterableFields = ["role", "status"];
var userIncludeConfig = {
  profile: true,
  sessions: {
    select: {
      id: true,
      createdAt: true
    }
  },
  medicines: {
    select: {
      id: true,
      name: true,
      price: true
    }
  }
};

// src/utils/QueryBuilder.ts
var QueryBuilder = class {
  constructor(model, queryParams, config2 = {}) {
    this.model = model;
    this.queryParams = queryParams;
    this.config = config2;
    this.query = {
      where: {},
      include: {},
      orderBy: {},
      skip: 0,
      take: 10
    };
    this.countQuery = {
      where: {}
    };
  }
  model;
  queryParams;
  config;
  query;
  countQuery;
  page = 1;
  limit = 10;
  skip = 0;
  sortBy = "createdAt";
  sortOrder = "desc";
  selectFields;
  search() {
    const { searchTerm } = this.queryParams;
    const { searchableFields } = this.config;
    if (searchTerm && searchableFields && searchableFields.length > 0) {
      const searchConditions = searchableFields.map(
        (field) => {
          if (field.includes(".")) {
            const parts = field.split(".");
            if (parts.length === 2) {
              const [relation, nestedField] = parts;
              const stringFilter2 = {
                contains: searchTerm,
                mode: "insensitive"
              };
              return {
                [relation]: {
                  [nestedField]: stringFilter2
                }
              };
            } else if (parts.length === 3) {
              const [relation, nestedRelation, nestedField] = parts;
              const stringFilter2 = {
                contains: searchTerm,
                mode: "insensitive"
              };
              return {
                [relation]: {
                  some: {
                    [nestedRelation]: {
                      [nestedField]: stringFilter2
                    }
                  }
                }
              };
            }
          }
          const stringFilter = {
            contains: searchTerm,
            mode: "insensitive"
          };
          return {
            [field]: stringFilter
          };
        }
      );
      const whereConditions = this.query.where;
      whereConditions.OR = searchConditions;
      const countWhereConditions = this.countQuery.where;
      countWhereConditions.OR = searchConditions;
    }
    return this;
  }
  filter() {
    const { filterableFields } = this.config;
    const excludedField = [
      "searchTerm",
      "page",
      "limit",
      "sortBy",
      "sortOrder",
      "fields",
      "include"
    ];
    const filterParams = {};
    Object.keys(this.queryParams).forEach((key) => {
      if (!excludedField.includes(key)) {
        filterParams[key] = this.queryParams[key];
      }
    });
    const queryWhere = this.query.where;
    const countQueryWhere = this.countQuery.where;
    Object.keys(filterParams).forEach((key) => {
      const value = filterParams[key];
      if (value === void 0 || value === "") {
        return;
      }
      const isAllowedField = !filterableFields || filterableFields.length === 0 || filterableFields.includes(key);
      if (key.includes(".")) {
        const parts = key.split(".");
        if (filterableFields && !filterableFields.includes(key)) {
          return;
        }
        if (parts.length === 2) {
          const [relation, nestedField] = parts;
          if (!queryWhere[relation]) {
            queryWhere[relation] = {};
            countQueryWhere[relation] = {};
          }
          const queryRelation = queryWhere[relation];
          const countRelation = countQueryWhere[relation];
          queryRelation[nestedField] = this.parseFilterValue(value);
          countRelation[nestedField] = this.parseFilterValue(value);
          return;
        } else if (parts.length === 3) {
          const [relation, nestedRelation, nestedField] = parts;
          if (!queryWhere[relation]) {
            queryWhere[relation] = {
              some: {}
            };
            countQueryWhere[relation] = {
              some: {}
            };
          }
          const queryRelation = queryWhere[relation];
          const countRelation = countQueryWhere[relation];
          if (!queryRelation.some) {
            queryRelation.some = {};
          }
          if (!countRelation.some) {
            countRelation.some = {};
          }
          const querySome = queryRelation.some;
          const countSome = countRelation.some;
          if (!querySome[nestedRelation]) {
            querySome[nestedRelation] = {};
          }
          if (!countSome[nestedRelation]) {
            countSome[nestedRelation] = {};
          }
          const queryNestedRelation = querySome[nestedRelation];
          const countNestedRelation = countSome[nestedRelation];
          queryNestedRelation[nestedField] = this.parseFilterValue(value);
          countNestedRelation[nestedField] = this.parseFilterValue(value);
          return;
        }
      }
      if (!isAllowedField) {
        return;
      }
      if (typeof value === "object" && value !== null && !Array.isArray(value)) {
        queryWhere[key] = this.parseRangeFilter(
          value
        );
        countQueryWhere[key] = this.parseRangeFilter(
          value
        );
        return;
      }
      queryWhere[key] = this.parseFilterValue(value);
      countQueryWhere[key] = this.parseFilterValue(value);
    });
    return this;
  }
  paginate() {
    const page = Number(this.queryParams.page) || 1;
    const limit = Number(this.queryParams.limit) || 10;
    this.page = page;
    this.limit = limit;
    this.skip = (page - 1) * limit;
    this.query.skip = this.skip;
    this.query.take = this.limit;
    return this;
  }
  sort() {
    const sortBy = this.queryParams.sortBy || "createdAt";
    const sortOrder = this.queryParams.sortOrder === "asc" ? "asc" : "desc";
    this.sortBy = sortBy;
    this.sortOrder = sortOrder;
    if (sortBy.includes(".")) {
      const parts = sortBy.split(".");
      if (parts.length === 2) {
        const [relation, nestedField] = parts;
        this.query.orderBy = {
          [relation]: {
            [nestedField]: sortOrder
          }
        };
      } else if (parts.length === 3) {
        const [relation, nestedRelation, nestedField] = parts;
        this.query.orderBy = {
          [relation]: {
            [nestedRelation]: {
              [nestedField]: sortOrder
            }
          }
        };
      } else {
        this.query.orderBy = {
          [sortBy]: sortOrder
        };
      }
    } else {
      this.query.orderBy = {
        [sortBy]: sortOrder
      };
    }
    return this;
  }
  fields() {
    const fieldsParam = this.queryParams.fields;
    if (fieldsParam && typeof fieldsParam === "string") {
      const fieldsArray = fieldsParam?.split(",").map((field) => field.trim());
      this.selectFields = {};
      fieldsArray?.forEach((field) => {
        if (this.selectFields) {
          this.selectFields[field] = true;
        }
      });
      this.query.select = this.selectFields;
      delete this.query.include;
    }
    return this;
  }
  include(relation) {
    if (this.selectFields) {
      return this;
    }
    this.query.include = {
      ...this.query.include,
      ...relation
    };
    return this;
  }
  dynamicInclude(includeConfig, defaultInclude) {
    if (this.selectFields) {
      return this;
    }
    const result = {};
    defaultInclude?.forEach((field) => {
      if (includeConfig[field]) {
        result[field] = includeConfig[field];
      }
    });
    const includeParam = this.queryParams.include;
    if (includeParam && typeof includeParam === "string") {
      const requestedRelations = includeParam.split(",").map((relation) => relation.trim());
      requestedRelations.forEach((relation) => {
        if (includeConfig[relation]) {
          result[relation] = includeConfig[relation];
        }
      });
    }
    this.query.include = {
      ...this.query.include,
      ...result
    };
    return this;
  }
  where(condition) {
    this.query.where = this.deepMerge(
      this.query.where,
      condition
    );
    this.countQuery.where = this.deepMerge(
      this.countQuery.where,
      condition
    );
    return this;
  }
  async execute() {
    const [total, data] = await Promise.all([
      this.model.count(
        this.countQuery
      ),
      this.model.findMany(
        this.query
      )
    ]);
    const totalPages = Math.ceil(total / this.limit);
    return {
      data,
      meta: {
        page: this.page,
        limit: this.limit,
        total,
        totalPages
      }
    };
  }
  async count() {
    return await this.model.count(
      this.countQuery
    );
  }
  getQuery() {
    return this.query;
  }
  deepMerge(target, source) {
    const result = { ...target };
    for (const key in source) {
      if (source[key] && typeof source[key] === "object" && !Array.isArray(source[key])) {
        if (result[key] && typeof result[key] === "object" && !Array.isArray(result[key])) {
          result[key] = this.deepMerge(
            result[key],
            source[key]
          );
        } else {
          result[key] = source[key];
        }
      } else {
        result[key] = source[key];
      }
    }
    return result;
  }
  parseFilterValue(value) {
    if (value === "true") {
      return true;
    }
    if (value === "false") {
      return false;
    }
    if (typeof value === "string" && !isNaN(Number(value)) && value != "") {
      return Number(value);
    }
    if (Array.isArray(value)) {
      return { in: value.map((item) => this.parseFilterValue(item)) };
    }
    return value;
  }
  parseRangeFilter(value) {
    const rangeQuery = {};
    Object.keys(value).forEach((operator) => {
      const operatorValue = value[operator];
      const parsedValue = typeof operatorValue === "string" && !isNaN(Number(operatorValue)) ? Number(operatorValue) : operatorValue;
      switch (operator) {
        case "lt":
        case "lte":
        case "gt":
        case "gte":
        case "equals":
        case "not":
        case "contains":
        case "startsWith":
        case "endsWith":
          rangeQuery[operator] = parsedValue;
          break;
        case "in":
        case "notIn":
          if (Array.isArray(operatorValue)) {
            rangeQuery[operator] = operatorValue;
          } else {
            rangeQuery[operator] = [parsedValue];
          }
          break;
        default:
          break;
      }
    });
    return Object.keys(rangeQuery).length > 0 ? rangeQuery : value;
  }
};

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
var getMedicineService = async (query) => {
  const queryBuilder = new QueryBuilder(prisma.medicine, query, {
    searchableFields: medicinesSearchableFields,
    filterableFields: medicinesFilterableFields
  });
  const result = await queryBuilder.search().filter().dynamicInclude(medicinesIncludeConfig).paginate().sort().fields().execute();
  return result;
};
var getMedicineByIdService = async (medicineId) => {
  const result = await prisma.medicine.findUnique({
    where: { id: medicineId },
    include: { category: true }
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

// src/shared/SendResponse.ts
var sendResponse = (res, responseData) => {
  const { httpStatusCode, success, message, data, meta } = responseData;
  res.status(httpStatusCode).json({
    success,
    message,
    data,
    meta
  });
};

// src/errorHelpers/AppError.ts
var AppError = class extends Error {
  statusCode;
  constructor(statusCode, message, stack = "") {
    super(message);
    this.statusCode = statusCode;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
};
var AppError_default = AppError;

// src/shared/catchAsync.ts
var catchAsync = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      console.log(error);
      const statusCode = error instanceof AppError_default ? error.statusCode : 500;
      res.status(statusCode).json({
        success: false,
        message: error.message || "Something went wrong"
      });
    }
  };
};

// src/modules/medicine/medicineController.ts
var createMedicineController = catchAsync(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new Error("Unauthorized");
  }
  const result = await createMedicineService(req.body, user.id, req.body.categoryId);
  sendResponse(res, {
    httpStatusCode: 201,
    success: true,
    message: "Medicine created successfully",
    data: result
  });
});
var getMedicine = catchAsync(async (req, res) => {
  const query = {
    searchTerm: req.query.searchTerm,
    page: req.query.page,
    limit: req.query.limit,
    sortBy: req.query.sortBy,
    sortOrder: req.query.sortOrder || "desc",
    fields: req.query.fields,
    includes: req.query.includes
  };
  const result = await getMedicineService(query);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Medicines fetched successfully",
    data: result.data,
    meta: result.meta
  });
});
var getMedicineById = catchAsync(async (req, res) => {
  const medicineId = req.params.medicineId;
  const result = await getMedicineByIdService(medicineId);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Medicine fetched successfully",
    data: result
  });
});
var updateMedicine = catchAsync(async (req, res) => {
  const medicineId = req.params.medicineId;
  const result = await updateMedicineService(medicineId, req.body, req.user?.id);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Medicine updated successfully",
    data: result
  });
});
var deleteMedicine = catchAsync(async (req, res) => {
  const medicineId = req.params.medicineId;
  const user = req.user;
  if (!user) {
    throw new Error("Unauthorized");
  }
  const isAdmin = user.role === "ADMIN" /* ADMIN */;
  const result = await deleteMedicineService(medicineId, isAdmin, user.id);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Medicine deleted successfully",
    data: result
  });
});

// src/modules/medicine/medicineRoute.ts
var router = Router();
router.get("/", getMedicine);
router.get("/:medicineId", getMedicineById);
router.post("/", middleware_default("ADMIN" /* ADMIN */, "SELLER" /* SELLER */), createMedicineController);
router.patch("/:medicineId", middleware_default("ADMIN" /* ADMIN */, "SELLER" /* SELLER */), updateMedicine);
router.delete("/:medicineId", middleware_default("ADMIN" /* ADMIN */, "SELLER" /* SELLER */), deleteMedicine);
var medicineRouter = router;

// src/modules/orders/ordersRoute.ts
import { Router as Router2 } from "express";

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
var getAllUserOrderService = async (userId, queryParams) => {
  const builder = new QueryBuilder(
    prisma.order,
    queryParams,
    {
      searchableFields: ["address"],
      filterableFields: ["status"]
    }
  );
  return builder.search().filter().where({ userId }).paginate().sort().include({
    items: {
      select: {
        quantity: true,
        price: true,
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
  }).execute();
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
var CreateOrders = catchAsync(async (req, res) => {
  const user = req.user;
  const data = req.body;
  const result = await CreateOrderService(data, user?.id);
  sendResponse(res, {
    httpStatusCode: 201,
    success: true,
    message: "Order created successfully",
    data: result
  });
});
var getMyOrders = catchAsync(async (req, res) => {
  const user = req?.user;
  const query = {
    searchTerm: req.query.searchTerm,
    page: req.query.page,
    limit: req.query.limit,
    sortBy: req.query.sortBy,
    sortOrder: req.query.sortOrder || "desc",
    fields: req.query.fields,
    includes: req.query.includes
  };
  const result = await getAllUserOrderService(user?.id, query);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Orders fetched successfully",
    data: result.data,
    meta: result.meta
  });
});
var getOrderById = catchAsync(async (req, res) => {
  const orderId = req.params.orderId;
  const user = req.user;
  if (!user) {
    throw new AppError_default(401, "Unauthorized");
  }
  const result = await getOrderByIdService(orderId, user.id);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Order fetched successfully",
    data: result
  });
});
var updateOrder = catchAsync(async (req, res) => {
  const orderId = req.params.orderId;
  const status = req.body.status;
  const result = await updateOrderStatus(orderId, status);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Order updated successfully",
    data: result
  });
});

// src/modules/orders/ordersRoute.ts
var router2 = Router2();
router2.post("/", middleware_default("CUSTOMER" /* CUSTOMER */), CreateOrders);
router2.get("/:orderId", middleware_default("CUSTOMER" /* CUSTOMER */), getOrderById);
router2.patch("/:orderId/seller", middleware_default("SELLER" /* SELLER */), updateOrder);

// src/modules/review/reviewRoute.ts
import { Router as Router3 } from "express";

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
var getReviewsService = async (queryParams = {}) => {
  const builder = new QueryBuilder(
    prisma.review,
    queryParams,
    {
      searchableFields: ["comment", "user.name", "user.email"],
      filterableFields: ["rating", "medicineId", "userId"]
    }
  );
  return builder.search().filter().paginate().sort().include({
    user: {
      select: {
        name: true,
        email: true,
        emailVerified: true,
        image: true
      }
    },
    medicine: {
      select: {
        name: true,
        genericName: true,
        image: true
      }
    }
  }).execute();
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
  return await prisma.review.delete({
    where: { id: reviewId }
  });
};

// src/modules/review/reviewController.ts
var createReview = catchAsync(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new AppError_default(401, "Unauthorized");
  }
  const result = await createReviewService(req.body, user.id);
  sendResponse(res, {
    httpStatusCode: 201,
    success: true,
    message: "Review created successfully",
    data: result
  });
});
var getReviews = catchAsync(async (req, res) => {
  const queryParams = {
    ...req.query
  };
  if (req.query.search && typeof req.query.search === "string") {
    queryParams.searchTerm = req.query.search;
    delete queryParams.search;
  }
  const result = await getReviewsService(queryParams);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Reviews fetched successfully",
    data: result.data,
    meta: result.meta
  });
});
var updateReview = catchAsync(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new AppError_default(401, "Unauthorized");
  }
  const { reviewId } = req.params;
  const result = await updateReviewByUser(user.id, req.body, reviewId);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Review updated successfully",
    data: result
  });
});
var deleteReview = catchAsync(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new AppError_default(401, "Unauthorized");
  }
  const { reviewId } = req.params;
  const deletedReview = await deleteReviewByAdmin(reviewId);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Review deleted successfully",
    data: deletedReview
  });
});

// src/modules/review/reviewRoute.ts
var router3 = Router3();
router3.get("/", getReviews);
router3.post("/create", middleware_default("CUSTOMER" /* CUSTOMER */), createReview);
router3.patch("/:reviewId", middleware_default("CUSTOMER" /* CUSTOMER */), updateReview);
router3.delete("/:reviewId", middleware_default("ADMIN" /* ADMIN */), deleteReview);

// src/modules/categories/categoriesRoute.ts
import { Router as Router4 } from "express";

// src/modules/categories/categoriesService.ts
var createCategoryService = async (data) => {
  const result = await prisma.categories.create({
    data
  });
  return result;
};
var getAllCategoriesService = async (queryParams = {}) => {
  console.log("prisma.categories:", prisma.categories);
  const queryBuilder = new QueryBuilder(
    prisma.categories,
    queryParams,
    {
      searchableFields: ["name"],
      filterableFields: ["name"]
    }
  );
  return queryBuilder.search().filter().paginate().sort().execute();
};
var deleteCategoryService = async (categoryId, isAdmin) => {
  const categoryData = await prisma.categories.findUniqueOrThrow({
    where: { id: categoryId }
  });
  if (!isAdmin) {
    throw new Error("Unauthorized to delete category");
  }
  const result = await prisma.categories.delete({
    where: { id: categoryId }
  });
  return result;
};

// src/modules/categories/categoriesController.ts
var createCategoryController = catchAsync(async (req, res) => {
  const result = await createCategoryService(req.body);
  sendResponse(res, {
    httpStatusCode: 201,
    success: true,
    message: "Category created successfully",
    data: result
  });
});
var getAllCategory = catchAsync(async (req, res) => {
  const queryParams = {
    ...req.query
  };
  if (req.query.search && typeof req.query.search === "string") {
    queryParams.searchTerm = req.query.search;
    delete queryParams.search;
  }
  const result = await getAllCategoriesService(queryParams);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Categories fetched successfully",
    data: result.data,
    meta: result.meta
  });
});
var deleteCategory = catchAsync(async (req, res) => {
  const categoryId = req.params.categoryId;
  const isAdmin = req.user?.role === "ADMIN";
  const result = await deleteCategoryService(categoryId, isAdmin);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Category deleted successfully",
    data: result
  });
});

// src/modules/categories/categoriesRoute.ts
var router4 = Router4();
router4.get("/", getAllCategory);
router4.post("/", middleware_default("ADMIN" /* ADMIN */), createCategoryController);
router4.delete("/:categoryId", middleware_default("ADMIN" /* ADMIN */), deleteCategory);
var categoriesRouter = router4;

// src/modules/users/user.route.ts
import { Router as Router5 } from "express";

// src/modules/users/user.service.ts
var getUser = async (user) => {
  if (!user?.email) throw new Error("User email is required");
  return await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email
    },
    include: {
      profile: true
    }
  });
};
var getProfile = async (user) => {
  if (!user?.id) return null;
  const profile = await prisma.profile.findUnique({
    where: {
      userId: user.id
    },
    include: {
      user: true
    }
  });
  if (profile) {
    return profile;
  }
  const userData = await prisma.user.findUnique({
    where: {
      id: user?.id
    }
  });
  return {
    ...userData,
    bio: null,
    address: null,
    user
  };
};
var updateUser = async (user, data) => {
  if (!user?.email) throw new Error("User email is required");
  const isExist = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email
    },
    select: {
      id: true
    }
  });
  if (data.role || data.emailVerified || data.status) {
    delete data.role;
    delete data.emailVerified;
    delete data.status;
  }
  return await prisma.user.update({
    where: {
      id: isExist.id
    },
    data
  });
};
var getAllUsers = async (query, currentUserId) => {
  const queryBuilder = new QueryBuilder(prisma.user, query, {
    searchableFields: userSearchableFields,
    filterableFields: userFilterableFields
  });
  const result = await queryBuilder.search().filter().where({ NOT: { id: currentUserId } }).dynamicInclude(userIncludeConfig).paginate().sort().fields().execute();
  return result;
};
var updateUserStatus = async (id, data) => {
  if (!id) throw new Error("User id is required");
  const isExist = await prisma.user.findUniqueOrThrow({
    where: { id },
    select: { id: true }
  });
  return await prisma.user.update({
    where: {
      id: isExist.id
    },
    data: {
      status: data?.status
    }
  });
};
var updateUserRole = async (id, data) => {
  if (!id) throw new Error("User id is required");
  const isExist = await prisma.user.findUniqueOrThrow({
    where: { id }
  });
  if (isExist.role === data?.role) {
    return isExist;
  }
  return await prisma.user.update({
    where: {
      id: isExist.id
    },
    data: {
      role: data.role
    }
  });
};
var deleteUser = async (id) => {
  return await prisma.user.delete({
    where: {
      id
    }
  });
};
var sellerMetaData = async (id) => {
  const totalOrders = await prisma.order.count({
    where: {
      items: {
        some: {
          medicine: {
            sellerId: id
          }
        }
      }
    }
  });
  console.log(totalOrders);
  const totalMedicines = await prisma.medicine.count({
    where: {
      sellerId: id
    }
  });
  const totalRevenue = await prisma.order.aggregate({
    where: {
      items: {
        some: {
          medicine: {
            sellerId: id
          }
        }
      }
    },
    _sum: {
      totalPrice: true
    }
  });
  return {
    meta: {
      totalOrders,
      totalRevenue: totalRevenue?._sum?.totalPrice || 0,
      totalMedicines
    }
  };
};
var adminMetaData = async () => {
  const totalSeller = await prisma.user.count({
    where: {
      role: "SELLER"
    }
  });
  const totalCustomer = await prisma.user.count({
    where: {
      role: "CUSTOMER"
    }
  });
  const totalManager = await prisma.user.count({
    where: {
      role: "ADMIN"
    }
  });
  const totalOrders = await prisma.order.count();
  const totalMedicines = await prisma.medicine.count();
  const totalRevenue = await prisma.order.aggregate({
    _sum: {
      totalPrice: true
    }
  });
  const deliversOrder = await prisma.order.count({
    where: {
      status: "DELIVERED"
    }
  });
  const cancelledOrder = await prisma.order.count({
    where: {
      status: "CANCELLED"
    }
  });
  const pendingOrder = await prisma.order.count({
    where: {
      status: "PENDING"
    }
  });
  const processingOrder = await prisma.order.count({
    where: {
      status: "PROCESSING"
    }
  });
  const shippedOrder = await prisma.order.count({
    where: {
      status: "SHIPPED"
    }
  });
  return {
    meta: {
      totalOrders,
      totalMedicines,
      totalRevenue: totalRevenue?._sum?.totalPrice || 0,
      totalCustomer,
      totalSeller,
      totalManager
    },
    orders: {
      deliversOrder,
      cancelledOrder,
      pendingOrder,
      processingOrder,
      shippedOrder
    }
  };
};
var updateProfile = async (id, payload) => {
  console.log(payload);
  return await prisma.$transaction(async (tx) => {
    if (payload?.user) {
      await tx.user.update({
        where: { id },
        data: {
          name: payload?.user?.name,
          email: payload?.user?.email,
          image: payload?.user?.image
        }
      });
    }
    const profileData = {
      bio: payload.bio,
      address: payload.address,
      location: payload.location,
      contact_number: payload.contact_number
    };
    return await tx.profile.upsert({
      where: { userId: id },
      include: { user: true },
      create: {
        userId: id,
        bio: profileData.bio || "",
        address: profileData.address || "Not Provided",
        location: profileData.location || "Not Provided",
        contact_number: profileData.contact_number || "Not Provided"
      },
      update: profileData
    });
  });
};
var UserService = {
  getUser,
  updateUser,
  getAllUsers,
  updateUserStatus,
  deleteUser,
  updateUserRole,
  adminMetaData,
  sellerMetaData,
  updateProfile,
  getProfile
};

// src/modules/users/user.controller.ts
var getUser2 = catchAsync(async (req, res) => {
  const user = req?.user;
  const result = await UserService.getUser(user);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Review created successfully",
    data: result
  });
});
var getProfile2 = catchAsync(async (req, res) => {
  const user = req?.user;
  const result = await UserService.getProfile(user);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Profile fetched success.",
    data: result
  });
});
var updateUser2 = catchAsync(async (req, res) => {
  const user = req.user;
  const data = req.body;
  const result = await UserService.updateUser(user, data);
  sendResponse(res, {
    httpStatusCode: 201,
    success: true,
    message: "User updated successfully",
    data: result
  });
});
var getAllUsers2 = catchAsync(async (req, res) => {
  const user = req?.user;
  const query = {
    searchTerm: req.query.searchTerm,
    page: req.query.page,
    limit: req.query.limit,
    sortBy: req.query.sortBy,
    sortOrder: req.query.sortOrder || "desc",
    fields: req.query.fields,
    includes: req.query.includes
  };
  const result = await UserService.getAllUsers(query, user?.id);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Users fetched successfully!",
    data: result.data,
    meta: result.meta
  });
});
var updateUserStatus2 = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const data = req.body;
  const result = await UserService.updateUserStatus(userId, data);
  sendResponse(res, {
    httpStatusCode: 201,
    success: true,
    message: "User status updated!",
    data: result
  });
});
var updateUserRole2 = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const data = req.body;
  const result = await UserService.updateUserRole(userId, data);
  sendResponse(res, {
    httpStatusCode: 201,
    success: true,
    message: "User Role updated!",
    data: result
  });
});
var deleteUser2 = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await UserService.deleteUser(userId);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "User delete successfully!",
    data: result
  });
});
var adminMetaData2 = catchAsync(async (req, res) => {
  const result = await UserService.adminMetaData();
  sendResponse(res, {
    httpStatusCode: 200,
    data: result,
    success: true,
    message: "admin meta fetched success."
  });
});
var sellerMetaData2 = catchAsync(async (req, res) => {
  const user = req?.user;
  console.log(user);
  const result = await UserService.sellerMetaData(user?.id);
  sendResponse(res, {
    httpStatusCode: 200,
    data: result,
    success: true,
    message: "seller meta fetched success."
  });
});
var updateProfile2 = catchAsync(async (req, res) => {
  const user = req.user;
  const data = req.body;
  const result = await UserService.updateProfile(user?.id, data);
  sendResponse(res, {
    httpStatusCode: 201,
    success: true,
    message: "Profile updated successfully",
    data: result
  });
});
var UserController = {
  getUser: getUser2,
  updateUser: updateUser2,
  getAllUsers: getAllUsers2,
  updateUserStatus: updateUserStatus2,
  deleteUser: deleteUser2,
  updateUserRole: updateUserRole2,
  sellerMetaData: sellerMetaData2,
  adminMetaData: adminMetaData2,
  updateProfile: updateProfile2,
  getProfile: getProfile2
};

// src/modules/users/user.route.ts
var router5 = Router5();
router5.get("/", middleware_default("ADMIN" /* ADMIN */), UserController.getAllUsers);
router5.patch("/:userId/status", middleware_default("ADMIN" /* ADMIN */), UserController.updateUserStatus);
router5.get("/profile/me", middleware_default(), UserController.getUser);
router5.patch("/profile/me", middleware_default(), UserController.updateUser);
var userRouter = router5;

// src/modules/stats/stats.route.ts
import { Router as Router6 } from "express";

// src/modules/stats/stats.service.ts
var getPublicStats = async () => {
  const [totalMedicines, totalCategories, totalSellers, totalOrders] = await Promise.all([
    prisma.medicine.count(),
    prisma.categories.count(),
    prisma.user.count({ where: { role: "SELLER" } }),
    prisma.order.count()
  ]);
  console.log(prisma.medicine);
  console.log(prisma.categories);
  console.log(prisma.user);
  console.log(prisma.order);
  return { totalMedicines, totalCategories, totalSellers, totalOrders };
};

// src/modules/stats/stats.controller.ts
var getStats = catchAsync(async (req, res) => {
  const result = await getPublicStats();
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Stats fetched successfully",
    data: result
  });
});

// src/modules/stats/stats.route.ts
var router6 = Router6();
router6.get("/", getStats);
var statsRouter = router6;

// src/app.ts
var app = express();
var allowedOrigins = [
  process.env.APP_URL,
  "http://localhost:3000",
  "http://localhost:3001"
].filter(Boolean);
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const isAllowed = allowedOrigins.includes(origin) || /^https:\/\/next-blog-client.*\.vercel\.app$/.test(origin) || /^https:\/\/.*\.vercel\.app$/.test(origin);
      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"]
  })
);
app.use(express.json());
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use("/api/medicine", medicineRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/orders", router2);
app.use("/api/review", router3);
app.use("/api/admin/users", userRouter);
app.use("/api/stats", statsRouter);
app.get("/", (req, res) => {
  res.send("Hello, from shastho mart");
});
var app_default = app;

// src/scripts/seedAdmin.ts
async function seedAdmin() {
  const adminData = {
    name: `${process.env.ADMIN_NAME}`,
    email: `${process.env.ADMIN_EMAIL}`,
    role: "ADMIN" /* ADMIN */,
    password: `${process.env.ADMIN_PASSWORD}`
  };
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: adminData.email
      }
    });
    if (existingUser) {
      throw new Error(" user already exist");
    }
    const signUpAdmin = await fetch(`${process.env.BETTER_AUTH_URL}/api/auth/sign-up/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "origin": `${process.env.APP_URL}`
      },
      body: JSON.stringify(adminData)
    });
    console.log(signUpAdmin);
    if (signUpAdmin.ok) {
      console.log("**** Admin created");
      await prisma.user.update({
        where: {
          email: adminData.email
        },
        data: {
          emailVerified: true
        }
      });
      console.log("**** Email verification status updated!");
    }
  } catch (e) {
    console.log(e);
  }
}
seedAdmin();

// src/index.ts
var PORT = process.env.PORT || 5e3;
async function main() {
  try {
    seedAdmin();
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
