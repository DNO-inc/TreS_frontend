import jwt_decode from "jwt-decode";
import { storage } from "../../constants";

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

  if (jwtDecodeData && jwtDecodeData?.role) {
    localStorage.setItem(storage.ROLE, jwtDecodeData.role);
  }

  if (jwtDecodeData && jwtDecodeData?.user_id) {
    localStorage.setItem(storage.USER_ID, jwtDecodeData.user_id.toString());
  }
};

export { decodeJwt };
