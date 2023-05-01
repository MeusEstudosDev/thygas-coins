import { IUserRes } from '@/interfaces/users.interfaces';
import { User } from '@prisma/client';

export class UserRes {
  static handle({ id, name, email, registered_at, isAdmin }: User): IUserRes {
    return {
      id,
      name,
      email,
      registered_at,
      isAdmin,
    };
  }
}
