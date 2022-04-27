import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { useNavigate, Link } from "react-router-dom";

import styled from "styled-components";

import { DataGrid } from "@mui/x-data-grid";

import { ToastContainer, toast, Zoom } from "react-toastify";

import { setMensajeAMostrar, setOpcionActiva } from "../../redux/empleadoSlice";

import { columns } from "./estructuraTabla";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CloseIcon from "@mui/icons-material/Close";

// -----------------------------------------------------------------
// -----------------------------------------------------------------
// - Componente que muestra la página de inicio para llevar a cabo -
// - la gestión de las tarifas                                     -
// -----------------------------------------------------------------
// -----------------------------------------------------------------
const GestionTarifas = () => {
  const { ocultarSidebar, opcionActiva, mensajeAMostrar } = useSelector(
    (state) => state.empleado
  );
  const { tarifas } = useSelector((state) => state.tarifas);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [nombreTarifa, setNombreTarifa] = useState("");
  const [tarifasFiltro, setTarifasFiltro] = useState([]);
  const [buscar, setBuscar] = useState(false);

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

  // ----------------------------------------------------------------------------------
  // - UseEffect para conseguir todos las tarifas que cumplen la condición del filtro -
  // ----------------------------------------------------------------------------------
  useEffect(() => {
    if (!opcionActiva) {
      dispatch(setOpcionActiva(3));
    }
    if (nombreTarifa !== "") {
      setTarifasFiltro(
        tarifas.filter((elemento) =>
          elemento.nombre.toLowerCase().includes(nombreTarifa.toLowerCase())
        )
      );
      setBuscar(true);
    } else {
      setBuscar(false);
    }
  }, [nombreTarifa, tarifas]);

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
        <Boton>
          <StyledLink to={"/tarifas/crear"}>Crear Tarifa</StyledLink>
        </Boton>
      </PanelBotones>
      <PanelBuscar>
        <Label>Tarifa</Label>
        <Input
          placeholder={"Introduce el nombre de la tarifa..."}
          value={nombreTarifa}
          onChange={(e) => setNombreTarifa(e.target.value)}
          required
        />
        <IconoCerrar
          onClick={() => {
            setTarifasFiltro(tarifas);
            setNombreTarifa("");
          }}
        >
          <CloseIcon />
        </IconoCerrar>
      </PanelBuscar>

      {windowWidth <= 768 && !ocultarSidebar ? null : (
        <ContenedorDataGrid>
          <DataGridPersonal
            rows={
              !buscar ? tarifas : tarifasFiltro.length > 0 ? tarifasFiltro : []
            }
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

export default GestionTarifas;

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
  max-width: 1001.5px;
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
