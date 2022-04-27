import { useState, useEffect } from "react";

import { useSelector } from "react-redux";

import { Outlet } from "react-router-dom";

import useRefreshToken from "../hooks/useRefreshToken";

import Spinner from "./Spinner";

// ---------------------------------------------------------------
// ---------------------------------------------------------------
// - Componente que permite mantener la información del empleado -
// - cuando se realiza un refresh de la página (F5)              -
// ---------------------------------------------------------------
// ---------------------------------------------------------------
const LoginPersistente = () => {
  const { empleado } = useSelector((state) => state.empleado);
  const [estaCargando, setEstaCargando] = useState(true);
  const refrescar = useRefreshToken();

  useEffect(() => {
    const verificarToken = async () => {
      try {
        await refrescar();
      } catch (error) {
        console.log(
          "Error en el componente LoginPersistente...",
          error.message
        );
      } finally {
        setEstaCargando(false);
      }
    };
    !empleado?.accessToken ? verificarToken() : setEstaCargando(false);
  }, []);

  // -------
  // - JSX -
  // -------
  return <>{estaCargando ? <Spinner /> : <Outlet />}</>;
};

export default LoginPersistente;
