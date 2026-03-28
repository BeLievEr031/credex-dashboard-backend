import { IJwtPayload } from "../../module/Auth/auth.interface.js";

declare global {
  namespace Express {
    interface Request {
      user?: IJwtPayload;
    }
  }
}
