import { Role } from "./auth-type";
import { Project } from "./project-type";

export type User = {
  _id: string;
  username: string;
  name: string;
  nomorInduk: string;
  devisi: string;
  jabatan: string;
  email: string;
  noHp: string;
  alamat: string;
  avatarUser: string;
  projects: Partial<Project>[];
  isVerify: boolean;
  role: Role;
};

export type UserResponse = {
  message: string;
  data: User[];
};

export type DetailUserResponse = {
  message: string;
  data: User;
};
