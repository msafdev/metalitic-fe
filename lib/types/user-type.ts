export type User = {
  _id: string;
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
  message: string;
  data: User[];
};
