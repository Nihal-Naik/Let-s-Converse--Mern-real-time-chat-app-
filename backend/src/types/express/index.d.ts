import { IUser } from '../../types/userdata'

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}