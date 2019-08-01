import { SeeUserQueryArgs, SeeUserResponse } from "src/types/graph";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeUser: async (_, args: SeeUserQueryArgs): Promise<SeeUserResponse> => {
      const { username } = args;
      try {
        const user = await prisma.user({ username });
        if (user) {
          return {
            ok: true,
            error: null,
            user: user as any
          };
        } else {
          return {
            ok: false,
            error: "해당 닉네임의 유저는 존재하지 않습니다 😥",
            user: null
          };
        }
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
