export const typeDefs = ["type Subscription {\n  newMessage(userId: String!): Message\n}\n\ntype SendMessageResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Mutation {\n  sendMessage(roomId: String!, text: String!): SendMessageResponse!\n  createRoom(you: [String!]!): CreateRoomResponse!\n  deleteRoom(roomId: String!): DeleteRoomResponse!\n  addFriend(friendId: String!): AddFriendResponse!\n  confirmSecret(email: String!, secret: String!): ConfirmSecretResponse!\n  createUser(email: String!, username: String!): CreateUserResponse!\n  editUser(username: String!, avatar: String, firstName: String, lastName: String, bio: String): EditUserResponse!\n  requestSecret(email: String!): RequestSecretResponse!\n}\n\ntype User {\n  id: ID!\n  username: String!\n  email: String!\n  avatar: String\n  firstName: String\n  lastName: String\n  bio: String\n  secret: String\n  room: [Room!]!\n  message: [Message!]!\n  friends: [User!]!\n  createdAt: String!\n  updatedAt: String\n  createdDate: String\n  createdTime: String\n}\n\ntype Room {\n  id: ID!\n  entrant: [User!]!\n  messages: [Message!]!\n  createdAt: String!\n  updatedAt: String\n  createdDate: String\n  createdTime: String\n}\n\ntype Message {\n  id: ID!\n  text: String!\n  user: User!\n  room: Room!\n  createdAt: String!\n  updatedAt: String\n  createdDate: String\n  createdTime: String\n}\n\ntype CreateRoomResponse {\n  ok: Boolean!\n  error: String\n  room: Room\n}\n\ntype DeleteRoomResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype SeeRoomResponse {\n  ok: Boolean!\n  error: String\n  room: Room\n}\n\ntype Query {\n  seeRoom(roomId: String!): SeeRoomResponse!\n  seeMe: User!\n  seeUser(username: String!): SeeUserResponse!\n}\n\ntype AddFriendResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype ConfirmSecretResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype CreateUserResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype EditUserResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype RequestSecretResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype SeeUserResponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n"];
/* tslint:disable */

export interface Query {
  seeRoom: SeeRoomResponse;
  seeMe: User;
  seeUser: SeeUserResponse;
}

export interface SeeRoomQueryArgs {
  roomId: string;
}

export interface SeeUserQueryArgs {
  username: string;
}

export interface SeeRoomResponse {
  ok: boolean;
  error: string | null;
  room: Room | null;
}

export interface Room {
  id: string;
  entrant: Array<User>;
  messages: Array<Message>;
  createdAt: string;
  updatedAt: string | null;
  createdDate: string | null;
  createdTime: string | null;
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
  createdDate: string | null;
  createdTime: string | null;
}

export interface Message {
  id: string;
  text: string;
  user: User;
  room: Room;
  createdAt: string;
  updatedAt: string | null;
  createdDate: string | null;
  createdTime: string | null;
}

export interface SeeUserResponse {
  ok: boolean;
  error: string | null;
  user: User | null;
}

export interface Mutation {
  sendMessage: SendMessageResponse;
  createRoom: CreateRoomResponse;
  deleteRoom: DeleteRoomResponse;
  addFriend: AddFriendResponse;
  confirmSecret: ConfirmSecretResponse;
  createUser: CreateUserResponse;
  editUser: EditUserResponse;
  requestSecret: RequestSecretResponse;
}

export interface SendMessageMutationArgs {
  roomId: string;
  text: string;
}

export interface CreateRoomMutationArgs {
  you: Array<string>;
}

export interface DeleteRoomMutationArgs {
  roomId: string;
}

export interface AddFriendMutationArgs {
  friendId: string;
}

export interface ConfirmSecretMutationArgs {
  email: string;
  secret: string;
}

export interface CreateUserMutationArgs {
  email: string;
  username: string;
}

export interface EditUserMutationArgs {
  username: string;
  avatar: string | null;
  firstName: string | null;
  lastName: string | null;
  bio: string | null;
}

export interface RequestSecretMutationArgs {
  email: string;
}

export interface SendMessageResponse {
  ok: boolean;
  error: string | null;
}

export interface CreateRoomResponse {
  ok: boolean;
  error: string | null;
  room: Room | null;
}

export interface DeleteRoomResponse {
  ok: boolean;
  error: string | null;
}

export interface AddFriendResponse {
  ok: boolean;
  error: string | null;
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

export interface EditUserResponse {
  ok: boolean;
  error: string | null;
}

export interface RequestSecretResponse {
  ok: boolean;
  error: string | null;
}

export interface Subscription {
  newMessage: Message | null;
}

export interface NewMessageSubscriptionArgs {
  userId: string;
}
