export type MenuResponse = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateMenuPayload = {
  name: string;
};

export type UpdateMenuPayload = {
  id: number;
  name?: string;
};
