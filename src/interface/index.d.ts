declare global {
  namespace Express {
    interface Request {
      user?: IRequestUser;
    }
  }
}

export interface IRequestUser {
  id: string;
  role: Roles;
  name: string;
  email: string;
  emailVerified: boolean;
  status?: UserStatus;
  isDeleted?: boolean;
}