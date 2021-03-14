import {authMiddleware} from "../middlewares/fasterX";
import {signup,signin} from "../controllers/auth.controller";

export function authRoutes (app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
        authMiddleware.verifySignUp.checkDuplicateEmail,
        authMiddleware.verifySignUp.checkRolesExisted
    ],
    signup
  );

  app.post("/api/auth/signin", signin);
};