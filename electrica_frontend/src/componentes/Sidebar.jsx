import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

import styled from "styled-components";

import { setOcultarSidebar, setOpcionActiva } from "../redux/empleadoSlice";

// -------------------------------------------------------
// -------------------------------------------------------
// - Componente para mostrar la sidebar de la aplicación -
// -------------------------------------------------------
// -------------------------------------------------------
const Sidebar = () => {
  const dispatch = useDispatch();
  const { empleado, ocultarSidebar, opcionActiva } = useSelector(
    (state) => state.empleado
  );

  // -------
  // - JSX -
  // -------
  return (
    <Contenedor ocultarSidebar={ocultarSidebar}>
      {empleado.esAdmin && (
        <StyledLink to="empleados">
          <TextoLink
            activo={opcionActiva === 1}
            onClick={() => {
              dispatch(setOpcionActiva(1));
              if (window.innerWidth <= 768) {
                dispatch(setOcultarSidebar(true));
              }
            }}
          >
            Gestión Empleados
          </TextoLink>
        </StyledLink>
      )}
      <StyledLink to="clientes">
        <TextoLink
          activo={opcionActiva === 2}
          onClick={() => {
            dispatch(setOpcionActiva(2));
            if (window.innerWidth <= 768) {
              dispatch(setOcultarSidebar(true));
            }
          }}
        >
          Gestión Clientes
        </TextoLink>
      </StyledLink>
      <StyledLink to="tarifas">
        <TextoLink
          activo={opcionActiva === 3}
          onClick={() => {
            dispatch(setOpcionActiva(3));
            if (window.innerWidth <= 768) {
              dispatch(setOcultarSidebar(true));
            }
          }}
        >
          Gestión Tarifas
        </TextoLink>
      </StyledLink>
      <StyledLink to="consumos">
        <TextoLink
          activo={opcionActiva === 4}
          onClick={() => {
            dispatch(setOpcionActiva(4));
            if (window.innerWidth <= 768) {
              dispatch(setOcultarSidebar(true));
            }
          }}
        >
          Gestión Consumos
        </TextoLink>
      </StyledLink>
      <StyledLink to="facturas">
        <TextoLink
          activo={opcionActiva === 5}
          onClick={() => {
            dispatch(setOpcionActiva(5));
            if (window.innerWidth <= 768) {
              dispatch(setOcultarSidebar(true));
            }
          }}
        >
          Gestión Facturas
        </TextoLink>
      </StyledLink>
      <StyledLink to="cargarConsumos">
        <TextoLink
          activo={opcionActiva === 6}
          onClick={() => {
            dispatch(setOpcionActiva(6));
            if (window.innerWidth <= 768) {
              dispatch(setOcultarSidebar(true));
            }
          }}
        >
          Cargar Consumos
        </TextoLink>
      </StyledLink>
      <StyledLink to="conceptosFactura">
        <TextoLink
          activo={opcionActiva === 7}
          onClick={() => {
            dispatch(setOpcionActiva(7));
            if (window.innerWidth <= 768) {
              dispatch(setOcultarSidebar(true));
            }
          }}
        >
          Gestión Conceptos Factura
        </TextoLink>
      </StyledLink>
    </Contenedor>
  );
};

export default Sidebar;

// ---------------------
// - Styled Components -
// ---------------------
const Contenedor = styled.div`
  display: ${(props) => (props.ocultarSidebar ? "none" : "block")};
  width: 280px;
  height: 100vh;
  background: #35465c;
  padding: 10px;

  /* Media Query para dispositivos móviles y para baja resolución: Tablets, Ipads */
  @media (max-width: 768px) {
    width: 100%;
    display: ${(props) => (props.ocultarSidebar ? "none" : "block")};
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const TextoLink = styled.p`
  border-radius: 3px;
  padding: 5px 10px;
  margin-bottom: 0.5rem;
  transition: all 0.2s ease-in-out;
  color: ${(props) => (props.activo ? "#fff" : "#ddd")};
  border: ${(props) => (props.activo ? "1px solid #fff" : "1px solid #ddd")};
  border-left: ${(props) => (props.activo ? "10px solid #fff" : "")};

  &:hover {
    background: var(--light-blue);
  }
`;
