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
    },
    isFriends: (parent, __, { request }) => {
      const { user } = request;
      return prisma.$exists.user({
        AND: [{ id: user.id }, { friends_some: { id: parent.id } }]
      });
    },
    createdDate: async (parent): Promise<string> => {
      const createdAt = await prisma.user({ id: parent.id }).createdAt();
      const [date] = createdAt.split("T");
      return date;
    },
    createdTime: async (parent): Promise<string> => {
      const createdAt = await prisma.user({ id: parent.id }).createdAt();
      const [, time] = createdAt.split("T");
      const [realTime] = time.split(".");
      const [h, m, s] = realTime.split(":");
      const koreaHour = parseInt(h) + 9;
      return `${koreaHour}:${m}:${s}`;
    }
  }
};
