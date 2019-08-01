import { prisma } from "../../../generated/prisma-client";

export default {
  User: {
    room: parent => {
      return prisma.user({ id: parent.id }).room({ orderBy: "createdAt_DESC" });
    },
    friends: parent => {
      return prisma
        .user({ id: parent.id })
        .friends({ orderBy: "username_ASC" });
    },
    message: parent => {
      return prisma
        .user({ id: parent.id })
        .message({ orderBy: "createdAt_ASC" });
    }
  }
};
