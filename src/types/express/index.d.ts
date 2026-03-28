import type { IJwtPayload } from "../../module/Auth/auth.interface.ts";

declare global {
  namespace Express {
    interface Request {
      user?: IJwtPayload;
    }
  }
}
