import { SeeRoomQueryArgs, SeeRoomResponse } from "src/types/graph";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeRoom: async (
      _,
      args: SeeRoomQueryArgs,
      { request, withAuth }
    ): Promise<SeeRoomResponse> => {
      withAuth(request);
      const { roomId } = args;
      const checkRoom = await prisma.$exists.room({ id: roomId });
      if (!checkRoom) {
        return {
          ok: false,
          error: "해당 방이 존재하지 않아요 😰",
          room: null
        };
      }
      try {
        const findRoom = await prisma.room({ id: roomId });
        return {
          ok: true,
          error: null,
          room: findRoom as any
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
