import { UserRole } from "../entities/user.entity";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        role: UserRole | string;
      };
      file?: {
        fieldname: string;
        originalname: string;
        encoding: string;
        mimetype: string;
        size: number;
        destination: string;
        filename: string;
        path: string;
        buffer?: Buffer;
      };
    }
  }
}

export {};
