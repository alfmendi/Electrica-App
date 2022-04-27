import { useEffect } from "react";

import { useSelector } from "react-redux";

import { axiosPrivado } from "../axiosAPI/axios";

import useRefreshToken from "./useRefreshToken";

// -------------------------------------------------------
// - Hook propio que permite añadir a una petición axios -
// - toda la información del token del empleado          -
// -------------------------------------------------------
const useAxiosPrivado = () => {
  const refrescar = useRefreshToken();
  const { empleado } = useSelector((state) => state.empleado);

  useEffect(() => {
    const requestInterceptor = axiosPrivado.interceptors.request.use(
      (config) => {
        if (!config.headers["authorization"]) {
          config.headers["authorization"] = `Bearer ${empleado.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosPrivado.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest.enviado) {
          prevRequest.enviado = true;
          const nuevoAccessToken = await refrescar();
          prevRequest.headers["authorization"] = `Bearer ${nuevoAccessToken}`;
          return axiosPrivado(prevRequest);
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axiosPrivado.interceptors.request.eject(requestInterceptor);
      axiosPrivado.interceptors.response.eject(responseInterceptor);
    };
  }, [empleado, refrescar]);

  return axiosPrivado;
};

export default useAxiosPrivado;
// Agrega un interceptor a la instancia privada de axios
