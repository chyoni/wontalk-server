import {
  ConfirmSecretMutationArgs,
  ConfirmSecretResponse
} from "src/types/graph";
import { prisma } from "../../../../generated/prisma-client";
import { generateToken } from "../../../../src/utils";

export default {
  Mutation: {
    confirmSecret: async (
      _,
      args: ConfirmSecretMutationArgs
    ): Promise<ConfirmSecretResponse> => {
      const { secret, email } = args;
      const userSecret = await prisma.user({ email }).secret();
      if (secret === userSecret) {
        const user = await prisma.user({ email });
        const token = generateToken(user!.id);
        await prisma.updateUser({ where: { email }, data: { secret: "" } });
        return {
          ok: true,
          error: null,
          token
        };
      } else {
        return {
          ok: false,
          error: "유효하지 않은 시크릿 키에요 😰",
          token: null
        };
      }
    }
  }
};
