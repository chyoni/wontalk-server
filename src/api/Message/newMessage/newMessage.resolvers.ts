import { NewMessageSubscriptionArgs } from "src/types/graph";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Subscription: {
    newMessage: {
      subscribe: async (_, args: NewMessageSubscriptionArgs) => {
        const { roomId } = args;
        return prisma.$subscribe
          .message({
            AND: [
              { mutation_in: "CREATED" },
              {
                AND: [
                  {
                    node: {
                      room: { id: roomId }
                      // room: { id_in: [...userRooms.map(room => room.id)] },
                      // user: { id_not: userId }
                    }
                  }
                ]
              }
            ]
          })
          .node();
      },
      resolve: payload => payload
    }
  }
};
