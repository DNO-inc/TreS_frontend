export interface IUserData {
  isLoggedIn: boolean;
  userId: number;
  firstname: null | string;
  lastname: null | string;
  login: null | string;
}

const initialState = {
  isLoggedIn: false,
  userId: null,
  firstname: null,
  lastname: null,
  login: null,
};

interface IAction {
  type: string;
  payload: IUserData;
}

const userReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case "LOGIN":
      return {
        isLoggedIn: true,
        userId: action.payload.userId,
        firstname: action.payload.firstname,
        lastname: action.payload.lastname,
        login: action.payload.login,
      };
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
};

export default userReducer;
