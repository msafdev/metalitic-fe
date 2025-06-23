export type Profile = {
  name: string;
  nomorInduk: string;
  devisi: string;
  jabatan: string;
};

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
  alamat: string;
};
