import type { IJwtPayload } from "../../module/Auth/auth.interface";

declare global {
  namespace Express {
    interface Request {
      user?: IJwtPayload;
    }
  }
}
