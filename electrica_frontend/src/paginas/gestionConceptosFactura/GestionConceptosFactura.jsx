import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import useAxiosPrivado from "../../hooks/useAxiosPrivado";

import { useNavigate, Link } from "react-router-dom";

import styled from "styled-components";

import { ToastContainer, toast, Zoom } from "react-toastify";

import { setMensajeAMostrar, setOpcionActiva } from "../../redux/empleadoSlice";

import generarMensajeError from "../../error/generarMensajeError";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
// - Componente que muestra la página de inicio para llevar a cabo     -
// - la gestión de los diferentes parámetros aplicables a las facturas -                                   -
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
const GestionConceptosFactura = () => {
  const axiosPrivado = useAxiosPrivado();
  const { opcionActiva, mensajeAMostrar } = useSelector(
    (state) => state.empleado
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [existenConceptosFactura, setExistenConceptosFactura] = useState(false);

  // --------------------------------------------------------
  // - UseEffect para mostrar el mensaje tras una operación -
  // --------------------------------------------------------
  useEffect(() => {
    if (mensajeAMostrar) {
      toast.success(mensajeAMostrar, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Zoom,
        theme: "colored",
        // className: "contenedor__toastify",
        bodyClassName: "texto__toastify",
        onClose: () => dispatch(setMensajeAMostrar(null)),
      });
    }
  }, [mensajeAMostrar]);

  // -------------------------------------------------------
  // - UseEffect para establecer la opción del menú activa -
  // -------------------------------------------------------
  useEffect(() => {
    if (!opcionActiva) {
      dispatch(setOpcionActiva(7));
    }
  }, []);

  // -----------------------------------------------------------------
  // - UseEffect para establecer si existen los conceptos de factura -
  // -----------------------------------------------------------------
  useEffect(() => {
    const existeConceptosFactura = async () => {
      try {
        const existen = await axiosPrivado.get("/api/conceptosFactura");
        existen.data.length > 0
          ? setExistenConceptosFactura(true)
          : setExistenConceptosFactura(false);
      } catch (error) {
        generarMensajeError(error);
      }
    };
    existeConceptosFactura();
  }, []);

  // --------------------------------------------
  // - Método para volver a la pagina de inicio -
  // --------------------------------------------
  const volverPaginaCorporativa = () => {
    dispatch(setOpcionActiva(null));
    navigate("/");
  };

  // -------
  // - JSX -
  // -------
  return (
    <Contenedor>
      {mensajeAMostrar && <ToastContainer limit={1} />}
      <PanelBotones>
        <Icono onClick={volverPaginaCorporativa}>
          <ArrowBackIosNewIcon sx={{ fontSize: "0.9rem" }} />
        </Icono>
        {!existenConceptosFactura ? (
          <Boton>
            <StyledLink to={"/conceptosFactura/crear"}>Crear</StyledLink>
          </Boton>
        ) : (
          <BotonDeshabilitado>Crear</BotonDeshabilitado>
        )}

        {existenConceptosFactura ? (
          <Boton>
            <StyledLink to={"/conceptosFactura/modificar"}>Editar</StyledLink>
          </Boton>
        ) : (
          <BotonDeshabilitado>Editar</BotonDeshabilitado>
        )}
      </PanelBotones>
    </Contenedor>
  );
};

export default GestionConceptosFactura;

// ---------------------
// - Styled Components -
// ---------------------
const Contenedor = styled.div`
  padding: 1rem;
  /* 
  Estas 2 líneas permiten hacer
  que el contenido de este componente
  se desplaze dentro del contenedor padre.
  El contenedor padre (App.js) deberá tener
  la siguiente línea  overflow: hidden;
  */
  height: calc(100% - 60px);
  overflow: auto;

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  & {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
`;

const PanelBotones = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.8rem;
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

const Boton = styled.button`
  font-family: poppins;
  border: none;
  background-color: #35465c;
  color: #fff;
  border-radius: 3px;
  padding: 4px 8px;
  text-align: center;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  box-shadow: 0 2px 2px 0 rgb(53 70 92 / 14%),
    0 3px 1px -2px rgb(53 70 92 / 20%), 0 1px 5px 0 rgb(53 70 92 / 12%);

  &:hover {
    background: var(--light-blue);
    box-shadow: 0 14px 26px -12px rgb(53 70 92 / 42%),
      0 4px 23px 0px rgb(0 0 0 / 12%), 0 8px 10px -5px rgb(53 70 92 / 20%);
  }

  @media screen and (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const BotonDeshabilitado = styled.button`
  font-family: poppins;
  border: none;
  background: var(--gris);
  color: #fff;
  border-radius: 3px;
  padding: 4px 8px;
  text-align: center;
  box-shadow: 0 2px 2px 0 rgb(53 70 92 / 14%),
    0 3px 1px -2px rgb(53 70 92 / 20%), 0 1px 5px 0 rgb(53 70 92 / 12%);

  @media screen and (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;
