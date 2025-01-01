export type RoleResponse = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateRolePayload = {
  name: string;
};

export type UpdateRolePayload = {
  id: number;
  name?: string;
};
