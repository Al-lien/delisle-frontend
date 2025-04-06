import { IUser, IUserSanitized } from '../models';

export class UserTransformer {
  constructor() {
    throw new Error('Cannot initialize user transformer');
  }

  public static transformToSanitizedUser(user: IUser): IUserSanitized {
    return {
      id: user.id,
      fullname: user.firstname + ' ' + user.lastname,
      email: user.email,
      roles: user.roles,
    };
  }
}
