export type CreateServiceRequesterRequest = {
  nama: string;
};

export type CreateServiceRequesterResponse = {
  status: boolean;
  message: string;
  data: ServiceRequester;
};

export type ServiceRequester = {
  _id: string;
  nama: string;
  createdAt: string;
  updatedAt: string;
};

export type GetServiceRequesterResponse = {
  status: boolean;
  message: string;
  data: ServiceRequester[];
};
