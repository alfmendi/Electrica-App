import { Navigate, Outlet } from "react-router-dom";

import { useSelector } from "react-redux";

// ------------------------------------------------------------
// ------------------------------------------------------------
// - Componente que permite mostrar los contenidos protegidos -
// - cuando el empleado se ha logeado correctamente           -
// ------------------------------------------------------------
// ------------------------------------------------------------
const ContenidoProtegido = () => {
  const { empleado } = useSelector((state) => state.empleado);

  // -------
  // - JSX -
  // -------
  return !empleado ? <Navigate to="/login" /> : <Outlet />;
};

export default ContenidoProtegido;
