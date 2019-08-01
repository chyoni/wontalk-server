import { prisma } from "../../../generated/prisma-client";

export default {
  Room: {
    entrant: parent => {
      return prisma.room({ id: parent.id }).entrant();
    },
    messages: parent => {
      return prisma
        .room({ id: parent.id })
        .messages({ orderBy: "createdAt_ASC" });
    },
    createdDate: async (parent): Promise<string> => {
      const createdAt = await prisma.room({ id: parent.id }).createdAt();
      const [date] = createdAt.split("T");
      return date;
    },
    createdTime: async (parent): Promise<string> => {
      const createdAt = await prisma.room({ id: parent.id }).createdAt();
      const [, time] = createdAt.split("T");
      const [realTime] = time.split(".");
      const [h, m, s] = realTime.split(":");
      const koreaHour = parseInt(h) + 9;
      return `${koreaHour}:${m}:${s}`;
    }
  }
};
