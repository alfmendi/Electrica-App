import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import useAxiosPrivado from "../../hooks/useAxiosPrivado";

import { useNavigate, Link } from "react-router-dom";

import styled from "styled-components";

import { DataGrid } from "@mui/x-data-grid";

import { ToastContainer, toast, Zoom } from "react-toastify";

import { setMensajeAMostrar, setOpcionActiva } from "../../redux/empleadoSlice";

import generarMensajeError from "../../error/generarMensajeError";

import { columns } from "./estructuraTabla";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CloseIcon from "@mui/icons-material/Close";

// -----------------------------------------------------------------
// -----------------------------------------------------------------
// - Componente que muestra la página de inicio para llevar a cabo -
// - la gestión de los clientes                                    -
// -----------------------------------------------------------------
// -----------------------------------------------------------------
const GestionClientes = () => {
  const axiosPrivado = useAxiosPrivado();
  const { ocultarSidebar, opcionActiva, mensajeAMostrar } = useSelector(
    (state) => state.empleado
  );
  let { tarifas } = useSelector((state) => state.tarifas);
  tarifas = tarifas.filter((tarifa) => tarifa.tarifaBase === false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Contiene el cliente/s con el nombre indicado
  const [cliente, setCliente] = useState([]);
  const [nombreCliente, setNombreCliente] = useState("");
  const [dniCliente, setDniCliente] = useState("");
  const [buscarPorDNI, setBuscarPorDNI] = useState(false);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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

  // ------------------------------------------------------------------
  // - UseEffect para obtener el ancho de la ventana de la aplicación -
  // ------------------------------------------------------------------
  useEffect(() => {
    function anchoWindow() {
      setWindowWidth(window.innerWidth);
    }
    // Dispara esta función con el evento onResize
    window.addEventListener("resize", anchoWindow);
    //  Eliminar el listener al desmontar el componente
    return () => window.removeEventListener("resize", anchoWindow);
  }, []);

  // ---------------------------------------------------------------
  // - UseEffect para establecer la opción activa del menú lateral -
  // ---------------------------------------------------------------
  useEffect(() => {
    if (!opcionActiva) {
      dispatch(setOpcionActiva(2));
    }
  }, []);

  // --------------------------------------------
  // - Método para volver a la pagina de inicio -
  // --------------------------------------------
  const volverPaginaCorporativa = () => {
    dispatch(setOpcionActiva(null));
    navigate("/");
  };

  // -----------------------------------------------
  // - Método para buscar un cliente por su nombre -
  // -----------------------------------------------
  const buscarClienteNombre = async (event) => {
    if (event.key === "Enter") {
      try {
        if (nombreCliente !== "") {
          // axiosPrivado es el hook no el módulo exportado de axiosAPI
          // useAxiosPrivado llama al módulo exportado de axiosAPI
          const respuesta = await axiosPrivado.get(
            `/api/clientes/nombre/${nombreCliente}`
          );
          for (let indice = 0; indice < respuesta.data.length; indice++) {
            respuesta.data[indice].tarifa =
              respuesta.data[indice].tarifa.nombre;
          }
          setCliente(respuesta.data);
        }
      } catch (error) {
        setCliente([]);
      }
      setNombreCliente("");
    }
  };

  // --------------------------------------------
  // - Método para buscar un cliente por su DNI -
  // --------------------------------------------
  const buscarClienteDNI = async (event) => {
    if (event.key === "Enter") {
      try {
        if (dniCliente !== "") {
          const respuesta = await axiosPrivado.get(
            `/api/clientes/dni/${dniCliente}`
          );
          for (let indice = 0; indice < respuesta.data.length; indice++) {
            respuesta.data[indice].tarifa =
              respuesta.data[indice].tarifa.nombre;
          }
          setCliente(respuesta.data);
        }
      } catch (error) {
        setCliente([]);
        generarMensajeError(error, "bottom-center");
      }
      setDniCliente("");
    }
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
        {tarifas.length > 1 ? (
          <Boton>
            <StyledLink to={"/clientes/crear"}>Crear Cliente</StyledLink>
          </Boton>
        ) : (
          <BotonDeshabilitado>Crear Cliente</BotonDeshabilitado>
        )}
        <Boton onClick={() => setBuscarPorDNI(!buscarPorDNI)}>
          {buscarPorDNI ? "Buscar Nombre" : "Buscar DNI"}
        </Boton>
      </PanelBotones>
      <PanelBuscar>
        {buscarPorDNI ? (
          <Label>DNI Cliente</Label>
        ) : (
          <Label>Nombre Cliente</Label>
        )}

        {!buscarPorDNI && (
          <Input
            placeholder={"Introduce el nombre del cliente..."}
            value={nombreCliente}
            onChange={(e) => setNombreCliente(e.target.value)}
            onKeyDown={(e) => buscarClienteNombre(e)}
            required
          />
        )}
        {buscarPorDNI && (
          <Input
            placeholder={"Introduce el DNI del cliente..."}
            value={dniCliente}
            onChange={(e) => setDniCliente(e.target.value)}
            onKeyDown={(e) => buscarClienteDNI(e)}
            required
          />
        )}
        <IconoCerrar
          onClick={() => {
            setNombreCliente("");
          }}
        >
          <CloseIcon />
        </IconoCerrar>
      </PanelBuscar>
      {windowWidth <= 768 && !ocultarSidebar ? null : (
        <ContenedorDataGrid>
          <DataGridPersonal
            rows={cliente}
            columns={columns}
            checkboxSelection={false}
            disableColumnFilter={true}
            disableColumnMenu={true}
            showColumnRightBorder={true}
            disableSelectionOnClick={true}
            hideFooterSelectedRowCount={true}
            disableColumnSelector={true}
            autoPageSize={true}
            pageSize={6}
            rowsPerPageOptions={[6]}
            showCellRightBorder={true}
          />
        </ContenedorDataGrid>
      )}
    </Contenedor>
  );
};

export default GestionClientes;

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

const PanelBuscar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem 0;
  position: relative;
`;

const Label = styled.label`
  font-weight: 500;
  color: #35465c;
  text-shadow: 2px 8px 6px rgba(0, 0, 0, 0.2),
    0px -5px 35px rgba(255, 255, 255, 0.3);

  @media screen and (max-width: 480px) {
    display: none;
  }
`;

const Input = styled.input`
  font-family: poppins;
  font-size: 1rem;
  flex: 1;
  outline: none;
  padding: 5px 30px 5px 10px;
  background: #fff;
  border-radius: 3px;
  border: 1px solid var(--light-blue);

  &::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #bbb;
    opacity: 1; /* Firefox */
  }

  /* Media Query para dispositivos móviles */
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const IconoCerrar = styled.div`
  position: absolute;
  top: 3px;
  right: 3px;
  width: 27px;
  height: 27px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;
  border-radius: 50%;

  &:hover {
    cursor: pointer;
    background-color: #35465c;
    color: #fff;
  }
`;

const ContenedorDataGrid = styled.div`
  height: 423px;
  max-width: 1201.5px;
  margin: 0 auto;
`;

const DataGridPersonal = styled(DataGrid)`
  border: 1px solid #3b5998 !important;
  border-radius: 5px !important;
  box-shadow: 0 14px 26px -12px rgb(59 89 152 / 42%),
    0 4px 23px 0px rgb(0 0 0 / 12%), 0 8px 10px -5px rgb(59 89 152 / 20%);

  & .header {
    background: var(--light-blue);
    color: #fff;
  }

  // Permite eliminar el borde azul que se crea cuando se selecciona una celda
  &.MuiDataGrid-root .MuiDataGrid-columnHeader:focus,
  &.MuiDataGrid-root .MuiDataGrid-cell:focus,
  &.MuiDataGrid-root .MuiDataGrid-columnHeader:active,
  &.MuiDataGrid-root .MuiDataGrid-cell:active,
  &.MuiDataGrid-root .MuiDataGrid-columnHeader:focus-within,
  &.MuiDataGrid-root .MuiDataGrid-cell:focus-within {
    outline: none;
  }
`;
