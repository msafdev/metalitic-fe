export type Project = {
  _id: string;
  namaProject: string;
  permintaanJasa: string;
  sample: string;
  tglPengujian: string;
  lokasiPengujian: string;
  areaPengujian: string;
  posisiPengujian: string;
  material: string;
  GritSandWhell: string;
  ETSA: string;
  kamera: string;
  mikrosopMerk: string;
  mikrosopZoom: string;
  userArrayId: string[];
  createdAt: string;
  updatedAt: string;
};

export type ProjectResponse = {
  message: Project[];
};
