export type PermissionResponse = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type CreatePermissionPayload = {
  name: string;
};

export type UpdatePermissionPayload = {
  id: number;
  name?: string;
};
