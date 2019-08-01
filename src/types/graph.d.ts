export const typeDefs = ["type User {\n  id: ID!\n  username: String!\n  email: String!\n  avatar: String\n  firstName: String\n  lastName: String\n  bio: String\n  secret: String\n  room: [Room!]\n  message: [Message!]\n  friends: [User!]\n  createdAt: String!\n  updatedAt: String\n}\n\ntype Room {\n  id: ID!\n  entrant: [User!]!\n  messages: [Message!]\n  createdAt: String!\n  updatedAt: String\n}\n\ntype Message {\n  id: ID!\n  text: String!\n  user: User!\n  room: Room!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype ConfirmSecretResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype Mutation {\n  confirmSecret(email: String!, secret: String!): ConfirmSecretResponse!\n  createUser(email: String!, username: String!): CreateUserResponse!\n  requestSecret(email: String!): RequestSecretResponse!\n}\n\ntype CreateUserResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype RequestSecretResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype SeeUserResponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n\ntype Query {\n  seeUser(username: String!): SeeUserResponse!\n}\n"];
/* tslint:disable */

export interface Query {
  seeUser: SeeUserResponse;
}

export interface SeeUserQueryArgs {
  username: string;
}

export interface SeeUserResponse {
  ok: boolean;
  error: string | null;
  user: User | null;
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string | null;
  firstName: string | null;
  lastName: string | null;
  bio: string | null;
  secret: string | null;
  room: Array<Room>;
  message: Array<Message>;
  friends: Array<User>;
  createdAt: string;
  updatedAt: string | null;
}

export interface Room {
  id: string;
  entrant: Array<User>;
  messages: Array<Message>;
  createdAt: string;
  updatedAt: string | null;
}

export interface Message {
  id: string;
  text: string;
  user: User;
  room: Room;
  createdAt: string;
  updatedAt: string | null;
}

export interface Mutation {
  confirmSecret: ConfirmSecretResponse;
  createUser: CreateUserResponse;
  requestSecret: RequestSecretResponse;
}

export interface ConfirmSecretMutationArgs {
  email: string;
  secret: string;
}

export interface CreateUserMutationArgs {
  email: string;
  username: string;
}

export interface RequestSecretMutationArgs {
  email: string;
}

export interface ConfirmSecretResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface CreateUserResponse {
  ok: boolean;
  error: string | null;
}

export interface RequestSecretResponse {
  ok: boolean;
  error: string | null;
}
