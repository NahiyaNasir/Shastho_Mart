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
  "inlineSchema": 'model Categories {\n  id          String  @id @default(uuid())\n  name        String  @unique\n  image       String?\n  description String?\n\n  medicines Medicine[]\n  slug      String     @unique\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nenum Role {\n  CUSTOMER\n  SELLER\n  ADMIN\n}\n\nenum OrderStatus {\n  PENDING\n  CONFIRMED\n  SHIPPED\n  DELIVERED\n  CANCELLED\n  PROCESSING\n}\n\nenum Status {\n  BAN\n  UNBAN\n}\n\nenum UnitType {\n  Pcs\n  Strip\n  Box\n  Bottle\n}\n\nmodel Medicine {\n  id         String     @id @default(uuid())\n  sellerId   String\n  seller     User       @relation(fields: [sellerId], references: [id])\n  categoryId String\n  category   Categories @relation(fields: [categoryId], references: [id])\n\n  name        String   @db.VarChar(200)\n  genericName String   @db.VarChar(200)\n  strength    String?  @db.VarChar(50)\n  unitType    UnitType @default(Pcs)\n\n  group       String? @db.VarChar(255)\n  description String  @db.Text\n  overview    String  @db.Text\n\n  price         Decimal  @db.Decimal(10, 2)\n  discountPrice Decimal? @db.Decimal(10, 2)\n  stock         Int      @default(0)\n\n  image String\n  tags  String[]\n\n  isPrescriptionRequired Boolean   @default(false)\n  expiryDate             DateTime?\n  sku                    String?   @db.VarChar(100)\n\n  views   Int         @default(0)\n  orders  OrderItem[]\n  reviews Review[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  users     User[]   @relation("SellerMedicines")\n\n  @@unique([name, sellerId])\n  @@index([categoryId])\n}\n\nmodel Order {\n  id         String      @id @default(uuid())\n  userId     String\n  status     OrderStatus @default(PENDING)\n  totalPrice Decimal     @db.Decimal(10, 2)\n  address    String\n  user       User        @relation(fields: [userId], references: [id])\n  items      OrderItem[]\n\n  createdAt DateTime @default(now())\n}\n\nmodel OrderItem {\n  id         String  @id @default(uuid())\n  orderId    String\n  medicineId String\n  quantity   Int\n  price      Decimal @db.Decimal(10, 2)\n\n  order    Order    @relation(fields: [orderId], references: [id])\n  medicine Medicine @relation(fields: [medicineId], references: [id])\n}\n\nmodel Profile {\n  id             String  @id @default(uuid())\n  userId         String  @unique\n  user           User    @relation(fields: [userId], references: [id])\n  bio            String? @db.VarChar(300)\n  address        String\n  location       String\n  contact_number String\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel Review {\n  id      String @id @default(uuid())\n  rating  Int\n  comment String @db.Text\n\n  userId     String\n  medicineId String\n\n  user     User     @relation(fields: [userId], references: [id])\n  medicine Medicine @relation(fields: [medicineId], references: [id])\n\n  createdAt DateTime @default(now())\n\n  @@unique([userId, medicineId])\n}\n\n// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?\n// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../../src/generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nmodel User {\n  id              String     @id\n  name            String\n  email           String\n  emailVerified   Boolean    @default(false)\n  image           String?\n  createdAt       DateTime   @default(now())\n  updatedAt       DateTime   @updatedAt\n  sessions        Session[]\n  accounts        Account[]\n  callbackURL     String?\n  role            Role       @default(CUSTOMER)\n  status          Status     @default(UNBAN)\n  sellerMedicines Medicine[] @relation("SellerMedicines")\n  reviews         Review[]\n  orders          Order[]\n  profile         Profile?\n  medicines       Medicine[]\n\n  @@unique([email])\n  @@map("user")\n}\n\nmodel Session {\n  id        String   @id\n  expiresAt DateTime\n  token     String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  ipAddress String?\n  userAgent String?\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@unique([token])\n  @@index([userId])\n  @@map("session")\n}\n\nmodel Account {\n  id                    String    @id\n  accountId             String\n  providerId            String\n  userId                String\n  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n  accessToken           String?\n  refreshToken          String?\n  idToken               String?\n  accessTokenExpiresAt  DateTime?\n  refreshTokenExpiresAt DateTime?\n  scope                 String?\n  password              String?\n  createdAt             DateTime  @default(now())\n  updatedAt             DateTime  @updatedAt\n\n  @@index([userId])\n  @@map("account")\n}\n\nmodel Verification {\n  id         String   @id\n  identifier String\n  value      String\n  expiresAt  DateTime\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  @@index([identifier])\n  @@map("verification")\n}\n',
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
config.runtimeDataModel = JSON.parse('{"models":{"Categories":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"image","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"medicines","kind":"object","type":"Medicine","relationName":"CategoriesToMedicine"},{"name":"slug","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Medicine":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"sellerId","kind":"scalar","type":"String"},{"name":"seller","kind":"object","type":"User","relationName":"MedicineToUser"},{"name":"categoryId","kind":"scalar","type":"String"},{"name":"category","kind":"object","type":"Categories","relationName":"CategoriesToMedicine"},{"name":"name","kind":"scalar","type":"String"},{"name":"genericName","kind":"scalar","type":"String"},{"name":"strength","kind":"scalar","type":"String"},{"name":"unitType","kind":"enum","type":"UnitType"},{"name":"group","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"overview","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Decimal"},{"name":"discountPrice","kind":"scalar","type":"Decimal"},{"name":"stock","kind":"scalar","type":"Int"},{"name":"image","kind":"scalar","type":"String"},{"name":"tags","kind":"scalar","type":"String"},{"name":"isPrescriptionRequired","kind":"scalar","type":"Boolean"},{"name":"expiryDate","kind":"scalar","type":"DateTime"},{"name":"sku","kind":"scalar","type":"String"},{"name":"views","kind":"scalar","type":"Int"},{"name":"orders","kind":"object","type":"OrderItem","relationName":"MedicineToOrderItem"},{"name":"reviews","kind":"object","type":"Review","relationName":"MedicineToReview"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"users","kind":"object","type":"User","relationName":"SellerMedicines"}],"dbName":null},"Order":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"OrderStatus"},{"name":"totalPrice","kind":"scalar","type":"Decimal"},{"name":"address","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"OrderToUser"},{"name":"items","kind":"object","type":"OrderItem","relationName":"OrderToOrderItem"},{"name":"createdAt","kind":"scalar","type":"DateTime"}],"dbName":null},"OrderItem":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"orderId","kind":"scalar","type":"String"},{"name":"medicineId","kind":"scalar","type":"String"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"price","kind":"scalar","type":"Decimal"},{"name":"order","kind":"object","type":"Order","relationName":"OrderToOrderItem"},{"name":"medicine","kind":"object","type":"Medicine","relationName":"MedicineToOrderItem"}],"dbName":null},"Profile":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"ProfileToUser"},{"name":"bio","kind":"scalar","type":"String"},{"name":"address","kind":"scalar","type":"String"},{"name":"location","kind":"scalar","type":"String"},{"name":"contact_number","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Review":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"rating","kind":"scalar","type":"Int"},{"name":"comment","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"medicineId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"ReviewToUser"},{"name":"medicine","kind":"object","type":"Medicine","relationName":"MedicineToReview"},{"name":"createdAt","kind":"scalar","type":"DateTime"}],"dbName":null},"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"image","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"},{"name":"callbackURL","kind":"scalar","type":"String"},{"name":"role","kind":"enum","type":"Role"},{"name":"status","kind":"enum","type":"Status"},{"name":"sellerMedicines","kind":"object","type":"Medicine","relationName":"SellerMedicines"},{"name":"reviews","kind":"object","type":"Review","relationName":"ReviewToUser"},{"name":"orders","kind":"object","type":"Order","relationName":"OrderToUser"},{"name":"profile","kind":"object","type":"Profile","relationName":"ProfileToUser"},{"name":"medicines","kind":"object","type":"Medicine","relationName":"MedicineToUser"}],"dbName":"user"},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"token","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"}],"dbName":"session"},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"accountId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"},{"name":"accessToken","kind":"scalar","type":"String"},{"name":"refreshToken","kind":"scalar","type":"String"},{"name":"idToken","kind":"scalar","type":"String"},{"name":"accessTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"refreshTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"scope","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"account"},"Verification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"identifier","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"verification"}},"enums":{},"types":{}}');
config.parameterizationSchema = {
  strings: JSON.parse('["where","orderBy","cursor","user","sessions","accounts","sellerMedicines","medicine","reviews","order","items","_count","orders","profile","medicines","seller","category","users","Categories.findUnique","Categories.findUniqueOrThrow","Categories.findFirst","Categories.findFirstOrThrow","Categories.findMany","data","Categories.createOne","Categories.createMany","Categories.createManyAndReturn","Categories.updateOne","Categories.updateMany","Categories.updateManyAndReturn","create","update","Categories.upsertOne","Categories.deleteOne","Categories.deleteMany","having","_min","_max","Categories.groupBy","Categories.aggregate","Medicine.findUnique","Medicine.findUniqueOrThrow","Medicine.findFirst","Medicine.findFirstOrThrow","Medicine.findMany","Medicine.createOne","Medicine.createMany","Medicine.createManyAndReturn","Medicine.updateOne","Medicine.updateMany","Medicine.updateManyAndReturn","Medicine.upsertOne","Medicine.deleteOne","Medicine.deleteMany","_avg","_sum","Medicine.groupBy","Medicine.aggregate","Order.findUnique","Order.findUniqueOrThrow","Order.findFirst","Order.findFirstOrThrow","Order.findMany","Order.createOne","Order.createMany","Order.createManyAndReturn","Order.updateOne","Order.updateMany","Order.updateManyAndReturn","Order.upsertOne","Order.deleteOne","Order.deleteMany","Order.groupBy","Order.aggregate","OrderItem.findUnique","OrderItem.findUniqueOrThrow","OrderItem.findFirst","OrderItem.findFirstOrThrow","OrderItem.findMany","OrderItem.createOne","OrderItem.createMany","OrderItem.createManyAndReturn","OrderItem.updateOne","OrderItem.updateMany","OrderItem.updateManyAndReturn","OrderItem.upsertOne","OrderItem.deleteOne","OrderItem.deleteMany","OrderItem.groupBy","OrderItem.aggregate","Profile.findUnique","Profile.findUniqueOrThrow","Profile.findFirst","Profile.findFirstOrThrow","Profile.findMany","Profile.createOne","Profile.createMany","Profile.createManyAndReturn","Profile.updateOne","Profile.updateMany","Profile.updateManyAndReturn","Profile.upsertOne","Profile.deleteOne","Profile.deleteMany","Profile.groupBy","Profile.aggregate","Review.findUnique","Review.findUniqueOrThrow","Review.findFirst","Review.findFirstOrThrow","Review.findMany","Review.createOne","Review.createMany","Review.createManyAndReturn","Review.updateOne","Review.updateMany","Review.updateManyAndReturn","Review.upsertOne","Review.deleteOne","Review.deleteMany","Review.groupBy","Review.aggregate","User.findUnique","User.findUniqueOrThrow","User.findFirst","User.findFirstOrThrow","User.findMany","User.createOne","User.createMany","User.createManyAndReturn","User.updateOne","User.updateMany","User.updateManyAndReturn","User.upsertOne","User.deleteOne","User.deleteMany","User.groupBy","User.aggregate","Session.findUnique","Session.findUniqueOrThrow","Session.findFirst","Session.findFirstOrThrow","Session.findMany","Session.createOne","Session.createMany","Session.createManyAndReturn","Session.updateOne","Session.updateMany","Session.updateManyAndReturn","Session.upsertOne","Session.deleteOne","Session.deleteMany","Session.groupBy","Session.aggregate","Account.findUnique","Account.findUniqueOrThrow","Account.findFirst","Account.findFirstOrThrow","Account.findMany","Account.createOne","Account.createMany","Account.createManyAndReturn","Account.updateOne","Account.updateMany","Account.updateManyAndReturn","Account.upsertOne","Account.deleteOne","Account.deleteMany","Account.groupBy","Account.aggregate","Verification.findUnique","Verification.findUniqueOrThrow","Verification.findFirst","Verification.findFirstOrThrow","Verification.findMany","Verification.createOne","Verification.createMany","Verification.createManyAndReturn","Verification.updateOne","Verification.updateMany","Verification.updateManyAndReturn","Verification.upsertOne","Verification.deleteOne","Verification.deleteMany","Verification.groupBy","Verification.aggregate","AND","OR","NOT","id","identifier","value","expiresAt","createdAt","updatedAt","equals","in","notIn","lt","lte","gt","gte","not","contains","startsWith","endsWith","accountId","providerId","userId","accessToken","refreshToken","idToken","accessTokenExpiresAt","refreshTokenExpiresAt","scope","password","token","ipAddress","userAgent","name","email","emailVerified","image","callbackURL","Role","role","Status","status","rating","comment","medicineId","bio","address","location","contact_number","orderId","quantity","price","OrderStatus","totalPrice","sellerId","categoryId","genericName","strength","UnitType","unitType","group","description","overview","discountPrice","stock","tags","isPrescriptionRequired","expiryDate","sku","views","has","hasEvery","hasSome","slug","every","some","none","userId_medicineId","name_sellerId","is","isNot","connectOrCreate","upsert","createMany","set","disconnect","delete","connect","updateMany","deleteMany","push","increment","decrement","multiply","divide"]'),
  graph: "iQVdoAELDgAAygIAILoBAADJAgAwuwEAADEAELwBAADJAgAwvQEBAAAAAcEBQACcAgAhwgFAAJwCACHbAQEAAAAB3gEBALYCACH3AQEAtgIAIYMCAQAAAAEBAAAAAQAgHQgAANECACAMAADbAgAgDwAAtwIAIBAAAOUCACARAADmAgAgugEAAOICADC7AQAAAwAQvAEAAOICADC9AQEAmwIAIcEBQACcAgAhwgFAAJwCACHbAQEAmwIAId4BAQCbAgAh7QEQANYCACHwAQEAmwIAIfEBAQCbAgAh8gEBAJsCACHzAQEAtgIAIfUBAADjAvUBIvYBAQC2AgAh9wEBAJsCACH4AQEAmwIAIfkBEADkAgAh-gECANUCACH7AQAAwwIAIPwBIADMAgAh_QFAAN8CACH-AQEAtgIAIf8BAgDVAgAhCggAAMcEACAMAADMBAAgDwAApAQAIBAAAM0EACARAADOBAAg8wEAAOwCACD2AQAA7AIAIPkBAADsAgAg_QEAAOwCACD-AQAA7AIAIB4IAADRAgAgDAAA2wIAIA8AALcCACAQAADlAgAgEQAA5gIAILoBAADiAgAwuwEAAAMAELwBAADiAgAwvQEBAAAAAcEBQACcAgAhwgFAAJwCACHbAQEAmwIAId4BAQCbAgAh7QEQANYCACHwAQEAmwIAIfEBAQCbAgAh8gEBAJsCACHzAQEAtgIAIfUBAADjAvUBIvYBAQC2AgAh9wEBAJsCACH4AQEAmwIAIfkBEADkAgAh-gECANUCACH7AQAAwwIAIPwBIADMAgAh_QFAAN8CACH-AQEAtgIAIf8BAgDVAgAhiAIAAOECACADAAAAAwAgAQAABAAwAgAABQAgDAMAALcCACC6AQAA4AIAMLsBAAAHABC8AQAA4AIAML0BAQCbAgAhwAFAAJwCACHBAUAAnAIAIcIBQACcAgAh0AEBAJsCACHYAQEAmwIAIdkBAQC2AgAh2gEBALYCACEDAwAApAQAINkBAADsAgAg2gEAAOwCACAMAwAAtwIAILoBAADgAgAwuwEAAAcAELwBAADgAgAwvQEBAAAAAcABQACcAgAhwQFAAJwCACHCAUAAnAIAIdABAQCbAgAh2AEBAAAAAdkBAQC2AgAh2gEBALYCACEDAAAABwAgAQAACAAwAgAACQAgEQMAALcCACC6AQAA3gIAMLsBAAALABC8AQAA3gIAML0BAQCbAgAhwQFAAJwCACHCAUAAnAIAIc4BAQCbAgAhzwEBAJsCACHQAQEAmwIAIdEBAQC2AgAh0gEBALYCACHTAQEAtgIAIdQBQADfAgAh1QFAAN8CACHWAQEAtgIAIdcBAQC2AgAhCAMAAKQEACDRAQAA7AIAINIBAADsAgAg0wEAAOwCACDUAQAA7AIAINUBAADsAgAg1gEAAOwCACDXAQAA7AIAIBEDAAC3AgAgugEAAN4CADC7AQAACwAQvAEAAN4CADC9AQEAAAABwQFAAJwCACHCAUAAnAIAIc4BAQCbAgAhzwEBAJsCACHQAQEAmwIAIdEBAQC2AgAh0gEBALYCACHTAQEAtgIAIdQBQADfAgAh1QFAAN8CACHWAQEAtgIAIdcBAQC2AgAhAwAAAAsAIAEAAAwAMAIAAA0AIAMAAAADACABAAAEADACAAAFACALAwAAtwIAIAcAANgCACC6AQAA3QIAMLsBAAAQABC8AQAA3QIAML0BAQCbAgAhwQFAAJwCACHQAQEAmwIAIeQBAgDVAgAh5QEBAJsCACHmAQEAmwIAIQIDAACkBAAgBwAAywQAIAwDAAC3AgAgBwAA2AIAILoBAADdAgAwuwEAABAAELwBAADdAgAwvQEBAAAAAcEBQACcAgAh0AEBAJsCACHkAQIA1QIAIeUBAQCbAgAh5gEBAJsCACGHAgAA3AIAIAMAAAAQACABAAARADACAAASACALAwAAtwIAIAoAANsCACC6AQAA2QIAMLsBAAAUABC8AQAA2QIAML0BAQCbAgAhwQFAAJwCACHQAQEAmwIAIeMBAADaAu8BIugBAQCbAgAh7wEQANYCACECAwAApAQAIAoAAMwEACALAwAAtwIAIAoAANsCACC6AQAA2QIAMLsBAAAUABC8AQAA2QIAML0BAQAAAAHBAUAAnAIAIdABAQCbAgAh4wEAANoC7wEi6AEBAJsCACHvARAA1gIAIQMAAAAUACABAAAVADACAAAWACAKBwAA2AIAIAkAANcCACC6AQAA1AIAMLsBAAAYABC8AQAA1AIAML0BAQCbAgAh5gEBAJsCACHrAQEAmwIAIewBAgDVAgAh7QEQANYCACECBwAAywQAIAkAAMoEACAKBwAA2AIAIAkAANcCACC6AQAA1AIAMLsBAAAYABC8AQAA1AIAML0BAQAAAAHmAQEAmwIAIesBAQCbAgAh7AECANUCACHtARAA1gIAIQMAAAAYACABAAAZADACAAAaACABAAAAGAAgDAMAALcCACC6AQAAtQIAMLsBAAAdABC8AQAAtQIAML0BAQCbAgAhwQFAAJwCACHCAUAAnAIAIdABAQCbAgAh5wEBALYCACHoAQEAmwIAIekBAQCbAgAh6gEBAJsCACEBAAAAHQAgAwAAAAMAIAEAAAQAMAIAAAUAIAEAAAAHACABAAAACwAgAQAAAAMAIAEAAAAQACABAAAAFAAgAQAAAAMAIAMAAAAYACABAAAZADACAAAaACADAAAAEAAgAQAAEQAwAgAAEgAgFAQAAM8CACAFAADQAgAgBgAAygIAIAgAANECACAMAADSAgAgDQAA0wIAIA4AAMoCACC6AQAAywIAMLsBAAAoABC8AQAAywIAML0BAQCbAgAhwQFAAJwCACHCAUAAnAIAIdsBAQCbAgAh3AEBAJsCACHdASAAzAIAId4BAQC2AgAh3wEBALYCACHhAQAAzQLhASLjAQAAzgLjASIJBAAAxQQAIAUAAMYEACAGAADEBAAgCAAAxwQAIAwAAMgEACANAADJBAAgDgAAxAQAIN4BAADsAgAg3wEAAOwCACAUBAAAzwIAIAUAANACACAGAADKAgAgCAAA0QIAIAwAANICACANAADTAgAgDgAAygIAILoBAADLAgAwuwEAACgAELwBAADLAgAwvQEBAAAAAcEBQACcAgAhwgFAAJwCACHbAQEAmwIAIdwBAQAAAAHdASAAzAIAId4BAQC2AgAh3wEBALYCACHhAQAAzQLhASLjAQAAzgLjASIDAAAAKAAgAQAAKQAwAgAAKgAgAQAAABgAIAEAAAAQACABAAAAKAAgAQAAAAMAIAEAAAABACALDgAAygIAILoBAADJAgAwuwEAADEAELwBAADJAgAwvQEBAJsCACHBAUAAnAIAIcIBQACcAgAh2wEBAJsCACHeAQEAtgIAIfcBAQC2AgAhgwIBAJsCACEDDgAAxAQAIN4BAADsAgAg9wEAAOwCACADAAAAMQAgAQAAMgAwAgAAAQAgAwAAADEAIAEAADIAMAIAAAEAIAMAAAAxACABAAAyADACAAABACAIDgAAwwQAIL0BAQAAAAHBAUAAAAABwgFAAAAAAdsBAQAAAAHeAQEAAAAB9wEBAAAAAYMCAQAAAAEBFwAANgAgB70BAQAAAAHBAUAAAAABwgFAAAAAAdsBAQAAAAHeAQEAAAAB9wEBAAAAAYMCAQAAAAEBFwAAOAAwARcAADgAMAgOAAC5BAAgvQEBAOoCACHBAUAA6wIAIcIBQADrAgAh2wEBAOoCACHeAQEA8AIAIfcBAQDwAgAhgwIBAOoCACECAAAAAQAgFwAAOwAgB70BAQDqAgAhwQFAAOsCACHCAUAA6wIAIdsBAQDqAgAh3gEBAPACACH3AQEA8AIAIYMCAQDqAgAhAgAAADEAIBcAAD0AIAIAAAAxACAXAAA9ACADAAAAAQAgHgAANgAgHwAAOwAgAQAAAAEAIAEAAAAxACAFCwAAtgQAICQAALgEACAlAAC3BAAg3gEAAOwCACD3AQAA7AIAIAq6AQAAyAIAMLsBAABEABC8AQAAyAIAML0BAQCTAgAhwQFAAJQCACHCAUAAlAIAIdsBAQCTAgAh3gEBAJ4CACH3AQEAngIAIYMCAQCTAgAhAwAAADEAIAEAAEMAMCMAAEQAIAMAAAAxACABAAAyADACAAABACABAAAABQAgAQAAAAUAIAMAAAADACABAAAEADACAAAFACADAAAAAwAgAQAABAAwAgAABQAgAwAAAAMAIAEAAAQAMAIAAAUAIBoIAADnAwAgDAAA5gMAIA8AAIoEACAQAADlAwAgEQAA6AMAIL0BAQAAAAHBAUAAAAABwgFAAAAAAdsBAQAAAAHeAQEAAAAB7QEQAAAAAfABAQAAAAHxAQEAAAAB8gEBAAAAAfMBAQAAAAH1AQAAAPUBAvYBAQAAAAH3AQEAAAAB-AEBAAAAAfkBEAAAAAH6AQIAAAAB-wEAAOQDACD8ASAAAAAB_QFAAAAAAf4BAQAAAAH_AQIAAAABARcAAEwAIBW9AQEAAAABwQFAAAAAAcIBQAAAAAHbAQEAAAAB3gEBAAAAAe0BEAAAAAHwAQEAAAAB8QEBAAAAAfIBAQAAAAHzAQEAAAAB9QEAAAD1AQL2AQEAAAAB9wEBAAAAAfgBAQAAAAH5ARAAAAAB-gECAAAAAfsBAADkAwAg_AEgAAAAAf0BQAAAAAH-AQEAAAAB_wECAAAAAQEXAABOADABFwAATgAwGggAAJgDACAMAACXAwAgDwAAiAQAIBAAAJYDACARAACZAwAgvQEBAOoCACHBAUAA6wIAIcIBQADrAgAh2wEBAOoCACHeAQEA6gIAIe0BEACRAwAh8AEBAOoCACHxAQEA6gIAIfIBAQDqAgAh8wEBAPACACH1AQAAkAP1ASL2AQEA8AIAIfcBAQDqAgAh-AEBAOoCACH5ARAAkgMAIfoBAgCTAwAh-wEAAJQDACD8ASAA_AIAIf0BQADxAgAh_gEBAPACACH_AQIAkwMAIQIAAAAFACAXAABRACAVvQEBAOoCACHBAUAA6wIAIcIBQADrAgAh2wEBAOoCACHeAQEA6gIAIe0BEACRAwAh8AEBAOoCACHxAQEA6gIAIfIBAQDqAgAh8wEBAPACACH1AQAAkAP1ASL2AQEA8AIAIfcBAQDqAgAh-AEBAOoCACH5ARAAkgMAIfoBAgCTAwAh-wEAAJQDACD8ASAA_AIAIf0BQADxAgAh_gEBAPACACH_AQIAkwMAIQIAAAADACAXAABTACACAAAAAwAgFwAAUwAgAwAAAAUAIB4AAEwAIB8AAFEAIAEAAAAFACABAAAAAwAgCgsAALEEACAkAAC0BAAgJQAAswQAIDYAALIEACA3AAC1BAAg8wEAAOwCACD2AQAA7AIAIPkBAADsAgAg_QEAAOwCACD-AQAA7AIAIBi6AQAAwAIAMLsBAABaABC8AQAAwAIAML0BAQCTAgAhwQFAAJQCACHCAUAAlAIAIdsBAQCTAgAh3gEBAJMCACHtARAAuQIAIfABAQCTAgAh8QEBAJMCACHyAQEAkwIAIfMBAQCeAgAh9QEAAMEC9QEi9gEBAJ4CACH3AQEAkwIAIfgBAQCTAgAh-QEQAMICACH6AQIAsQIAIfsBAADDAgAg_AEgAKcCACH9AUAAnwIAIf4BAQCeAgAh_wECALECACEDAAAAAwAgAQAAWQAwIwAAWgAgAwAAAAMAIAEAAAQAMAIAAAUAIAEAAAAWACABAAAAFgAgAwAAABQAIAEAABUAMAIAABYAIAMAAAAUACABAAAVADACAAAWACADAAAAFAAgAQAAFQAwAgAAFgAgCAMAALAEACAKAACyAwAgvQEBAAAAAcEBQAAAAAHQAQEAAAAB4wEAAADvAQLoAQEAAAAB7wEQAAAAAQEXAABiACAGvQEBAAAAAcEBQAAAAAHQAQEAAAAB4wEAAADvAQLoAQEAAAAB7wEQAAAAAQEXAABkADABFwAAZAAwCAMAAK8EACAKAAD0AwAgvQEBAOoCACHBAUAA6wIAIdABAQDqAgAh4wEAAPID7wEi6AEBAOoCACHvARAAkQMAIQIAAAAWACAXAABnACAGvQEBAOoCACHBAUAA6wIAIdABAQDqAgAh4wEAAPID7wEi6AEBAOoCACHvARAAkQMAIQIAAAAUACAXAABpACACAAAAFAAgFwAAaQAgAwAAABYAIB4AAGIAIB8AAGcAIAEAAAAWACABAAAAFAAgBQsAAKoEACAkAACtBAAgJQAArAQAIDYAAKsEACA3AACuBAAgCboBAAC8AgAwuwEAAHAAELwBAAC8AgAwvQEBAJMCACHBAUAAlAIAIdABAQCTAgAh4wEAAL0C7wEi6AEBAJMCACHvARAAuQIAIQMAAAAUACABAABvADAjAABwACADAAAAFAAgAQAAFQAwAgAAFgAgAQAAABoAIAEAAAAaACADAAAAGAAgAQAAGQAwAgAAGgAgAwAAABgAIAEAABkAMAIAABoAIAMAAAAYACABAAAZADACAAAaACAHBwAAuAMAIAkAAOIDACC9AQEAAAAB5gEBAAAAAesBAQAAAAHsAQIAAAAB7QEQAAAAAQEXAAB4ACAFvQEBAAAAAeYBAQAAAAHrAQEAAAAB7AECAAAAAe0BEAAAAAEBFwAAegAwARcAAHoAMAcHAAD6AwAgCQAA4AMAIL0BAQDqAgAh5gEBAOoCACHrAQEA6gIAIewBAgCTAwAh7QEQAJEDACECAAAAGgAgFwAAfQAgBb0BAQDqAgAh5gEBAOoCACHrAQEA6gIAIewBAgCTAwAh7QEQAJEDACECAAAAGAAgFwAAfwAgAgAAABgAIBcAAH8AIAMAAAAaACAeAAB4ACAfAAB9ACABAAAAGgAgAQAAABgAIAULAAClBAAgJAAAqAQAICUAAKcEACA2AACmBAAgNwAAqQQAIAi6AQAAuAIAMLsBAACGAQAQvAEAALgCADC9AQEAkwIAIeYBAQCTAgAh6wEBAJMCACHsAQIAsQIAIe0BEAC5AgAhAwAAABgAIAEAAIUBADAjAACGAQAgAwAAABgAIAEAABkAMAIAABoAIAwDAAC3AgAgugEAALUCADC7AQAAHQAQvAEAALUCADC9AQEAAAABwQFAAJwCACHCAUAAnAIAIdABAQAAAAHnAQEAtgIAIegBAQCbAgAh6QEBAJsCACHqAQEAmwIAIQEAAACJAQAgAQAAAIkBACACAwAApAQAIOcBAADsAgAgAwAAAB0AIAEAAIwBADACAACJAQAgAwAAAB0AIAEAAIwBADACAACJAQAgAwAAAB0AIAEAAIwBADACAACJAQAgCQMAAKMEACC9AQEAAAABwQFAAAAAAcIBQAAAAAHQAQEAAAAB5wEBAAAAAegBAQAAAAHpAQEAAAAB6gEBAAAAAQEXAACQAQAgCL0BAQAAAAHBAUAAAAABwgFAAAAAAdABAQAAAAHnAQEAAAAB6AEBAAAAAekBAQAAAAHqAQEAAAABARcAAJIBADABFwAAkgEAMAkDAACiBAAgvQEBAOoCACHBAUAA6wIAIcIBQADrAgAh0AEBAOoCACHnAQEA8AIAIegBAQDqAgAh6QEBAOoCACHqAQEA6gIAIQIAAACJAQAgFwAAlQEAIAi9AQEA6gIAIcEBQADrAgAhwgFAAOsCACHQAQEA6gIAIecBAQDwAgAh6AEBAOoCACHpAQEA6gIAIeoBAQDqAgAhAgAAAB0AIBcAAJcBACACAAAAHQAgFwAAlwEAIAMAAACJAQAgHgAAkAEAIB8AAJUBACABAAAAiQEAIAEAAAAdACAECwAAnwQAICQAAKEEACAlAACgBAAg5wEAAOwCACALugEAALQCADC7AQAAngEAELwBAAC0AgAwvQEBAJMCACHBAUAAlAIAIcIBQACUAgAh0AEBAJMCACHnAQEAngIAIegBAQCTAgAh6QEBAJMCACHqAQEAkwIAIQMAAAAdACABAACdAQAwIwAAngEAIAMAAAAdACABAACMAQAwAgAAiQEAIAEAAAASACABAAAAEgAgAwAAABAAIAEAABEAMAIAABIAIAMAAAAQACABAAARADACAAASACADAAAAEAAgAQAAEQAwAgAAEgAgCAMAANUDACAHAAC-AwAgvQEBAAAAAcEBQAAAAAHQAQEAAAAB5AECAAAAAeUBAQAAAAHmAQEAAAABARcAAKYBACAGvQEBAAAAAcEBQAAAAAHQAQEAAAAB5AECAAAAAeUBAQAAAAHmAQEAAAABARcAAKgBADABFwAAqAEAMAgDAADTAwAgBwAAgAQAIL0BAQDqAgAhwQFAAOsCACHQAQEA6gIAIeQBAgCTAwAh5QEBAOoCACHmAQEA6gIAIQIAAAASACAXAACrAQAgBr0BAQDqAgAhwQFAAOsCACHQAQEA6gIAIeQBAgCTAwAh5QEBAOoCACHmAQEA6gIAIQIAAAAQACAXAACtAQAgAgAAABAAIBcAAK0BACADAAAAEgAgHgAApgEAIB8AAKsBACABAAAAEgAgAQAAABAAIAULAACaBAAgJAAAnQQAICUAAJwEACA2AACbBAAgNwAAngQAIAm6AQAAsAIAMLsBAAC0AQAQvAEAALACADC9AQEAkwIAIcEBQACUAgAh0AEBAJMCACHkAQIAsQIAIeUBAQCTAgAh5gEBAJMCACEDAAAAEAAgAQAAswEAMCMAALQBACADAAAAEAAgAQAAEQAwAgAAEgAgAQAAACoAIAEAAAAqACADAAAAKAAgAQAAKQAwAgAAKgAgAwAAACgAIAEAACkAMAIAACoAIAMAAAAoACABAAApADACAAAqACARBAAApQMAIAUAAKYDACAGAACZBAAgCAAApwMAIAwAAKgDACANAACpAwAgDgAAqgMAIL0BAQAAAAHBAUAAAAABwgFAAAAAAdsBAQAAAAHcAQEAAAAB3QEgAAAAAd4BAQAAAAHfAQEAAAAB4QEAAADhAQLjAQAAAOMBAgEXAAC8AQAgCr0BAQAAAAHBAUAAAAABwgFAAAAAAdsBAQAAAAHcAQEAAAAB3QEgAAAAAd4BAQAAAAHfAQEAAAAB4QEAAADhAQLjAQAAAOMBAgEXAAC-AQAwARcAAL4BADARBAAA_wIAIAUAAIADACAGAACBAwAgCAAAggMAIAwAAIMDACANAACEAwAgDgAAhQMAIL0BAQDqAgAhwQFAAOsCACHCAUAA6wIAIdsBAQDqAgAh3AEBAOoCACHdASAA_AIAId4BAQDwAgAh3wEBAPACACHhAQAA_QLhASLjAQAA_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_AQEAmwIAIcABQACcAgAhwQFAAJwCACHCAUAAnAIAIQEAAAD5AQAgAQAAAPkBACAJugEAAJoCADC7AQAA_AEAELwBAACaAgAwvQEBAJsCACG-AQEAmwIAIb8BAQCbAgAhwAFAAJwCACHBAUAAnAIAIcIBQACcAgAhAAMAAAD8AQAgAQAA_QEAMAIAAPkBACADAAAA_AEAIAEAAP0BADACAAD5AQAgAwAAAPwBACABAAD9AQAwAgAA-QEAIAa9AQEAAAABvgEBAAAAAb8BAQAAAAHAAUAAAAABwQFAAAAAAcIBQAAAAAEBFwAAgQIAIAa9AQEAAAABvgEBAAAAAb8BAQAAAAHAAUAAAAABwQFAAAAAAcIBQAAAAAEBFwAAgwIAMAEXAACDAgAwBr0BAQDqAgAhvgEBAOoCACG_AQEA6gIAIcABQADrAgAhwQFAAOsCACHCAUAA6wIAIQIAAAD5AQAgFwAAhgIAIAa9AQEA6gIAIb4BAQDqAgAhvwEBAOoCACHAAUAA6wIAIcEBQADrAgAhwgFAAOsCACECAAAA_AEAIBcAAIgCACACAAAA_AEAIBcAAIgCACADAAAA-QEAIB4AAIECACAfAACGAgAgAQAAAPkBACABAAAA_AEAIAMLAADnAgAgJAAA6QIAICUAAOgCACAJugEAAJICADC7AQAAjwIAELwBAACSAgAwvQEBAJMCACG-AQEAkwIAIb8BAQCTAgAhwAFAAJQCACHBAUAAlAIAIcIBQACUAgAhAwAAAPwBACABAACOAgAwIwAAjwIAIAMAAAD8AQAgAQAA_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_AgAgJQAAvwIAIMMBAAAA7wECxAEAAADvAQjFAQAAAO8BCMoBAAC-Au8BIgcLAACWAgAgJAAAvwIAICUAAL8CACDDAQAAAO8BAsQBAAAA7wEIxQEAAADvAQjKAQAAvgLvASIEwwEAAADvAQLEAQAAAO8BCMUBAAAA7wEIygEAAL8C7wEiGLoBAADAAgAwuwEAAFoAELwBAADAAgAwvQEBAJMCACHBAUAAlAIAIcIBQACUAgAh2wEBAJMCACHeAQEAkwIAIe0BEAC5AgAh8AEBAJMCACHxAQEAkwIAIfIBAQCTAgAh8wEBAJ4CACH1AQAAwQL1ASL2AQEAngIAIfcBAQCTAgAh-AEBAJMCACH5ARAAwgIAIfoBAgCxAgAh-wEAAMMCACD8ASAApwIAIf0BQACfAgAh_gEBAJ4CACH_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-gECANUCACH7AQAAwwIAIPwBIADMAgAh_QFAAN8CACH-AQEAtgIAIf8BAgDVAgAhiQIAAAMAIIoCAAADACALAwAAtwIAIAoAANsCACC6AQAA2QIAMLsBAAAUABC8AQAA2QIAML0BAQCbAgAhwQFAAJwCACHQAQEAmwIAIeMBAADaAu8BIugBAQCbAgAh7wEQANYCACEEwwEAAADvAQLEAQAAAO8BCMUBAAAA7wEIygEAAL8C7wEiA4QCAAAYACCFAgAAGAAghgIAABgAIALQAQEAAAAB5gEBAAAAAQsDAAC3AgAgBwAA2AIAILoBAADdAgAwuwEAABAAELwBAADdAgAwvQEBAJsCACHBAUAAnAIAIdABAQCbAgAh5AECANUCACHlAQEAmwIAIeYBAQCbAgAhEQMAALcCACC6AQAA3gIAMLsBAAALABC8AQAA3gIAML0BAQCbAgAhwQFAAJwCACHCAUAAnAIAIc4BAQCbAgAhzwEBAJsCACHQAQEAmwIAIdEBAQC2AgAh0gEBALYCACHTAQEAtgIAIdQBQADfAgAh1QFAAN8CACHWAQEAtgIAIdcBAQC2AgAhCMMBQAAAAAHEAUAAAAAFxQFAAAAABcYBQAAAAAHHAUAAAAAByAFAAAAAAckBQAAAAAHKAUAAogIAIQwDAAC3AgAgugEAAOACADC7AQAABwAQvAEAAOACADC9AQEAmwIAIcABQACcAgAhwQFAAJwCACHCAUAAnAIAIdABAQCbAgAh2AEBAJsCACHZAQEAtgIAIdoBAQC2AgAhAtsBAQAAAAHwAQEAAAABHQgAANECACAMAADbAgAgDwAAtwIAIBAAAOUCACARAADmAgAgugEAAOICADC7AQAAAwAQvAEAAOICADC9AQEAmwIAIcEBQACcAgAhwgFAAJwCACHbAQEAmwIAId4BAQCbAgAh7QEQANYCACHwAQEAmwIAIfEBAQCbAgAh8gEBAJsCACHzAQEAtgIAIfUBAADjAvUBIvYBAQC2AgAh9wEBAJsCACH4AQEAmwIAIfkBEADkAgAh-gECANUCACH7AQAAwwIAIPwBIADMAgAh_QFAAN8CACH-AQEAtgIAIf8BAgDVAgAhBMMBAAAA9QECxAEAAAD1AQjFAQAAAPUBCMoBAADHAvUBIgjDARAAAAABxAEQAAAABcUBEAAAAAXGARAAAAABxwEQAAAAAcgBEAAAAAHJARAAAAABygEQAMUCACENDgAAygIAILoBAADJAgAwuwEAADEAELwBAADJAgAwvQEBAJsCACHBAUAAnAIAIcIBQACcAgAh2wEBAJsCACHeAQEAtgIAIfcBAQC2AgAhgwIBAJsCACGJAgAAMQAgigIAADEAIAOEAgAAKAAghQIAACgAIIYCAAAoACAAAAABjgIBAAAAAQGOAkAAAAABAAAAAAGOAgEAAAABAY4CQAAAAAEFHgAAhQUAIB8AAIgFACCLAgAAhgUAIIwCAACHBQAgkQIAACoAIAMeAACFBQAgiwIAAIYFACCRAgAAKgAgAAAABR4AAIAFACAfAACDBQAgiwIAAIEFACCMAgAAggUAIJECAAAqACADHgAAgAUAIIsCAACBBQAgkQIAACoAIAAAAAGOAiAAAAABAY4CAAAA4QECAY4CAAAA4wECCx4AAMQDADAfAACTBAAwiwIAAMUDADCMAgAAkgQAMI0CAADGAwAgjgIAAMcDADCPAgAAxwMAMJACAADHAwAwkQIAAMcDADCSAgAAlAQAMJMCAACVBAAwCx4AAL8DADAfAACMBAAwiwIAAMADADCMAgAAiwQAMI0CAADBAwAgjgIAAMIDADCPAgAAwgMAMJACAADCAwAwkQIAAMIDADCSAgAAjQQAMJMCAACOBAAwCh4AAIEEADAfAACEBAAwiwIAAIIEADCMAgAAgwQAMI4CAACKAwAwjwIAAIoDADCQAgAAigMAMJECAACKAwAwkgIAAIUEADCTAgAAjQMAMAseAAC5AwAwHwAA_AMAMIsCAAC6AwAwjAIAAPsDADCNAgAAuwMAII4CAAC8AwAwjwIAALwDADCQAgAAvAMAMJECAAC8AwAwkgIAAP0DADCTAgAAzwMAMAseAACtAwAwHwAA7QMAMIsCAACuAwAwjAIAAOwDADCNAgAArwMAII4CAACwAwAwjwIAALADADCQAgAAsAMAMJECAACwAwAwkgIAAO4DADCTAgAA7wMAMAceAACrAwAgHwAA6gMAIIsCAACsAwAgjAIAAOkDACCPAgAAHQAgkAIAAB0AIJECAACJAQAgCx4AAIYDADAfAACLAwAwiwIAAIcDADCMAgAAiAMAMI0CAACJAwAgjgIAAIoDADCPAgAAigMAMJACAACKAwAwkQIAAIoDADCSAgAAjAMAMJMCAACNAwAwGAgAAOcDACAMAADmAwAgEAAA5QMAIBEAAOgDACC9AQEAAAABwQFAAAAAAcIBQAAAAAHbAQEAAAAB3gEBAAAAAe0BEAAAAAHxAQEAAAAB8gEBAAAAAfMBAQAAAAH1AQAAAPUBAvYBAQAAAAH3AQEAAAAB-AEBAAAAAfkBEAAAAAH6AQIAAAAB-wEAAOQDACD8ASAAAAAB_QFAAAAAAf4BAQAAAAH_AQIAAAABAgAAAAUAIB4AAOMDACADAAAABQAgHgAA4wMAIB8AAJUDACABFwAA_wQAMB4IAADRAgAgDAAA2wIAIA8AALcCACAQAADlAgAgEQAA5gIAILoBAADiAgAwuwEAAAMAELwBAADiAgAwvQEBAAAAAcEBQACcAgAhwgFAAJwCACHbAQEAmwIAId4BAQCbAgAh7QEQANYCACHwAQEAmwIAIfEBAQCbAgAh8gEBAJsCACHzAQEAtgIAIfUBAADjAvUBIvYBAQC2AgAh9wEBAJsCACH4AQEAmwIAIfkBEADkAgAh-gECANUCACH7AQAAwwIAIPwBIADMAgAh_QFAAN8CACH-AQEAtgIAIf8BAgDVAgAhiAIAAOECACACAAAABQAgFwAAlQMAIAIAAACOAwAgFwAAjwMAIBi6AQAAjQMAMLsBAACOAwAQvAEAAI0DADC9AQEAmwIAIcEBQACcAgAhwgFAAJwCACHbAQEAmwIAId4BAQCbAgAh7QEQANYCACHwAQEAmwIAIfEBAQCbAgAh8gEBAJsCACHzAQEAtgIAIfUBAADjAvUBIvYBAQC2AgAh9wEBAJsCACH4AQEAmwIAIfkBEADkAgAh-gECANUCACH7AQAAwwIAIPwBIADMAgAh_QFAAN8CACH-AQEAtgIAIf8BAgDVAgAhGLoBAACNAwAwuwEAAI4DABC8AQAAjQMAML0BAQCbAgAhwQFAAJwCACHCAUAAnAIAIdsBAQCbAgAh3gEBAJsCACHtARAA1gIAIfABAQCbAgAh8QEBAJsCACHyAQEAmwIAIfMBAQC2AgAh9QEAAOMC9QEi9gEBALYCACH3AQEAmwIAIfgBAQCbAgAh-QEQAOQCACH6AQIA1QIAIfsBAADDAgAg_AEgAMwCACH9AUAA3wIAIf4BAQC2AgAh_wECANUCACEUvQEBAOoCACHBAUAA6wIAIcIBQADrAgAh2wEBAOoCACHeAQEA6gIAIe0BEACRAwAh8QEBAOoCACHyAQEA6gIAIfMBAQDwAgAh9QEAAJAD9QEi9gEBAPACACH3AQEA6gIAIfgBAQDqAgAh-QEQAJIDACH6AQIAkwMAIfsBAACUAwAg_AEgAPwCACH9AUAA8QIAIf4BAQDwAgAh_wECAJMDACEBjgIAAAD1AQIFjgIQAAAAAZUCEAAAAAGWAhAAAAABlwIQAAAAAZgCEAAAAAEFjgIQAAAAAZUCEAAAAAGWAhAAAAABlwIQAAAAAZgCEAAAAAEFjgICAAAAAZUCAgAAAAGWAgIAAAABlwICAAAAAZgCAgAAAAECjgIBAAAABJQCAQAAAAUYCAAAmAMAIAwAAJcDACAQAACWAwAgEQAAmQMAIL0BAQDqAgAhwQFAAOsCACHCAUAA6wIAIdsBAQDqAgAh3gEBAOoCACHtARAAkQMAIfEBAQDqAgAh8gEBAOoCACHzAQEA8AIAIfUBAACQA_UBIvYBAQDwAgAh9wEBAOoCACH4AQEA6gIAIfkBEACSAwAh-gECAJMDACH7AQAAlAMAIPwBIAD8AgAh_QFAAPECACH-AQEA8AIAIf8BAgCTAwAhBR4AAOkEACAfAAD9BAAgiwIAAOoEACCMAgAA_AQAIJECAAABACALHgAA1gMAMB8AANoDADCLAgAA1wMAMIwCAADYAwAwjQIAANkDACCOAgAAtgMAMI8CAAC2AwAwkAIAALYDADCRAgAAtgMAMJICAADbAwAwkwIAANwDADALHgAAyQMAMB8AAM0DADCLAgAAygMAMIwCAADLAwAwjQIAAMwDACCOAgAAvAMAMI8CAAC8AwAwkAIAALwDADCRAgAAvAMAMJICAADOAwAwkwIAAM8DADAKHgAAmgMAMB8AAJ4DADCLAgAAmwMAMIwCAACcAwAwjgIAAJ0DADCPAgAAnQMAMJACAACdAwAwkQIAAJ0DADCSAgAAnwMAMJMCAACgAwAwEAQAAKUDACAFAACmAwAgCAAApwMAIAwAAKgDACANAACpAwAgDgAAqgMAIL0BAQAAAAHBAUAAAAABwgFAAAAAAdsBAQAAAAHcAQEAAAAB3QEgAAAAAd4BAQAAAAHfAQEAAAAB4QEAAADhAQLjAQAAAOMBAgIAAAAqACAeAACkAwAgAwAAACoAIB4AAKQDACAfAACjAwAgFAQAAM8CACAFAADQAgAgBgAAygIAIAgAANECACAMAADSAgAgDQAA0wIAIA4AAMoCACC6AQAAywIAMLsBAAAoABC8AQAAywIAML0BAQAAAAHBAUAAnAIAIcIBQACcAgAh2wEBAJsCACHcAQEAAAAB3QEgAMwCACHeAQEAtgIAId8BAQC2AgAh4QEAAM0C4QEi4wEAAM4C4wEiAgAAACoAIBcAAKMDACACAAAAoQMAIBcAAKIDACANugEAAKADADC7AQAAoQMAELwBAACgAwAwvQEBAJsCACHBAUAAnAIAIcIBQACcAgAh2wEBAJsCACHcAQEAmwIAId0BIADMAgAh3gEBALYCACHfAQEAtgIAIeEBAADNAuEBIuMBAADOAuMBIg26AQAAoAMAMLsBAAChAwAQvAEAAKADADC9AQEAmwIAIcEBQACcAgAhwgFAAJwCACHbAQEAmwIAIdwBAQCbAgAh3QEgAMwCACHeAQEAtgIAId8BAQC2AgAh4QEAAM0C4QEi4wEAAM4C4wEiCr0BAQDqAgAhwQFAAOsCACHCAUAA6wIAIdsBAQDqAgAh3AEBAOoCACHdASAA_AIAId4BAQDwAgAh3wEBAPACACHhAQAA_QLhASLjAQAA_gLjASIQBAAA_wIAIAUAAIADACAIAACCAwAgDAAAgwMAIA0AAIQDACAOAACFAwAgvQEBAOoCACHBAUAA6wIAIcIBQADrAgAh2wEBAOoCACHcAQEA6gIAId0BIAD8AgAh3gEBAPACACHfAQEA8AIAIeEBAAD9AuEBIuMBAAD-AuMBIhAEAAClAwAgBQAApgMAIAgAAKcDACAMAACoAwAgDQAAqQMAIA4AAKoDACC9AQEAAAABwQFAAAAAAcIBQAAAAAHbAQEAAAAB3AEBAAAAAd0BIAAAAAHeAQEAAAAB3wEBAAAAAeEBAAAA4QEC4wEAAADjAQIEHgAAxAMAMIsCAADFAwAwjQIAAMYDACCRAgAAxwMAMAQeAAC_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_gEBAAAAAf8BAgAAAAEBjgIBAAAABAMeAADpBAAgiwIAAOoEACCRAgAAAQAgBB4AANYDADCLAgAA1wMAMI0CAADZAwAgkQIAALYDADAEHgAAyQMAMIsCAADKAwAwjQIAAMwDACCRAgAAvAMAMAMeAACaAwAwiwIAAJsDADCRAgAAnQMAMAMAAAAdACAeAACrAwAgHwAA6wMAIAkAAAAdACAXAADrAwAgvQEBAOoCACHBAUAA6wIAIcIBQADrAgAh5wEBAPACACHoAQEA6gIAIekBAQDqAgAh6gEBAOoCACEHvQEBAOoCACHBAUAA6wIAIcIBQADrAgAh5wEBAPACACHoAQEA6gIAIekBAQDqAgAh6gEBAOoCACEDAAAAFgAgHgAAsQMAIB8AAPMDACACAAAAFgAgFwAA8wMAIAIAAADwAwAgFwAA8QMAIAm6AQAA7wMAMLsBAADwAwAQvAEAAO8DADC9AQEAmwIAIcEBQACcAgAh0AEBAJsCACHjAQAA2gLvASLoAQEAmwIAIe8BEADWAgAhCboBAADvAwAwuwEAAPADABC8AQAA7wMAML0BAQCbAgAhwQFAAJwCACHQAQEAmwIAIeMBAADaAu8BIugBAQCbAgAh7wEQANYCACEFvQEBAOoCACHBAUAA6wIAIeMBAADyA-8BIugBAQDqAgAh7wEQAJEDACEBjgIAAADvAQIGCgAA9AMAIL0BAQDqAgAhwQFAAOsCACHjAQAA8gPvASLoAQEA6gIAIe8BEACRAwAhCx4AALMDADAfAAD2AwAwiwIAALQDADCMAgAA9QMAMI0CAAC1AwAgjgIAALYDADCPAgAAtgMAMJACAAC2AwAwkQIAALYDADCSAgAA9wMAMJMCAADcAwAwAwAAABoAIB4AALcDACAfAAD5AwAgAgAAABoAIBcAAPkDACACAAAA3QMAIBcAAPgDACAEvQEBAOoCACHmAQEA6gIAIewBAgCTAwAh7QEQAJEDACEFBwAA-gMAIL0BAQDqAgAh5gEBAOoCACHsAQIAkwMAIe0BEACRAwAhBR4AAOQEACAfAADnBAAgiwIAAOUEACCMAgAA5gQAIJECAAAFACADAAAAEgAgHgAAvQMAIB8AAP8DACACAAAAEgAgFwAA_wMAIAIAAADQAwAgFwAA_gMAIAW9AQEA6gIAIcEBQADrAgAh5AECAJMDACHlAQEA6gIAIeYBAQDqAgAhBgcAAIAEACC9AQEA6gIAIcEBQADrAgAh5AECAJMDACHlAQEA6gIAIeYBAQDqAgAhBR4AAN8EACAfAADiBAAgiwIAAOAEACCMAgAA4QQAIJECAAAFACAZCAAA5wMAIAwAAOYDACAPAACKBAAgEAAA5QMAIL0BAQAAAAHBAUAAAAABwgFAAAAAAdsBAQAAAAHeAQEAAAAB7QEQAAAAAfABAQAAAAHxAQEAAAAB8gEBAAAAAfMBAQAAAAH1AQAAAPUBAvYBAQAAAAH3AQEAAAAB-AEBAAAAAfkBEAAAAAH6AQIAAAAB-wEAAOQDACD8ASAAAAAB_QFAAAAAAf4BAQAAAAH_AQIAAAABAgAAAAUAIB4AAIkEACADAAAABQAgHgAAiQQAIB8AAIcEACACAAAABQAgFwAAhwQAIAIAAACOAwAgFwAAhgQAIBW9AQEA6gIAIcEBQADrAgAhwgFAAOsCACHbAQEA6gIAId4BAQDqAgAh7QEQAJEDACHwAQEA6gIAIfEBAQDqAgAh8gEBAOoCACHzAQEA8AIAIfUBAACQA_UBIvYBAQDwAgAh9wEBAOoCACH4AQEA6gIAIfkBEACSAwAh-gECAJMDACH7AQAAlAMAIPwBIAD8AgAh_QFAAPECACH-AQEA8AIAIf8BAgCTAwAhGQgAAJgDACAMAACXAwAgDwAAiAQAIBAAAJYDACC9AQEA6gIAIcEBQADrAgAhwgFAAOsCACHbAQEA6gIAId4BAQDqAgAh7QEQAJEDACHwAQEA6gIAIfEBAQDqAgAh8gEBAOoCACHzAQEA8AIAIfUBAACQA_UBIvYBAQDwAgAh9wEBAOoCACH4AQEA6gIAIfkBEACSAwAh-gECAJMDACH7AQAAlAMAIPwBIAD8AgAh_QFAAPECACH-AQEA8AIAIf8BAgCTAwAhBR4AANoEACAfAADdBAAgiwIAANsEACCMAgAA3AQAIJECAAAqACAZCAAA5wMAIAwAAOYDACAPAACKBAAgEAAA5QMAIL0BAQAAAAHBAUAAAAABwgFAAAAAAdsBAQAAAAHeAQEAAAAB7QEQAAAAAfABAQAAAAHxAQEAAAAB8gEBAAAAAfMBAQAAAAH1AQAAAPUBAvYBAQAAAAH3AQEAAAAB-AEBAAAAAfkBEAAAAAH6AQIAAAAB-wEAAOQDACD8ASAAAAAB_QFAAAAAAf4BAQAAAAH_AQIAAAABAx4AANoEACCLAgAA2wQAIJECAAAqACADAAAADQAgHgAAwwMAIB8AAJEEACACAAAADQAgFwAAkQQAIAIAAACPBAAgFwAAkAQAIBC6AQAAjgQAMLsBAACPBAAQvAEAAI4EADC9AQEAmwIAIcEBQACcAgAhwgFAAJwCACHOAQEAmwIAIc8BAQCbAgAh0AEBAJsCACHRAQEAtgIAIdIBAQC2AgAh0wEBALYCACHUAUAA3wIAIdUBQADfAgAh1gEBALYCACHXAQEAtgIAIRC6AQAAjgQAMLsBAACPBAAQvAEAAI4EADC9AQEAmwIAIcEBQACcAgAhwgFAAJwCACHOAQEAmwIAIc8BAQCbAgAh0AEBAJsCACHRAQEAtgIAIdIBAQC2AgAh0wEBALYCACHUAUAA3wIAIdUBQADfAgAh1gEBALYCACHXAQEAtgIAIQy9AQEA6gIAIcEBQADrAgAhwgFAAOsCACHOAQEA6gIAIc8BAQDqAgAh0QEBAPACACHSAQEA8AIAIdMBAQDwAgAh1AFAAPECACHVAUAA8QIAIdYBAQDwAgAh1wEBAPACACEMvQEBAOoCACHBAUAA6wIAIcIBQADrAgAhzgEBAOoCACHPAQEA6gIAIdEBAQDwAgAh0gEBAPACACHTAQEA8AIAIdQBQADxAgAh1QFAAPECACHWAQEA8AIAIdcBAQDwAgAhAwAAAAkAIB4AAMgDACAfAACYBAAgAgAAAAkAIBcAAJgEACACAAAAlgQAIBcAAJcEACALugEAAJUEADC7AQAAlgQAELwBAACVBAAwvQEBAJsCACHAAUAAnAIAIcEBQACcAgAhwgFAAJwCACHQAQEAmwIAIdgBAQCbAgAh2QEBALYCACHaAQEAtgIAIQu6AQAAlQQAMLsBAACWBAAQvAEAAJUEADC9AQEAmwIAIcABQACcAgAhwQFAAJwCACHCAUAAnAIAIdABAQCbAgAh2AEBAJsCACHZAQEAtgIAIdoBAQC2AgAhB70BAQDqAgAhwAFAAOsCACHBAUAA6wIAIcIBQADrAgAh2AEBAOoCACHZAQEA8AIAIdoBAQDwAgAhB70BAQDqAgAhwAFAAOsCACHBAUAA6wIAIcIBQADrAgAh2AEBAOoCACHZAQEA8AIAIdoBAQDwAgAhAx4AAIEEADCLAgAAggQAMJECAACKAwAwAAAAAAAAAAAFHgAA1QQAIB8AANgEACCLAgAA1gQAIIwCAADXBAAgkQIAACoAIAMeAADVBAAgiwIAANYEACCRAgAAKgAgCQQAAMUEACAFAADGBAAgBgAAxAQAIAgAAMcEACAMAADIBAAgDQAAyQQAIA4AAMQEACDeAQAA7AIAIN8BAADsAgAgAAAAAAAAAAAAAAUeAADQBAAgHwAA0wQAIIsCAADRBAAgjAIAANIEACCRAgAAKgAgAx4AANAEACCLAgAA0QQAIJECAAAqACAAAAAAAAAAAAseAAC6BAAwHwAAvgQAMIsCAAC7BAAwjAIAALwEADCNAgAAvQQAII4CAACKAwAwjwIAAIoDADCQAgAAigMAMJECAACKAwAwkgIAAL8EADCTAgAAjQMAMBgIAADnAwAgDAAA5gMAIA8AAIoEACARAADoAwAgvQEBAAAAAcEBQAAAAAHCAUAAAAAB2wEBAAAAAd4BAQAAAAHtARAAAAAB8AEBAAAAAfIBAQAAAAHzAQEAAAAB9QEAAAD1AQL2AQEAAAAB9wEBAAAAAfgBAQAAAAH5ARAAAAAB-gECAAAAAfsBAADkAwAg_AEgAAAAAf0BQAAAAAH-AQEAAAAB_wECAAAAAQIAAAAFACAeAADCBAAgAwAAAAUAIB4AAMIEACAfAADBBAAgARcAAM8EADACAAAABQAgFwAAwQQAIAIAAACOAwAgFwAAwAQAIBS9AQEA6gIAIcEBQADrAgAhwgFAAOsCACHbAQEA6gIAId4BAQDqAgAh7QEQAJEDACHwAQEA6gIAIfIBAQDqAgAh8wEBAPACACH1AQAAkAP1ASL2AQEA8AIAIfcBAQDqAgAh-AEBAOoCACH5ARAAkgMAIfoBAgCTAwAh-wEAAJQDACD8ASAA_AIAIf0BQADxAgAh_gEBAPACACH_AQIAkwMAIRgIAACYAwAgDAAAlwMAIA8AAIgEACARAACZAwAgvQEBAOoCACHBAUAA6wIAIcIBQADrAgAh2wEBAOoCACHeAQEA6gIAIe0BEACRAwAh8AEBAOoCACHyAQEA6gIAIfMBAQDwAgAh9QEAAJAD9QEi9gEBAPACACH3AQEA6gIAIfgBAQDqAgAh-QEQAJIDACH6AQIAkwMAIfsBAACUAwAg_AEgAPwCACH9AUAA8QIAIf4BAQDwAgAh_wECAJMDACEYCAAA5wMAIAwAAOYDACAPAACKBAAgEQAA6AMAIL0BAQAAAAHBAUAAAAABwgFAAAAAAdsBAQAAAAHeAQEAAAAB7QEQAAAAAfABAQAAAAHyAQEAAAAB8wEBAAAAAfUBAAAA9QEC9gEBAAAAAfcBAQAAAAH4AQEAAAAB-QEQAAAAAfoBAgAAAAH7AQAA5AMAIPwBIAAAAAH9AUAAAAAB_gEBAAAAAf8BAgAAAAEEHgAAugQAMIsCAAC7BAAwjQIAAL0EACCRAgAAigMAMAAAAAAAAgMAAKQEACDnAQAA7AIAIAIDAACkBAAgCgAAzAQAIAoIAADHBAAgDAAAzAQAIA8AAKQEACAQAADNBAAgEQAAzgQAIPMBAADsAgAg9gEAAOwCACD5AQAA7AIAIP0BAADsAgAg_gEAAOwCACAAAw4AAMQEACDeAQAA7AIAIPcBAADsAgAgABS9AQEAAAABwQFAAAAAAcIBQAAAAAHbAQEAAAAB3gEBAAAAAe0BEAAAAAHwAQEAAAAB8gEBAAAAAfMBAQAAAAH1AQAAAPUBAvYBAQAAAAH3AQEAAAAB-AEBAAAAAfkBEAAAAAH6AQIAAAAB-wEAAOQDACD8ASAAAAAB_QFAAAAAAf4BAQAAAAH_AQIAAAABEAQAAKUDACAFAACmAwAgBgAAmQQAIAgAAKcDACANAACpAwAgDgAAqgMAIL0BAQAAAAHBAUAAAAABwgFAAAAAAdsBAQAAAAHcAQEAAAAB3QEgAAAAAd4BAQAAAAHfAQEAAAAB4QEAAADhAQLjAQAAAOMBAgIAAAAqACAeAADQBAAgAwAAACgAIB4AANAEACAfAADUBAAgEgAAACgAIAQAAP8CACAFAACAAwAgBgAAgQMAIAgAAIIDACANAACEAwAgDgAAhQMAIBcAANQEACC9AQEA6gIAIcEBQADrAgAhwgFAAOsCACHbAQEA6gIAIdwBAQDqAgAh3QEgAPwCACHeAQEA8AIAId8BAQDwAgAh4QEAAP0C4QEi4wEAAP4C4wEiEAQAAP8CACAFAACAAwAgBgAAgQMAIAgAAIIDACANAACEAwAgDgAAhQMAIL0BAQDqAgAhwQFAAOsCACHCAUAA6wIAIdsBAQDqAgAh3AEBAOoCACHdASAA_AIAId4BAQDwAgAh3wEBAPACACHhAQAA_QLhASLjAQAA_gLjASIQBAAApQMAIAUAAKYDACAGAACZBAAgCAAApwMAIAwAAKgDACAOAACqAwAgvQEBAAAAAcEBQAAAAAHCAUAAAAAB2wEBAAAAAdwBAQAAAAHdASAAAAAB3gEBAAAAAd8BAQAAAAHhAQAAAOEBAuMBAAAA4wECAgAAACoAIB4AANUEACADAAAAKAAgHgAA1QQAIB8AANkEACASAAAAKAAgBAAA_wIAIAUAAIADACAGAACBAwAgCAAAggMAIAwAAIMDACAOAACFAwAgFwAA2QQAIL0BAQDqAgAhwQFAAOsCACHCAUAA6wIAIdsBAQDqAgAh3AEBAOoCACHdASAA_AIAId4BAQDwAgAh3wEBAPACACHhAQAA_QLhASLjAQAA_gLjASIQBAAA_wIAIAUAAIADACAGAACBAwAgCAAAggMAIAwAAIMDACAOAACFAwAgvQEBAOoCACHBAUAA6wIAIcIBQADrAgAh2wEBAOoCACHcAQEA6gIAId0BIAD8AgAh3gEBAPACACHfAQEA8AIAIeEBAAD9AuEBIuMBAAD-AuMBIhAEAAClAwAgBQAApgMAIAYAAJkEACAIAACnAwAgDAAAqAMAIA0AAKkDACC9AQEAAAABwQFAAAAAAcIBQAAAAAHbAQEAAAAB3AEBAAAAAd0BIAAAAAHeAQEAAAAB3wEBAAAAAeEBAAAA4QEC4wEAAADjAQICAAAAKgAgHgAA2gQAIAMAAAAoACAeAADaBAAgHwAA3gQAIBIAAAAoACAEAAD_AgAgBQAAgAMAIAYAAIEDACAIAACCAwAgDAAAgwMAIA0AAIQDACAXAADeBAAgvQEBAOoCACHBAUAA6wIAIcIBQADrAgAh2wEBAOoCACHcAQEA6gIAId0BIAD8AgAh3gEBAPACACHfAQEA8AIAIeEBAAD9AuEBIuMBAAD-AuMBIhAEAAD_AgAgBQAAgAMAIAYAAIEDACAIAACCAwAgDAAAgwMAIA0AAIQDACC9AQEA6gIAIcEBQADrAgAhwgFAAOsCACHbAQEA6gIAIdwBAQDqAgAh3QEgAPwCACHeAQEA8AIAId8BAQDwAgAh4QEAAP0C4QEi4wEAAP4C4wEiGQwAAOYDACAPAACKBAAgEAAA5QMAIBEAAOgDACC9AQEAAAABwQFAAAAAAcIBQAAAAAHbAQEAAAAB3gEBAAAAAe0BEAAAAAHwAQEAAAAB8QEBAAAAAfIBAQAAAAHzAQEAAAAB9QEAAAD1AQL2AQEAAAAB9wEBAAAAAfgBAQAAAAH5ARAAAAAB-gECAAAAAfsBAADkAwAg_AEgAAAAAf0BQAAAAAH-AQEAAAAB_wECAAAAAQIAAAAFACAeAADfBAAgAwAAAAMAIB4AAN8EACAfAADjBAAgGwAAAAMAIAwAAJcDACAPAACIBAAgEAAAlgMAIBEAAJkDACAXAADjBAAgvQEBAOoCACHBAUAA6wIAIcIBQADrAgAh2wEBAOoCACHeAQEA6gIAIe0BEACRAwAh8AEBAOoCACHxAQEA6gIAIfIBAQDqAgAh8wEBAPACACH1AQAAkAP1ASL2AQEA8AIAIfcBAQDqAgAh-AEBAOoCACH5ARAAkgMAIfoBAgCTAwAh-wEAAJQDACD8ASAA_AIAIf0BQADxAgAh_gEBAPACACH_AQIAkwMAIRkMAACXAwAgDwAAiAQAIBAAAJYDACARAACZAwAgvQEBAOoCACHBAUAA6wIAIcIBQADrAgAh2wEBAOoCACHeAQEA6gIAIe0BEACRAwAh8AEBAOoCACHxAQEA6gIAIfIBAQDqAgAh8wEBAPACACH1AQAAkAP1ASL2AQEA8AIAIfcBAQDqAgAh-AEBAOoCACH5ARAAkgMAIfoBAgCTAwAh-wEAAJQDACD8ASAA_AIAIf0BQADxAgAh_gEBAPACACH_AQIAkwMAIRkIAADnAwAgDwAAigQAIBAAAOUDACARAADoAwAgvQEBAAAAAcEBQAAAAAHCAUAAAAAB2wEBAAAAAd4BAQAAAAHtARAAAAAB8AEBAAAAAfEBAQAAAAHyAQEAAAAB8wEBAAAAAfUBAAAA9QEC9gEBAAAAAfcBAQAAAAH4AQEAAAAB-QEQAAAAAfoBAgAAAAH7AQAA5AMAIPwBIAAAAAH9AUAAAAAB_gEBAAAAAf8BAgAAAAECAAAABQAgHgAA5AQAIAMAAAADACAeAADkBAAgHwAA6AQAIBsAAAADACAIAACYAwAgDwAAiAQAIBAAAJYDACARAACZAwAgFwAA6AQAIL0BAQDqAgAhwQFAAOsCACHCAUAA6wIAIdsBAQDqAgAh3gEBAOoCACHtARAAkQMAIfABAQDqAgAh8QEBAOoCACHyAQEA6gIAIfMBAQDwAgAh9QEAAJAD9QEi9gEBAPACACH3AQEA6gIAIfgBAQDqAgAh-QEQAJIDACH6AQIAkwMAIfsBAACUAwAg_AEgAPwCACH9AUAA8QIAIf4BAQDwAgAh_wECAJMDACEZCAAAmAMAIA8AAIgEACAQAACWAwAgEQAAmQMAIL0BAQDqAgAhwQFAAOsCACHCAUAA6wIAIdsBAQDqAgAh3gEBAOoCACHtARAAkQMAIfABAQDqAgAh8QEBAOoCACHyAQEA6gIAIfMBAQDwAgAh9QEAAJAD9QEi9gEBAPACACH3AQEA6gIAIfgBAQDqAgAh-QEQAJIDACH6AQIAkwMAIfsBAACUAwAg_AEgAPwCACH9AUAA8QIAIf4BAQDwAgAh_wECAJMDACEHvQEBAAAAAcEBQAAAAAHCAUAAAAAB2wEBAAAAAd4BAQAAAAH3AQEAAAABgwIBAAAAAQIAAAABACAeAADpBAAgBwMAALAEACC9AQEAAAABwQFAAAAAAdABAQAAAAHjAQAAAO8BAugBAQAAAAHvARAAAAABAgAAABYAIB4AAOsEACADAAAAFAAgHgAA6wQAIB8AAO8EACAJAAAAFAAgAwAArwQAIBcAAO8EACC9AQEA6gIAIcEBQADrAgAh0AEBAOoCACHjAQAA8gPvASLoAQEA6gIAIe8BEACRAwAhBwMAAK8EACC9AQEA6gIAIcEBQADrAgAh0AEBAOoCACHjAQAA8gPvASLoAQEA6gIAIe8BEACRAwAhBL0BAQAAAAHrAQEAAAAB7AECAAAAAe0BEAAAAAEQBAAApQMAIAUAAKYDACAGAACZBAAgDAAAqAMAIA0AAKkDACAOAACqAwAgvQEBAAAAAcEBQAAAAAHCAUAAAAAB2wEBAAAAAdwBAQAAAAHdASAAAAAB3gEBAAAAAd8BAQAAAAHhAQAAAOEBAuMBAAAA4wECAgAAACoAIB4AAPEEACADAAAAKAAgHgAA8QQAIB8AAPUEACASAAAAKAAgBAAA_wIAIAUAAIADACAGAACBAwAgDAAAgwMAIA0AAIQDACAOAACFAwAgFwAA9QQAIL0BAQDqAgAhwQFAAOsCACHCAUAA6wIAIdsBAQDqAgAh3AEBAOoCACHdASAA_AIAId4BAQDwAgAh3wEBAPACACHhAQAA_QLhASLjAQAA_gLjASIQBAAA_wIAIAUAAIADACAGAACBAwAgDAAAgwMAIA0AAIQDACAOAACFAwAgvQEBAOoCACHBAUAA6wIAIcIBQADrAgAh2wEBAOoCACHcAQEA6gIAId0BIAD8AgAh3gEBAPACACHfAQEA8AIAIeEBAAD9AuEBIuMBAAD-AuMBIgW9AQEAAAABwQFAAAAAAdABAQAAAAHkAQIAAAAB5QEBAAAAAQe9AQEAAAABwAFAAAAAAcEBQAAAAAHCAUAAAAAB2AEBAAAAAdkBAQAAAAHaAQEAAAABDL0BAQAAAAHBAUAAAAABwgFAAAAAAc4BAQAAAAHPAQEAAAAB0QEBAAAAAdIBAQAAAAHTAQEAAAAB1AFAAAAAAdUBQAAAAAHWAQEAAAAB1wEBAAAAAQW9AQEAAAABwQFAAAAAAeQBAgAAAAHlAQEAAAAB5gEBAAAAAQS9AQEAAAAB5gEBAAAAAewBAgAAAAHtARAAAAABBb0BAQAAAAHBAUAAAAAB4wEAAADvAQLoAQEAAAAB7wEQAAAAAQMAAAAxACAeAADpBAAgHwAA_gQAIAkAAAAxACAXAAD-BAAgvQEBAOoCACHBAUAA6wIAIcIBQADrAgAh2wEBAOoCACHeAQEA8AIAIfcBAQDwAgAhgwIBAOoCACEHvQEBAOoCACHBAUAA6wIAIcIBQADrAgAh2wEBAOoCACHeAQEA8AIAIfcBAQDwAgAhgwIBAOoCACEUvQEBAAAAAcEBQAAAAAHCAUAAAAAB2wEBAAAAAd4BAQAAAAHtARAAAAAB8QEBAAAAAfIBAQAAAAHzAQEAAAAB9QEAAAD1AQL2AQEAAAAB9wEBAAAAAfgBAQAAAAH5ARAAAAAB-gECAAAAAfsBAADkAwAg_AEgAAAAAf0BQAAAAAH-AQEAAAAB_wECAAAAARAFAACmAwAgBgAAmQQAIAgAAKcDACAMAACoAwAgDQAAqQMAIA4AAKoDACC9AQEAAAABwQFAAAAAAcIBQAAAAAHbAQEAAAAB3AEBAAAAAd0BIAAAAAHeAQEAAAAB3wEBAAAAAeEBAAAA4QEC4wEAAADjAQICAAAAKgAgHgAAgAUAIAMAAAAoACAeAACABQAgHwAAhAUAIBIAAAAoACAFAACAAwAgBgAAgQMAIAgAAIIDACAMAACDAwAgDQAAhAMAIA4AAIUDACAXAACEBQAgvQEBAOoCACHBAUAA6wIAIcIBQADrAgAh2wEBAOoCACHcAQEA6gIAId0BIAD8AgAh3gEBAPACACHfAQEA8AIAIeEBAAD9AuEBIuMBAAD-AuMBIhAFAACAAwAgBgAAgQMAIAgAAIIDACAMAACDAwAgDQAAhAMAIA4AAIUDACC9AQEA6gIAIcEBQADrAgAhwgFAAOsCACHbAQEA6gIAIdwBAQDqAgAh3QEgAPwCACHeAQEA8AIAId8BAQDwAgAh4QEAAP0C4QEi4wEAAP4C4wEiEAQAAKUDACAGAACZBAAgCAAApwMAIAwAAKgDACANAACpAwAgDgAAqgMAIL0BAQAAAAHBAUAAAAABwgFAAAAAAdsBAQAAAAHcAQEAAAAB3QEgAAAAAd4BAQAAAAHfAQEAAAAB4QEAAADhAQLjAQAAAOMBAgIAAAAqACAeAACFBQAgAwAAACgAIB4AAIUFACAfAACJBQAgEgAAACgAIAQAAP8CACAGAACBAwAgCAAAggMAIAwAAIMDACANAACEAwAgDgAAhQMAIBcAAIkFACC9AQEA6gIAIcEBQADrAgAhwgFAAOsCACHbAQEA6gIAIdwBAQDqAgAh3QEgAPwCACHeAQEA8AIAId8BAQDwAgAh4QEAAP0C4QEi4wEAAP4C4wEiEAQAAP8CACAGAACBAwAgCAAAggMAIAwAAIMDACANAACEAwAgDgAAhQMAIL0BAQDqAgAhwQFAAOsCACHCAUAA6wIAIdsBAQDqAgAh3AEBAOoCACHdASAA_AIAId4BAQDwAgAh3wEBAPACACHhAQAA_QLhASLjAQAA_gLjASICCwANDgYCBggnBgsADAwmCA8AAxAAARErAwgECgQFDgUGDwIIEwYLAAsMFwcNHgoOHwIBAwADAQMAAwIDAAMHAAIDAwADChsICwAJAgcAAgkABwEKHAABAwADBgQgAAUhAAYiAAgjAAwkAA4lAAMILQAMLAARLgABDi8AAAAAAwsAEiQAEyUAFAAAAAMLABIkABMlABQCDwADEAABAg8AAxAAAQULABkkABwlAB02ABo3ABsAAAAAAAULABkkABwlAB02ABo3ABsBAwADAQMAAwULACIkACUlACY2ACM3ACQAAAAAAAULACIkACUlACY2ACM3ACQCBwACCQAHAgcAAgkABwULACskAC4lAC82ACw3AC0AAAAAAAULACskAC4lAC82ACw3AC0BAwADAQMAAwMLADQkADUlADYAAAADCwA0JAA1JQA2AgMAAwcAAgIDAAMHAAIFCwA7JAA-JQA_NgA8NwA9AAAAAAAFCwA7JAA-JQA_NgA8NwA9AAADCwBEJABFJQBGAAAAAwsARCQARSUARgEDAAMBAwADAwsASyQATCUATQAAAAMLAEskAEwlAE0BAwADAQMAAwMLAFIkAFMlAFQAAAADCwBSJABTJQBUAAAAAwsAWiQAWyUAXAAAAAMLAFokAFslAFwSAgETMAEUMwEVNAEWNQEYNwEZOQ4aOg8bPAEcPg4dPxAgQAEhQQEiQg4mRREnRhUoRwIpSAIqSQIrSgIsSwItTQIuTw4vUBYwUgIxVA4yVRczVgI0VwI1WA44Wxg5XB46XQc7Xgc8Xwc9YAc-YQc_YwdAZQ5BZh9CaAdDag5EayBFbAdGbQdHbg5IcSFJcidKcwhLdAhMdQhNdghOdwhPeQhQew5RfChSfghTgAEOVIEBKVWCAQhWgwEIV4QBDliHASpZiAEwWooBCluLAQpcjQEKXY4BCl6PAQpfkQEKYJMBDmGUATFilgEKY5gBDmSZATJlmgEKZpsBCmecAQ5onwEzaaABN2qhAQZrogEGbKMBBm2kAQZupQEGb6cBBnCpAQ5xqgE4cqwBBnOuAQ50rwE5dbABBnaxAQZ3sgEOeLUBOnm2AUB6twEDe7gBA3y5AQN9ugEDfrsBA3-9AQOAAb8BDoEBwAFBggHCAQODAcQBDoQBxQFChQHGAQOGAccBA4cByAEOiAHLAUOJAcwBR4oBzQEEiwHOAQSMAc8BBI0B0AEEjgHRAQSPAdMBBJAB1QEOkQHWAUiSAdgBBJMB2gEOlAHbAUmVAdwBBJYB3QEElwHeAQ6YAeEBSpkB4gFOmgHjAQWbAeQBBZwB5QEFnQHmAQWeAecBBZ8B6QEFoAHrAQ6hAewBT6IB7gEFowHwAQ6kAfEBUKUB8gEFpgHzAQWnAfQBDqgB9wFRqQH4AVWqAfoBVqsB-wFWrAH-AVatAf8BVq4BgAJWrwGCAlawAYQCDrEBhQJXsgGHAlazAYkCDrQBigJYtQGLAla2AYwCVrcBjQIOuAGQAlm5AZECXQ"
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
        manufacturer: true
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

// src/app.ts
var app = express();
var allowedOrigins = [
  process.env.APP_URL || "https://shastho-mart-client.vercel.app"
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
