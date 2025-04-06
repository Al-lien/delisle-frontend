export interface IJwtToken {
  authorities: string[];
  fullname: string;
  exp: number;
  iat: number;
  sub: string;
}
