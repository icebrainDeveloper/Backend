import {authJwt} from "./verifySignIn";
import {verifySignUp} from "./verifySignUp";

export const authMiddleware = {
  authJwt,
  verifySignUp
};