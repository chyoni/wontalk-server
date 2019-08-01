import { DeleteRoomResponse, DeleteRoomMutationArgs } from "src/types/graph";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    deleteRoom: async (
      _,
      args: DeleteRoomMutationArgs,
      { request, withAuth }
    ): Promise<DeleteRoomResponse> => {
      withAuth(request);
      const { user } = request;
      const { roomId } = args;
      const checkUser = await prisma.$exists.room({
        AND: [{ entrant_some: { id: user.id } }, { id: roomId }]
      });
      if (!checkUser) {
        return {
          ok: false,
          error: "권한이 없어요 😕"
        };
      }
      try {
        await prisma.updateRoom({
          where: { id: roomId },
          data: { entrant: { disconnect: { id: user.id } } }
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
