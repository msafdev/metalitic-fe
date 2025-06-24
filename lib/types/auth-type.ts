export type Profile = {
  name: string;
  nomorInduk: string;
  devisi: string;
  jabatan: string;
  role: Role;
};

export type Role = "superadmin" | "supervisor" | "user";

export type ProfileResponse = {
  message: Profile;
};

export type Register = {
  username: string;
  password: string;
  name: string;
  nomorInduk: string;
  devisi: string;
  jabatan: string;
  email: string;
  noHp: string;
  avatarUser: File;
  alamat: string;
  isAdmin: boolean;
};
