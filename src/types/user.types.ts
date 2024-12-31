export type UserResponse = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateUserPayload = {
  name: string;
};

export type UpdateUserPayload = {
  id: number;
  name?: string;
};
