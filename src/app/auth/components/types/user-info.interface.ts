export interface IUserLoggedIn {
  id: string;
  userName: string;
  fullname: string;
  email: string;
}

export interface IAuthResponse {
  authUser: IUserLoggedIn;
  token: string;
}