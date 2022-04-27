import { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";

import { ToastContainer } from "react-toastify";

import { setOpcionActiva } from "../../redux/empleadoSlice";

import useAxiosPrivado from "../../hooks/useAxiosPrivado";

import generarMensajeError from "../../error/generarMensajeError";

// ---------------------------------------------------
// ---------------------------------------------------
// - Componente para consultar un cliente de la BBDD -
// ---------------------------------------------------
// ---------------------------------------------------
const ConsultarCliente = () => {
  const axiosPrivado = useAxiosPrivado();
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const { opcionActiva } = useSelector((state) => state.empleado);

  const { clienteId } = useParams();

  const [dni, setDni] = useState("");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [localidad, setLocalidad] = useState("");
  const [cups, setCups] = useState("");
  const [potencia, setPotencia] = useState("");
  const [tarifa, setTarifa] = useState("");

  // -------------------------------------------------------
  // - UseEffect para establecer la opción del menú activa -
  // -------------------------------------------------------
  useEffect(() => {
    if (!opcionActiva) {
      dispatch(setOpcionActiva(2));
    }
  }, []);

  // ------------------------------------------------
  // - UseEffect para obtener los datos a consultar -
  // ------------------------------------------------
  useEffect(() => {
    const conseguirCliente = async () => {
      try {
        // axiosPrivado es el hook no el módulo exportado de axiosAPI
        // useAxiosPrivado llama al módulo exportado de axiosAPI
        const respuesta = await axiosPrivado.get(`/api/clientes/${clienteId}`);
        setDni(respuesta.data.dni);
        setNombre(respuesta.data.nombre);
        setEmail(respuesta.data.email);
        setTelefono(respuesta.data.telefono);
        setDireccion(respuesta.data.direccion);
        setLocalidad(respuesta.data.localidad);
        setCups(respuesta.data.cups);
        setPotencia(respuesta.data.potencia);
        setTarifa(respuesta.data.tarifa.nombre);
      } catch (error) {
        generarMensajeError(error);
      }
    };
    conseguirCliente();
  }, []);

  // -------
  // - JSX -
  // -------
  return (
    <Contenedor>
      <ToastContainer limit={1} />
      <Form>
        <Titulo>Consultar Cliente</Titulo>
        <Linea>
          <Label>DNI</Label>
          <Input type="text" value={dni} disabled />
        </Linea>
        <Linea>
          <Label>Nombre</Label>
          <Input type="text" value={nombre} disabled />
        </Linea>
        <Linea>
          <Label>Email</Label>
          <Input type="email" value={email} disabled />
        </Linea>
        <Linea>
          <Label>Teléfono</Label>
          <Input type="text" value={telefono} disabled />
        </Linea>
        <Linea>
          <Label>Dirección</Label>
          <Input type="text" value={direccion} disabled />
        </Linea>
        <Linea>
          <Label>Localidad</Label>
          <Input type="text" value={localidad} disabled />
        </Linea>
        <Linea>
          <Label>CUPS</Label>
          <Input type="text" value={cups} disabled />
        </Linea>
        <Linea>
          <Label>Tarifa</Label>
          <Input type="text" value={tarifa} disabled />
        </Linea>
        <Linea>
          <Label>Potencia</Label>
          <Input
            style={{ textAlign: "right", paddingRight: "36px" }}
            type="text"
            value={potencia}
            disabled
          />
          <Simbolo>kW</Simbolo>
        </Linea>
        <Linea>
          <Boton
            type="button"
            onClick={() => {
              navigate("/clientes");
            }}
          >
            Aceptar
          </Boton>
        </Linea>
      </Form>
    </Contenedor>
  );
};

export default ConsultarCliente;

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

  /* Chrome, Safari, Edge, Opera */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  &[type="number"] {
    -moz-appearance: textfield;
  }

  /* Media Query para dispositivos móviles */
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const Simbolo = styled.span`
  font-size: 0.9rem;
  position: absolute;
  top: 10px;
  right: 10px;

  @media (max-width: 480px) {
    font-size: 0.8rem;
    top: 9px;
    right: 14px;
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
