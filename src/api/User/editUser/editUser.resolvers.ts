import { EditUserMutationArgs, EditUserResponse } from "src/types/graph";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    editUser: async (
      _,
      args: EditUserMutationArgs,
      { request, withAuth }
    ): Promise<EditUserResponse> => {
      withAuth(request);
      const { user } = request;
      const { username, avatar, bio, firstName, lastName } = args;
      const checkUsername = await prisma.user({ id: user.id }).username();
      if (checkUsername !== username) {
        return {
          ok: false,
          error: "권한이 없어요 😕"
        };
      }
      try {
        await prisma.updateUser({
          where: { username },
          data: { avatar, bio, firstName, lastName }
        });
        return {
          ok: true,
          error: null
        };
      } catch (e) {
        return {
          ok: false,
          error: e.message
        };
      }
    }
  }
};
