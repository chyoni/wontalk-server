import { SendMessageMutationArgs, SendMessageResponse } from "src/types/graph";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    sendMessage: async (
      _,
      args: SendMessageMutationArgs,
      { request, withAuth }
    ): Promise<SendMessageResponse> => {
      withAuth(request);
      const { user } = request;
      const { roomId, text } = args;
      const check = await prisma.$exists.room({
        AND: [{ id: roomId }, { entrant_some: { id: user.id } }]
      });
      if (!check) {
        return {
          ok: false,
          error: "권한이 없어요 😕"
        };
      }
      try {
        await prisma.createMessage({
          room: { connect: { id: roomId } },
          text,
          user: { connect: { id: user.id } }
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
