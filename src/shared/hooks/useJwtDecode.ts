import jwt_decode from "jwt-decode";

interface IJwtDecodeData {
  role: string;
  token_id: string;
  token_type: string;
  user_id: number;
}

const useJwtDecode = () => {
  const localJwt: string | null = localStorage.getItem("access-token");

  const jwtDecodeData: "" | IJwtDecodeData | null =
    localJwt && jwt_decode(localJwt);

  if (!jwtDecodeData) {
    localStorage.removeItem("access-token");
    return false;
  }
  // else if (Date.now() >= jwtDecodeData.exp * 1000) {
  //   localStorage.removeItem("access-token");
  //   return false;
  // }
  else {
    return jwtDecodeData;
  }
};

export { useJwtDecode };
