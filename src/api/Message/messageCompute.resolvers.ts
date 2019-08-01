import { prisma } from "../../../generated/prisma-client";

export default {
  Message: {
    user: parent => {
      return prisma.message({ id: parent.id }).user();
    },
    room: parent => {
      return prisma.message({ id: parent.id }).room();
    },
    createdDate: async (parent): Promise<string> => {
      const createdAt = await prisma.message({ id: parent.id }).createdAt();
      const [date] = createdAt.split("T");
      return date;
    },
    createdTime: async (parent): Promise<string> => {
      const createdAt = await prisma.message({ id: parent.id }).createdAt();
      const [, time] = createdAt.split("T");
      const [realTime] = time.split(".");
      const [h, m, s] = realTime.split(":");
      const koreaHour = parseInt(h) + 9;
      return `${koreaHour}:${m}:${s}`;
    }
  }
};
