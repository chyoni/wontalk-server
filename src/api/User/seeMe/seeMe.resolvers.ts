import { User } from "src/types/graph";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeMe: (_, __, { request, withAuth }): User => {
      withAuth(request);
      const { user } = request;
      return prisma.user({ id: user.id }) as any;
    }
  }
};
