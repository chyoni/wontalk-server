import { CreateRoomMutationArgs, CreateRoomResponse } from "src/types/graph";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createRoom: async (
      _,
      args: CreateRoomMutationArgs,
      { request, withAuth }
    ): Promise<CreateRoomResponse> => {
      withAuth(request);
      const { user } = request;
      const { you } = args;
      try {
        const room = await prisma.createRoom({
          entrant: { connect: [{ id: user.id }] }
        });
        you.forEach(async youId => {
          await prisma.updateRoom({
            where: { id: room.id },
            data: { entrant: { connect: { id: youId } } }
          });
        });
        return {
          ok: true,
          error: null,
          room: room as any
        };
      } catch (e) {
        return {
          ok: false,
          error: e.message,
          room: null
        };
      }
    }
  }
};
