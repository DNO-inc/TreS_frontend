import { IUserData } from "../reducers/userReducer";

export interface IRootState {
  api: unknown;
  user: IUserData;
}
