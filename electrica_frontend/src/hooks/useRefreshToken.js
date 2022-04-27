import { useDispatch } from "react-redux";

import { setEmpleado } from "../redux/empleadoSlice";

import axios from "../axiosAPI/axios";

// ---------------------------------------------
// - Hook que permite utilizar el refreshToken -
// - para obtener un nuevo accessToken         -
// ---------------------------------------------
const useRefreshToken = () => {
  const dispatch = useDispatch();

  const refrescar = async () => {
    const respuesta = await axios.get("/api/tokens/refrescarAccessToken", {
      withCredentials: true,
    });
    dispatch(setEmpleado(respuesta.data));
    return respuesta.data.accessToken;
  };

  return refrescar;
};

export default useRefreshToken;
