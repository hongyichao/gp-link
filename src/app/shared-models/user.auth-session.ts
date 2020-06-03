import { AppUser } from './app.user';

export interface UserAuthSession {
  Token: string;
  ActiveUser: AppUser;
}
