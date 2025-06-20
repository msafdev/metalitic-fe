export type Profile = {
  name: string;
  nomorInduk: string;
  devisi: string;
  jabatan: string;
};

export type ProfileResponse = {
  message: Profile;
};
