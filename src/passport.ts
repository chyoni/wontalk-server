import passport from "passport";
import {
  Strategy,
  ExtractJwt,
  StrategyOptions,
  VerifiedCallback
} from "passport-jwt";
import { VerifyCallback } from "jsonwebtoken";
import { prisma } from "../generated/prisma-client";

const jwtOptions: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

const verifyUser: VerifyCallback = async (
  payload: any,
  done: VerifiedCallback
): Promise<void> => {
  try {
    const user = await prisma.user({ id: payload.id });
    if (user !== null) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (e) {
    return done(e, false);
  }
};

export const authenticateJwt = (req, res, next) =>
  passport.authenticate("jwt", { session: false }, (error, user) => {
    if (user) {
      req.user = user;
    }
    next();
  })(req, res, next);

passport.use(new Strategy(jwtOptions, verifyUser));
passport.initialize();
