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
  filename: string;
  isVerify: boolean;
  role: "superadmin" | "supervisor" | "user";
};

export type UserResponse = {
  message: string;
  data: User[];
};

export type DetailUserResponse = {
  message: string;
  data: User;
};
