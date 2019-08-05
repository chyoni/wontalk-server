import { SearchUserQueryArgs, SearchUserResponse } from "src/types/graph";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchUser: async (
      _,
      args: SearchUserQueryArgs,
      { request, withAuth }
    ): Promise<SearchUserResponse> => {
      withAuth(request);
      const { term } = args;
      try {
        const users = await prisma.users({
          where: { OR: [{ username_contains: term }, { email_contains: term }] }
        });
        return {
          ok: true,
          error: null,
          user: users as any
        };
      } catch (e) {
        return {
          ok: false,
          error: e.message,
          user: null
        };
      }
    }
  }
};
