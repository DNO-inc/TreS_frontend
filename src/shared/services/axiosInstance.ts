// import axios from "axios";
// import { endpoints } from "../../constants";

// export const axiosBaseQuery =
//   ({ baseUrl } = {}) =>
//   async ({ url, method, data, auth }: IAxiosBaseQueryProps) => {
//     const isParamsTrue = url.split("/").at(-1) !== "undefined";
//     const response =
//       isParamsTrue &&
//       (await axiosInstance({
//         url: url,
//         method: method,
//         data: data,
//         auth: auth,
//         headers: {
//           Authorization:
//             localStorage.getItem("jwt-token") &&
//             `Bearer ${localStorage.getItem("jwt-token")}`,
//         },
//       }));
//     return { data: response.data };
//   };
