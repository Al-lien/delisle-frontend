export interface IUserProfil {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface IUser {
  id: string | number;
  firstname: string;
  lastname: string;
  email: string;
  roles: string[];
}

export interface IUserSanitized {
  id: string | number;
  fullname: string;
  email: string;
  roles: string[];
}

export type TechnicianType = IUser;
