import { AddFriendMutationArgs, AddFriendResponse } from "src/types/graph";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    addFriend: async (
      _,
      args: AddFriendMutationArgs,
      { request, withAuth }
    ): Promise<AddFriendResponse> => {
      withAuth(request);
      const { user } = request;
      const { friendId } = args;
      try {
        await prisma.updateUser({
          where: { id: user.id },
          data: {
            friends: { connect: { id: friendId } }
          }
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
