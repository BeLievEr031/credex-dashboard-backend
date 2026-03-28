import type { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  refreshToken?: string;
  comparePassword(password: string): Promise<boolean>;
}

export interface IJwtPayload {
  id: string;
  email: string;
}

export interface ILoginResponse {
  success: boolean;
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface IErrorResponse {
  success: boolean;
  message: string;
  errors?: {
    msg: string;
    path: string;
    value: any;
    location: string;
  }[];
}
