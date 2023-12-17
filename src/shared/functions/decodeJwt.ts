import jwt_decode from "jwt-decode";

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
    localStorage.setItem("access-token", jwt);
  }

  // if (typeof jwtDecodeData !== "string" && jwtDecodeData?.exp) {
  //   localStorage.setItem("token-exp", jwtDecodeData.exp.toString());
  // }

  if (jwtDecodeData && jwtDecodeData?.role) {
    localStorage.setItem("role", jwtDecodeData.role);
  }

  if (jwtDecodeData && jwtDecodeData?.user_id) {
    localStorage.setItem("user-id", jwtDecodeData.user_id.toString());
  }
};

export { decodeJwt };
