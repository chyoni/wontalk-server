import { CreateUserMutationArgs, CreateUserResponse } from "src/types/graph";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createUser: async (
      _,
      args: CreateUserMutationArgs
    ): Promise<CreateUserResponse> => {
      const { username, email } = args;
      const checkUsername = await prisma.$exists.user({ username });
      const checkEmail = await prisma.$exists.user({ email });
      if (checkUsername) {
        return {
          ok: false,
          error: "이미 존재하는 닉네임입니다😭"
        };
      } else if (checkEmail) {
        return {
          ok: false,
          error: "이미 존재하는 이메일입니다😭"
        };
      }
      try {
        await prisma.createUser({ email, username });
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
