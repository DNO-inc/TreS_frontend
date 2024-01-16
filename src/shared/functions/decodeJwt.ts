import jwt_decode from "jwt-decode";

import { storage } from "../../constants";
import { changeUserField } from "./manipulateLocalStorage";

interface IJwtDecodeData {
  role: string;
  token_id: string;
  token_type: string;
  user_id: number;
  exp: number;
  iat: number;
  iss: string;
  jti: string;
  sub: string;
}

const decodeJwt = (jwt: string | null) => {
  const jwtDecodeData: "" | IJwtDecodeData | null = jwt && jwt_decode(jwt);

  if (jwt) {
    localStorage.setItem(storage.ACCESS_TOKEN, jwt);
  }

  if (jwtDecodeData && jwtDecodeData?.user_id) {
    changeUserField(storage.USER.ID, jwtDecodeData.user_id);
  }
};

export { decodeJwt };
