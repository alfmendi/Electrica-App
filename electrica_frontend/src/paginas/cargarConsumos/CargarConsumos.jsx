import { useState, useEffect, useRef } from "react";

import { useSelector, useDispatch } from "react-redux";

import useAxiosPrivado from "../../hooks/useAxiosPrivado";

import { useNavigate, Link } from "react-router-dom";

import styled from "styled-components";

import { ToastContainer, toast, Zoom } from "react-toastify";

import { setMensajeAMostrar, setOpcionActiva } from "../../redux/empleadoSlice";

import generarMensajeError from "../../error/generarMensajeError";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

// -----------------------------------------------------------------
// -----------------------------------------------------------------
// - Componente que muestra la página de inicio para llevar a cabo -
// - la carga de los consumos                                      -
// -----------------------------------------------------------------
// -----------------------------------------------------------------
const CargarConsumos = () => {
  const axiosPrivado = useAxiosPrivado();
  const { opcionActiva, mensajeAMostrar } = useSelector(
    (state) => state.empleado
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [existenClientes, setExistenClientes] = useState(false);
  const [existenConceptosFactura, setExistenConceptosFactura] = useState(false);

  const inputFileRef = useRef();
  const [ficheros, setFicheros] = useState(null);
  const [numeroFicheros, setNumeroFicheros] = useState(0);

  const toastId = useRef(null);

  // Variable para determinar si se muestra el mensaje de "Cargando consumos en la BBDD..."
  let loading = true;

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

  // ---------------------------------------------------------------
  // - UseEffect para establecer la opción activa del menú lateral -
  // ---------------------------------------------------------------
  useEffect(() => {
    if (!opcionActiva) {
      dispatch(setOpcionActiva(6));
    }
  }, []);

  // -------------------------------------------------
  // - UseEffect para establecer si existen clientes -
  // -------------------------------------------------
  useEffect(() => {
    const existenClientes = async () => {
      try {
        const existen = await axiosPrivado.get("/api/clientes");
        existen.data > 0 ? setExistenClientes(true) : setExistenClientes(false);
      } catch (error) {
        generarMensajeError(error);
      }
    };
    existenClientes();
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

  // ----------------------------------------------------------------------
  // - UseEffect para obtener el número de ficheros con datos para cargar -
  // ----------------------------------------------------------------------
  useEffect(() => {
    const conseguirNumeroFicheros = async () => {
      try {
        const respuesta = await axiosPrivado.get(
          "/api/consumos/ficherosDatos/numero"
        );
        setNumeroFicheros(respuesta.data.numero);
      } catch (error) {
        generarMensajeError(error);
      }
    };
    conseguirNumeroFicheros();
  }, []);

  // --------------------------------------------
  // - Método para volver a la pagina de inicio -
  // --------------------------------------------
  const volverPaginaCorporativa = () => {
    dispatch(setOpcionActiva(null));
    navigate("/");
  };

  // --------------------------------------------------------------------
  // - Método para almacenar el fichero con los consumos en el servidor -
  // --------------------------------------------------------------------
  const handleAceptarSubir = async (e) => {
    e.preventDefault();
    try {
      // Procedimiento para subir el fichero al servidor
      const data = new FormData();
      data.append("ficheros", ficheros);
      const respuestaCargarFicheros = await axiosPrivado.post(
        "/api/consumos/guardar",
        data
      );
      dispatch(setMensajeAMostrar(respuestaCargarFicheros.data.mensaje));
      setNumeroFicheros(numeroFicheros + 1);
    } catch (error) {
      generarMensajeError(error, "bottom-center");
    } finally {
      inputFileRef.current.value = "";
      setFicheros(null);
    }
  };

  // -------------------------------------------------
  // - Método para almacenar los consumos en la BBDD -
  // -------------------------------------------------
  const handleAceptarCargar = async (e) => {
    e.preventDefault();
    try {
      if (loading === true) {
        toastId.current = toast.success("Cargando consumos en la BBDD...", {
          position: "bottom-center",
          hideProgressBar: true,
          draggable: true,
          progress: undefined,
          transition: Zoom,
          theme: "colored",
          // className: "contenedor__toastify",
          bodyClassName: "texto__toastify",
        });
      }

      setNumeroFicheros(0);
      await axiosPrivado.post("/api/consumos");
      loading = false;
      if (loading === false) {
        setTimeout(() => toast.dismiss(toastId.current), 3000);
      }
    } catch (error) {
      generarMensajeError(error, "bottom-center");
    }
  };

  // -------
  // - JSX -
  // -------
  return (
    <Contenedor>
      {loading && <ToastContainer limit={1} />}
      {mensajeAMostrar && <ToastContainer limit={1} />}
      <PanelBotones>
        <Icono onClick={volverPaginaCorporativa}>
          <ArrowBackIosNewIcon sx={{ fontSize: "0.9rem" }} />
        </Icono>
      </PanelBotones>
      <Form style={{ marginTop: "2rem" }}>
        <Titulo>Cargar Consumos</Titulo>
        <Linea>
          <Label>Información</Label>
          <TextArea
            value="Esta opción permite subir ficheros (en formato JSON) con los consumos de los clientes a un directorio del servidor llamado 'consumosPorLeer'. 
              Una vez subidos dichos ficheros, se deben cargar a la Base de Datos empleando el botón 'Subir a la BBDD'.
              Tras ser leidos, los ficheros son movidos a la carpeta 'consumosLeidos' del servidor para evitar que puedan ser leidos nuevamente. 
              El botón 'Subir a la BBDD' permanecerá deshabilitado cuando no haya ningún fichero con datos de consumo en la carpeta 'consumosPorLeer'."
            rows="10"
            readOnly
          />
        </Linea>
      </Form>
      <Form
        id="formularioSubir"
        onSubmit={handleAceptarSubir}
        enctype="multipart/form-data"
        style={{ marginTop: "1rem" }}
      >
        <Linea>
          <Label>Fichero con consumos</Label>
          <InputFile
            id="ficheros"
            name="ficheros"
            type="file"
            accept=".json"
            onChange={(e) => {
              const ficherosSeleccionados = e.target.files[0];
              setFicheros(ficherosSeleccionados);
            }}
            ref={inputFileRef}
            required
          />
        </Linea>
        <Linea>
          {!existenClientes ||
          !existenConceptosFactura ||
          numeroFicheros === 0 ? (
            <BotonDeshabilitado>Subir a la BBDD</BotonDeshabilitado>
          ) : (
            <Boton type="button" onClick={handleAceptarCargar}>
              Subir a la BBDD
            </Boton>
          )}
          {!existenClientes || !existenConceptosFactura ? (
            <BotonDeshabilitado>Aceptar</BotonDeshabilitado>
          ) : (
            <Boton type="submit">Aceptar</Boton>
          )}
        </Linea>
      </Form>
    </Contenedor>
  );
};

export default CargarConsumos;

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

const Form = styled.form`
  position: relative;
  max-width: 600px;
  margin: 0 auto;
  border: 1px solid var(--light-blue);
  border-radius: 3px;
  padding: 3rem 1rem 1rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 2.1rem;
  box-shadow: 0 14px 26px -12px rgb(59 89 152 / 42%),
    0 4px 23px 0px rgb(0 0 0 / 12%), 0 8px 10px -5px rgb(59 89 152 / 20%);
`;

const Titulo = styled.div`
  position: absolute;
  width: 90%;
  top: -1rem;
  left: 0;
  right: 0;
  margin: 0 auto;
  text-align: center;
  font-weight: 700;
  letter-spacing: 1px;
  background: var(--light-blue);
  color: #fff;
  padding: 0.2rem 0.5rem;
  border-radius: 3px;
`;

const Linea = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.label`
  position: absolute;
  top: -18px;
  left: 10px;
  background: var(--light-blue);
  color: #fff;
  font-weight: 500;
  padding: 2px 10px 0px 10px;
  border-radius: 3px;
  font-size: 14px;
  box-shadow: 2px 8px 6px rgba(0, 0, 0, 0.2),
    0px -5px 35px rgba(255, 255, 255, 0.3);
`;

const Input = styled.input`
  font-family: poppins;
  font-size: 1rem;
  flex: 1;
  outline: none;
  padding: 8px 10px 2px 10px;
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

const BotonCancelar = styled(Boton)`
  background-color: #cc2127;
  box-shadow: 0 2px 2px 0 rgb(204 33 39 / 14%),
    0 3px 1px -2px rgb(204 33 39 / 20%), 0 1px 5px 0 rgb(204 33 39 / 12%);

  &:hover {
    background: #e52d27;
    box-shadow: 0 14px 26px -12px rgb(204 33 39 / 42%),
      0 4px 23px 0px rgb(0 0 0 / 12%), 0 8px 10px -5px rgb(204 33 39 / 20%);
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
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

const TextArea = styled.textarea`
  font-family: poppins;
  font-size: 1rem;
  flex: 1;
  outline: none;
  padding: 5px 10px;
  background: #fff;
  border-radius: 3px;
  border: 1px solid var(--light-blue);
  resize: none;
  transition: 0.2s all ease-in-out;

  &::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #bbb;
    opacity: 1; /* Firefox */
  }

  &:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #bbb;
  }

  &::-ms-input-placeholder {
    /* Microsoft Edge */
    color: #bbb;
  }

  /* Media Query para dispositivos móviles */
  @media (max-width: 480px) {
    font-size: 0.8rem;
    width: 100%;
  }
`;

const InputFile = styled.input`
  font-family: poppins;
  font-size: 1rem;
  flex: 1;
  outline: none;
  background: #fff;
  border-radius: 3px;
  border: 1px solid var(--light-blue);

  &::-webkit-file-upload-button {
    background: #e3edf7;
    padding: 10px;
    border: none;
    border-radius: 3px;
    border-right: 1px solid #ddd;
    outline: none;

    &:hover {
      cursor: pointer;
    }
  }

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
