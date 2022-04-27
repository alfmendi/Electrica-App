import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import {
  setEmpleado,
  setOcultarSidebar,
  setOpcionActiva,
  setMensajeAMostrar,
} from "../redux/empleadoSlice";

import styled from "styled-components";

import useAxiosPrivado from "../hooks/useAxiosPrivado";

import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";

// ------------------------------------------------------
// ------------------------------------------------------
// - Componente para mostrar la navbar de la aplicación -
// ------------------------------------------------------
// ------------------------------------------------------
const Navbar = () => {
  const { empleado, ocultarSidebar } = useSelector((state) => state.empleado);
  const axiosPrivado = useAxiosPrivado();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ---------------------------------
  // - Método que gestiona el logout -
  // ---------------------------------
  const gestionarLogout = async () => {
    dispatch(setEmpleado(null));
    dispatch(setOcultarSidebar(false));
    dispatch(setOpcionActiva(null));
    dispatch(setMensajeAMostrar(false));
    try {
      await axiosPrivado.get("/api/tokens/borrarRefreshToken");
    } catch (error) {
      console.log("Error en logout...");
      // generarMensajeError(error);
    } finally {
      navigate("/login");
    }
  };

  // -------
  // - JSX -
  // -------
  return (
    <Contenedor>
      <Icono onClick={() => dispatch(setOcultarSidebar(!ocultarSidebar))}>
        {ocultarSidebar ? (
          <MenuIcon sx={{ fontSize: "1.2rem" }} />
        ) : (
          <MenuOpenIcon sx={{ fontSize: "1.2rem" }} />
        )}
      </Icono>
      <Logo>
        <h3>Redegal</h3>
      </Logo>
      <Usuario>
        {empleado.esAdmin && <Badge>Admin</Badge>}
        <h4>{empleado.nombre}</h4>
        <Icono onClick={gestionarLogout}>
          <LogoutIcon sx={{ fontSize: "1.2rem" }} />
        </Icono>
      </Usuario>
    </Contenedor>
  );
};

export default Navbar;

// ---------------------
// - Styled Components -
// ---------------------
const Contenedor = styled.div`
  position: relative;
  z-index: 10;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  box-shadow: 0 14px 26px -12px rgb(153 153 153 / 42%),
    0 4px 23px 0px rgb(0 0 0 / 12%), 0 8px 10px -5px rgb(153 153 153 / 20%);
`;

const Icono = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--color-fondo);
  color: var(--light-blue);
  border: 1px solid var(--light-blue);
  border-radius: 3px;
  padding: 6px;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 2px 2px 0 rgb(59 89 152 / 14%),
    0 3px 1px -2px rgb(59 89 152 / 20%), 0 1px 5px 0 rgb(59 89 152 / 12%);

  &:hover {
    background-color: var(--light-blue);
    color: #fff;
    cursor: pointer;
    box-shadow: 0 14px 26px -12px rgb(59 89 152 / 42%),
      0 4px 23px 0px rgb(0 0 0 / 12%), 0 8px 10px -5px rgb(59 89 152 / 20%);
  }
`;

const Logo = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: linear-gradient(
    to bottom left,
    var(--dark-blue) 15%,
    var(--light-blue)
  );
  position: relative;

  &::before {
    content: "";
    position: absolute;
    bottom: 10px;
    left: 10px;
    width: 40px;
    height: 40px;
    background: linear-gradient(
      to bottom left,
      rgba(249, 180, 70, 1) 15%,
      rgba(234, 47, 152, 0.8)
    );
    border-radius: 50%;
    border: 2px solid var(--color-fondo);
  }

  h3 {
    margin-left: 9rem;
    font-weight: 900;
    cursor: pointer;
    color: var(--light-blue);
  }

  /* Media Query para dispositivos móviles */
  @media (max-width: 480px) {
    display: none;
  }
`;

const Usuario = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  h4 {
    font-weight: 500;
    color: #35465c;
    text-shadow: 2px 8px 6px rgba(0, 0, 0, 0.2),
      0px -5px 35px rgba(255, 255, 255, 0.3);
  }

  /* Media Query para dispositivos móviles */
  @media (max-width: 480px) {
    gap: 0.5rem;

    h4 {
      font-size: 0.9rem;
    }
  }
`;

const Badge = styled.div`
  position: absolute;
  top: -6px;
  color: #fff;
  background: #35465c;
  border-radius: 3px;
  font-size: 0.5rem;
  padding: 1px 0.2rem 0px;
`;
