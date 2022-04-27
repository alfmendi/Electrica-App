import axios from "axios";

// const BASE_URL = "http://localhost:5000";
// const BASE_URL = "https://aplicacion-?????????.herokuapp.com/";
const BASE_URL = "https://aplicacion-electrica.herokuapp.com/";

// Es muy importante el atributo wihtCredentials. En caso de no ponerlo,
// no se puede trabajar con el refreshToken definido en el servidor
export default axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const axiosPrivado = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
