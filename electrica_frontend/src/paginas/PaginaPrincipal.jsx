import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { Outlet } from "react-router-dom";

import styled from "styled-components";

import { ToastContainer } from "react-toastify";

import Sidebar from "../componentes/Sidebar";
import Navbar from "../componentes/Navbar";

import useAxiosPrivado from "../hooks/useAxiosPrivado";

import { conseguirTarifas } from "../redux/tarifasSlice";

import generarMensajeError from "../error/generarMensajeError";

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// - Componente para mostrar la página principal de la aplicación -
// ----------------------------------------------------------------
// ----------------------------------------------------------------
const PaginaPrincipal = () => {
  const dispatch = useDispatch();
  const axiosPrivado = useAxiosPrivado();

  const { tarifas } = useSelector((state) => state.tarifas);
  const { ocultarSidebar } = useSelector((state) => state.empleado);

  // -------------------------------------------------------------------
  // - UseEffect para conseguir todos las tarifas presentes en la BBDD -
  // - Utilizo este useEffect aquí y no en GestionTarifas porque       -
  // - debo cargar la variable tarifas de redux (tarifasSlice)         -
  // - y esa variable se va a usar tanto en tarifas como en cliente    -
  // - asi que evito hacer esta operación 2 veces y la hago en el      -
  // - componente padre de GestionClientes y GestionTarifas            -
  // -------------------------------------------------------------------
  useEffect(() => {
    let isMounted = true;
    const obtenerTarifas = async () => {
      try {
        // setLoading(true);
        // axiosPrivado es el hook no el módulo exportado de axiosAPI
        // useAxiosPrivado llama al módulo exportado de axiosAPI
        const respuesta = await axiosPrivado.get("/api/tarifas");
        isMounted && dispatch(conseguirTarifas(respuesta.data));
      } catch (error) {
        generarMensajeError(error);
      } finally {
        // setLoading(false);
      }
    };
    // Solo ejecuto este método cuando tarifas está vacio.
    // Esto evita tener que estar permanentemente leyendo las tarifas
    // de la BBDD cada vez que entro en esta página
    if (tarifas.length === 0) obtenerTarifas();
    return () => {
      isMounted = false;
    };
  }, []);

  // -------
  // - JSX -
  // -------
  return (
    <Contenedor>
      <ToastContainer limit={1} />
      <Sidebar />
      <Principal ocultarSidebar={ocultarSidebar}>
        <Navbar />
        <Outlet />
      </Principal>
    </Contenedor>
  );
};

export default PaginaPrincipal;

// ---------------------
// - Styled Components -
// ---------------------
const Contenedor = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  background-color: rgb(240, 242, 245);
`;

const Principal = styled.div`
  flex: 1;
  /* 
  Esta línea se pone para hacer que el contenido 
  de los elementos hijo que hagan overflow no se muestre
  */
  overflow: hidden;

  /* Media Query para baja resolución:  Tablets, Ipads e inferiores */
  @media (max-width: 768px) {
    display: ${(props) => (props.ocultarSidebar ? "block" : "none")};
  }
`;
