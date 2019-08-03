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
      if (you.length === 1) {
        const checkRoom = await prisma.$exists.room({
          entrant_every: { OR: [{ id: user.id }, { id: you[0] }] }
        });
        //엔트리에들어있는 모든사람들을 비교하는데 내가 지금만들려는 사람과의 방이
        //이미존재하는지를 파악하는 거임 위에코드는ㅇㅇ
        if (checkRoom) {
          const existRoom = await prisma.rooms({
            where: { entrant_every: { OR: [{ id: user.id }, { id: you[0] }] } }
          });
          return {
            ok: true,
            error: null,
            room: existRoom[0] as any
          };
        }
        try {
          const room = await prisma.createRoom({
            entrant: { connect: [{ id: user.id }, { id: you[0] }] }
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
      } else {
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
  }
};
