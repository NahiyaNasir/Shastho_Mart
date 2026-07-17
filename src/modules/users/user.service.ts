
import {
  userSearchableFields,
  userFilterableFields,
  userIncludeConfig,
} from "../../config/query.config";
import { User } from "../../generated/prisma/browser";
import { Prisma } from "../../generated/prisma/client";
import { IRequestUser } from "../../interface";
import { IQueryParams, IQueryResult } from "../../interface/QueryBuilder.interface";
import { prisma } from "../../lib/prisma";
import { QueryBuilder } from "../../utils/QueryBuilder";


const getUser = async (user: IRequestUser | undefined) => {
  if (!user?.email) throw new Error("User email is required");

  return await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
    },
    include: {
      profile: true,
    },
  });
};

const getProfile = async (user: IRequestUser | undefined) => {
  if (!user?.id) return null;

  const profile = await prisma.profile.findUnique({
    where: {
      userId: user.id,
    },
    include: {
      user: true,
    },
  });

  if (profile) {
    return profile;
  }

  const userData = await prisma.user.findUnique({
    where: {
      id: user?.id,
    },
  });

  return {
    ...userData,

    bio: null,
    address: null,
    user: user,
  };
};

const updateUser = async (user: IRequestUser | undefined, data: any) => {
  if (!user?.email) throw new Error("User email is required");

  const isExist = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
    },
    select: {
      id: true,
    },
  });

  if (data.role || data.emailVerified || data.status) {
    delete data.role;
    delete data.emailVerified;
    delete data.status;
  }
  return await prisma.user.update({
    where: {
      id: isExist.id,
    },
    data,
  });
};

const getAllUsers = async (
  query: IQueryParams,
  currentUserId: string,
): Promise<IQueryResult<User>> => {
  const queryBuilder = new QueryBuilder<
    User,
    Prisma.UserWhereInput,
    Prisma.UserInclude
  >(prisma.user, query, {
    searchableFields: userSearchableFields,
    filterableFields: userFilterableFields,
  });

  const result = await queryBuilder
    .search()
    .filter()
    .where({ NOT: { id: currentUserId } })
    .dynamicInclude(userIncludeConfig)
    .paginate()
    .sort()
    .fields()
    .execute();

  return result;
};

const updateUserStatus = async (id: string | undefined, data: any) => {
  if (!id) throw new Error("User id is required");

  const isExist = await prisma.user.findUniqueOrThrow({
    where: { id },
    select: { id: true },
  });

  return await prisma.user.update({
    where: {
      id: isExist.id,
    },
    data: {
      status: data?.status,
    },
  });
};

const updateUserRole = async (id: string | undefined, data: any) => {
  if (!id) throw new Error("User id is required");

  const isExist = await prisma.user.findUniqueOrThrow({
    where: { id },
  });

  if (isExist.role === data?.role) {
    return isExist;
  }

  return await prisma.user.update({
    where: {
      id: isExist.id,
    },
    data: {
      role: data.role,
    },
  });
};

const deleteUser = async (id: string) => {
  return await prisma.user.delete({
    where: {
      id,
    },
  });
};

const sellerMetaData = async (id: string) => {
  const totalOrders = await prisma.order.count({
    where: {
      items: {
        some: {
          medicine: {
            sellerId: id,
          },
        },
      },
    },
  });

  console.log(totalOrders);

  const totalMedicines = await prisma.medicine.count({
    where: {
      sellerId: id,
    },
  });

  const totalRevenue = await prisma.order.aggregate({
    where: {
      items: {
        some: {
          medicine: {
            sellerId: id,
          },
        },
      },
    },
    _sum: {
      totalPrice: true,
    },
  });

  return {
    meta: {
      totalOrders,
      totalRevenue: totalRevenue?._sum?.totalPrice || 0,
      totalMedicines,
    },
  };
};
const adminMetaData = async () => {
  const totalSeller = await prisma.user.count({
    where: {
      role: "SELLER",
    },
  });
  const totalCustomer = await prisma.user.count({
    where: {
      role: "CUSTOMER",
    },
  });
  const totalManager = await prisma.user.count({
    where: {
      role: "ADMIN",
    },
  });
  const totalOrders = await prisma.order.count();
  const totalMedicines = await prisma.medicine.count();
  const totalRevenue = await prisma.order.aggregate({
    _sum: {
      totalPrice: true,
    },
  });

  const deliversOrder = await prisma.order.count({
    where: {
      status: "DELIVERED",
    },
  });
  const cancelledOrder = await prisma.order.count({
    where: {
      status: "CANCELLED",
    },
  });
  const pendingOrder = await prisma.order.count({
    where: {
      status: "PENDING",
    },
  });
  const processingOrder = await prisma.order.count({
    where: {
      status: "PROCESSING",
    },
  });
  const shippedOrder = await prisma.order.count({
    where: {
      status: "SHIPPED",
    },
  });

  return {
    meta: {
      totalOrders,
      totalMedicines,
      totalRevenue: totalRevenue?._sum?.totalPrice || 0,
      totalCustomer,
      totalSeller,
      totalManager,
    },
    orders: {
      deliversOrder,
      cancelledOrder,
      pendingOrder,
      processingOrder,
      shippedOrder,
    },
  };
};

const updateProfile = async (id: string, payload: any) => {
  console.log(payload);
  return await prisma.$transaction(async (tx) => {
    if (payload?.user) {
      await tx.user.update({
        where: { id },
        data: {
          name: payload?.user?.name,
          email: payload?.user?.email,
          image: payload?.user?.image,
        },
      });
    }

    const profileData = {
      bio: payload.bio,
      address: payload.address,
      location: payload.location,
      contact_number: payload.contact_number,
    };

    return await tx.profile.upsert({
      where: { userId: id },
      include: { user: true },
      create: {
        userId: id,
        bio: profileData.bio || "",
        address: profileData.address || "Not Provided",
        location: profileData.location || "Not Provided",
        contact_number: profileData.contact_number || "Not Provided",
      },
      update: profileData,
    });
  });
};

export const UserService = {
  getUser,
  updateUser,
  getAllUsers,
  updateUserStatus,
  deleteUser,
  updateUserRole,
  adminMetaData,
  sellerMetaData,
  updateProfile,
  getProfile,
};