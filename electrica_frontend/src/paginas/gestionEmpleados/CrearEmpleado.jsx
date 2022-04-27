import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import styled from "styled-components";

import { ToastContainer } from "react-toastify";

import { Switch } from "@mui/material";

import { crearEmpleado } from "../../redux/empleadosSlice";
import { setMensajeAMostrar, setOpcionActiva } from "../../redux/empleadoSlice";

import useAxiosPrivado from "../../hooks/useAxiosPrivado";

import generarMensajeError from "../../error/generarMensajeError";

// ------------------------------------------------------
// ------------------------------------------------------
// - Componente para añadir un nuevo empleado a la BBDD -
// ------------------------------------------------------
// ------------------------------------------------------
const CrearEmpleado = () => {
  const axiosPrivado = useAxiosPrivado();
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const { opcionActiva } = useSelector((state) => state.empleado);

  const [nombre, setNombre] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [esAdmin, setEsAdmin] = useState(false);

  // -------------------------------------------------------
  // - UseEffect para establecer la opción del menú activa -
  // -------------------------------------------------------
  useEffect(() => {
    if (!opcionActiva) {
      dispatch(setOpcionActiva(1));
    }
  }, []);

  // ------------------------------------------------
  // - Método para almacenar el empleado en la BBDD -
  // ------------------------------------------------
  const handleAceptar = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmarPassword) {
        throw new Error("Los passwords introducidos no coinciden");
      }
      const nuevoEmpleado = { nombre, username, password, esAdmin };
      // axiosPrivado es el hook no el módulo exportado de axiosAPI
      // useAxiosPrivado llama al módulo exportado de axiosAPI
      const respuesta = await axiosPrivado.post(
        "/api/empleados",
        nuevoEmpleado
      );
      dispatch(crearEmpleado(respuesta.data));
      dispatch(setMensajeAMostrar("Empleado creado correctamente"));
      navigate("/empleados");
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
        <Titulo>Crear Empleado</Titulo>
        <Linea>
          <Label>Nombre</Label>
          <Input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder={"Nombre del empleado..."}
            required
          />
        </Linea>
        <Linea>
          <Label>Username</Label>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={"Username del empleado..."}
            required
          />
        </Linea>
        <Linea>
          <Label>Password</Label>
          <Input
            type="password"
            value={password}
            pattern=".{6,}"
            onChange={(e) => setPassword(e.target.value)}
            placeholder={"Password del empleado..."}
            required
          />
        </Linea>
        <Linea>
          <Label>Confirmar</Label>
          <Input
            type="password"
            value={confirmarPassword}
            pattern=".{6,}"
            onChange={(e) => setConfirmarPassword(e.target.value)}
            placeholder={"Confirma el password..."}
            required
          />
        </Linea>
        <Linea>
          <Label>Administrador</Label>
          <div
            style={{
              position: "absolute",
              top: -26,
              left: 150,
            }}
          >
            <Switch
              value={esAdmin}
              checked={esAdmin}
              onChange={() => setEsAdmin(!esAdmin)}
            />
          </div>
        </Linea>
        <Linea>
          <BotonCancelar
            type="button"
            onClick={() => {
              navigate("/empleados");
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

export default CrearEmpleado;

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
