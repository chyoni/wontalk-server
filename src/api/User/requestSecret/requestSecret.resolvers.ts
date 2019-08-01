import {
  RequestSecretMutationArgs,
  RequestSecretResponse
} from "src/types/graph";
import { prisma } from "../../../../generated/prisma-client";
import { generateSecret, sendSecret } from "../../../../src/utils";

export default {
  Mutation: {
    requestSecret: async (
      _,
      args: RequestSecretMutationArgs
    ): Promise<RequestSecretResponse> => {
      const { email } = args;
      const checkEmail = await prisma.$exists.user({ email });
      if (!checkEmail) {
        return {
          ok: false,
          error: "존재하지 않는 이메일이에요😰"
        };
      }
      try {
        const key = await generateSecret();
        sendSecret(email, key);
        await prisma.updateUser({ where: { email }, data: { secret: key } });
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
