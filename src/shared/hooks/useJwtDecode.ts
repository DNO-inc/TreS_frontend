import jwt_decode from "jwt-decode";

interface IJwtDecodeData {
  exp: number;
  fresh: boolean;
  iat: number;
  jti: string;
  nbf: number;
  sub: string;
  type: string;
}

const useJwtDecode = () => {
  const localJwt: string | null = localStorage.getItem("jwt-token");

  const jwtDecodeData: "" | IJwtDecodeData | null =
    localJwt && jwt_decode(localJwt);

  if (!jwtDecodeData) {
    localStorage.removeItem("jwt-token");
    return false;
  } else if (Date.now() >= jwtDecodeData.exp * 1000) {
    localStorage.removeItem("jwt-token");
    return false;
  } else {
    return jwtDecodeData;
  }
};

export { useJwtDecode };
