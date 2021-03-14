import { authMiddleware } from "../middlewares/fasterX";
import  { userBoard, allAccess, adminBoard} from "../controllers/user.controller";

export function userRoutes (app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", allAccess);

  app.get("/api/test/user",
   [authMiddleware.authJwt.verifyToken, authMiddleware.authJwt.isUser],
   userBoard);

  app.get(
    "/api/test/admin",
    [authMiddleware.authJwt.verifyToken, authMiddleware.authJwt.isAdmin],
    adminBoard
  );
};