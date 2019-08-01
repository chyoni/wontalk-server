import { NewMessageSubscriptionArgs } from "src/types/graph";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Subscription: {
    newMessage: {
      subscribe: async (_, args: NewMessageSubscriptionArgs) => {
        const { userId } = args;
        const userRooms = await prisma.user({ id: userId }).room();
        console.log(userRooms);
        return prisma.$subscribe
          .message({
            AND: [
              { mutation_in: "CREATED" },
              {
                AND: [
                  {
                    node: {
                      room: { id_in: [...userRooms.map(room => room.id)] },
                      user: { id_not: userId }
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
