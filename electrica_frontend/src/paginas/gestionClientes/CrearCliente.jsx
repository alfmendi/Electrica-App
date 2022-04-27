import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import styled from "styled-components";

import { ToastContainer } from "react-toastify";

import {
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

import { crearCliente } from "../../redux/clientesSlice";
import { setMensajeAMostrar, setOpcionActiva } from "../../redux/empleadoSlice";

import useAxiosPrivado from "../../hooks/useAxiosPrivado";

import generarMensajeError from "../../error/generarMensajeError";

// -----------------------------------------------------
// -----------------------------------------------------
// - Componente para añadir un nuevo cliente a la BBDD -
// -----------------------------------------------------
// -----------------------------------------------------
const CrearCliente = () => {
  const axiosPrivado = useAxiosPrivado();
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const { opcionActiva } = useSelector((state) => state.empleado);

  const tarifas = useSelector((state) =>
    state.tarifas.tarifas.filter((tarifa) => !tarifa.tarifaBase)
  );

  const [dni, setDni] = useState("");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [localidad, setLocalidad] = useState("");
  const [cups, setCups] = useState("");
  const [potencia, setPotencia] = useState("");
  const [tarifa, setTarifa] = useState("");

  const valoresPotencia = [2.3, 3.45, 4.6, 5.75, 6.9, 8.05, 9.2, 10.35];

  // -------------------------------------------------------
  // - UseEffect para establecer la opción del menú activa -
  // -------------------------------------------------------
  useEffect(() => {
    if (!opcionActiva) {
      dispatch(setOpcionActiva(2));
    }
  }, []);

  // -----------------------------------------------
  // - Método para almacenar el cliente en la BBDD -
  // -----------------------------------------------
  const handleAceptar = async (e) => {
    e.preventDefault();
    try {
      const nuevoCliente = {
        dni,
        nombre,
        email,
        telefono,
        direccion,
        localidad,
        cups,
        potencia,
        tarifa,
      };
      // axiosPrivado es el hook no el módulo exportado de axiosAPI
      // useAxiosPrivado llama al módulo exportado de axiosAPI
      const respuesta = await axiosPrivado.post("/api/clientes", nuevoCliente);
      dispatch(crearCliente(respuesta.data));
      dispatch(setMensajeAMostrar("Cliente creado correctamente"));
      navigate("/clientes");
    } catch (error) {
      generarMensajeError(error, "bottom-center");
    }
  };

  // -------
  // - JSX -
  // -------
  return (
    <Contenedor>
      <ToastContainer limit={1} />
      <Form onSubmit={handleAceptar}>
        <Titulo>Crear Cliente</Titulo>
        <Linea>
          <Label>DNI</Label>
          <Input
            type="text"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            placeholder={"DNI del cliente..."}
            pattern="^[0-9]{8}[a-zA-Z]{1}$"
            required
          />
        </Linea>
        <Linea>
          <Label>Nombre</Label>
          <Input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder={"Nombre del cliente..."}
            required
          />
        </Linea>
        <Linea>
          <Label>Email</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={"Email del cliente..."}
            pattern='^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
            required
          />
        </Linea>
        <Linea>
          <Label>Teléfono</Label>
          <Input
            type="text"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            placeholder={"Teléfono del cliente..."}
            pattern="[0-9]{9}"
            required
          />
        </Linea>
        <Linea>
          <Label>Dirección</Label>
          <Input
            type="text"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            placeholder={"Dirección del cliente..."}
            required
          />
        </Linea>
        <Linea>
          <Label>Localidad</Label>
          <Input
            type="text"
            value={localidad}
            onChange={(e) => setLocalidad(e.target.value)}
            placeholder={"Localidad del cliente..."}
            required
          />
        </Linea>
        <Linea>
          <Label>CUPS</Label>
          <Input
            type="text"
            value={cups}
            onChange={(e) => setCups(e.target.value)}
            placeholder="Formato ES0000000000000000AA..."
            pattern="^[Ee][Ss][0-9]{16}[a-zA-Z]{2}$"
            required
          />
        </Linea>
        <Linea>
          <Label>Tarifa</Label>
          <FormControl fullWidth size="small">
            <InputLabelPersonal shrink={false}>
              {tarifa === "" && "Seleccione una opción..."}
            </InputLabelPersonal>
            <SelectPersonal
              value={tarifa}
              onChange={(event) => setTarifa(event.target.value)}
              displayEmpty
              required
            >
              {tarifas.map((elemento) => {
                return (
                  <MenuItem key={elemento.id} value={`${elemento.nombre}`}>
                    <ListItemText
                      primary={
                        <TypographyPersonal>
                          {elemento.nombre}
                        </TypographyPersonal>
                      }
                    />
                  </MenuItem>
                );
              })}
            </SelectPersonal>
          </FormControl>
        </Linea>
        <Linea>
          <Label>Potencia</Label>
          <FormControl fullWidth size="small">
            <InputLabelPersonal shrink={false}>
              {potencia === "" && "Seleccione una opción..."}
            </InputLabelPersonal>
            <SelectPersonal
              value={potencia}
              onChange={(event) => setPotencia(event.target.value)}
              displayEmpty
              required
            >
              {valoresPotencia.map((elemento, indice) => {
                return (
                  <MenuItem key={indice} value={elemento}>
                    <ListItemText
                      primary={
                        <TypographyPersonal>{elemento} kW</TypographyPersonal>
                      }
                    />
                  </MenuItem>
                );
              })}
            </SelectPersonal>
          </FormControl>
        </Linea>
        <Linea>
          <BotonCancelar
            type="button"
            onClick={() => {
              navigate("/clientes");
            }}
          >
            Cancelar
          </BotonCancelar>
          <Boton type="submit">Aceptar</Boton>
        </Linea>
      </Form>
    </Contenedor>
  );
};

export default CrearCliente;

// ---------------------
// - Styled Components -
// ---------------------
const Contenedor = styled.div`
  position: relative;
  padding: 2rem 1rem 1rem 1rem;
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
  z-index: 10;
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

const InputLabelPersonal = styled(InputLabel)`
  color: #bbb !important;
  font-family: poppins !important;
  font-size: 1rem !important;

  /* Media Query para dispositivos móviles */
  @media (max-width: 480px) {
    font-size: 0.8rem !important;
  }
`;

const SelectPersonal = styled(Select)`
  height: 35px;
  background: #fff;
`;

const TypographyPersonal = styled(Typography)`
  font-family: poppins !important;
  font-size: 1rem !important;

  /* Media Query para dispositivos móviles */
  @media (max-width: 480px) {
    font-size: 0.8rem !important;
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
