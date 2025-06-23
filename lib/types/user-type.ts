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
};

export type GetUsersResponse = {
  status: boolean;
  isVerify: boolean;
};

export type UserResponse = {
  message: string;
  data: User[];
};
