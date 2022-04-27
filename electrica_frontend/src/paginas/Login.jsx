import { useState } from "react";

import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import styled from "styled-components";

import { ToastContainer } from "react-toastify";

import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Input,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { setEmpleado } from "../redux/empleadoSlice";

import axios from "../axiosAPI/axios";

import generarMensajeError from "../error/generarMensajeError";

import spinner from "../assets/spinner.gif";

// -------------------------------------------------------
// -------------------------------------------------------
// - Componente para gestionar el login de los empleados -
// -------------------------------------------------------
// -------------------------------------------------------
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);

  // -------------------------------------------------
  // - Método que gestiona el login de los empleados -
  // -------------------------------------------------
  const gestionarLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const credenciales = { username, password };
    try {
      const empleado = await axios.post("/api/auth/login", credenciales);
      setUsername("");
      setPassword("");
      dispatch(setEmpleado(empleado.data));
      navigate("/");
    } catch (error) {
      generarMensajeError(error);
    } finally {
      setLoading(false);
    }
  };

  // -------
  // - JSX -
  // -------
  return (
    <Contenedor>
      <ToastContainer limit={1} />
      <Form onSubmit={gestionarLogin}>
        <Titulo>Inicia Sesión</Titulo>
        <Entradas>
          <FormControl variant="standard" size="small" required>
            <InputLabel htmlFor="login__username">Username</InputLabel>
            <Input
              id="login__username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              label="Username"
              autoComplete="off"
            />
          </FormControl>
          <FormControl variant="standard" size="small" required>
            <InputLabel htmlFor="login__password">Password</InputLabel>
            <Input
              id="login__password"
              type={mostrarPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    disableRipple={true}
                    onClick={() =>
                      setMostrarPassword((valorAnterior) => !valorAnterior)
                    }
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                  >
                    {mostrarPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
        </Entradas>
        <Footer>
          <Boton type="submit">
            {loading ? (
              <Spinner src={spinner} alt="logging..." />
            ) : (
              "INICIA SESIÓN AHORA"
            )}
          </Boton>
        </Footer>
      </Form>
      <div style={{ marginTop: "1rem" }}>
        <h4>Datos para prueba</h4>
        <p>Username: invitado</p>
        <p>Password: invitado</p>
      </div>
    </Contenedor>
  );
};

export default Login;

// ---------------------
// - Styled Components -
// ---------------------
const Contenedor = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  // Añadido para datos pruebas
  flex-direction: column;
`;

const Form = styled.form`
  position: relative;
  width: 350px;
  height: 320px;
  padding: 60px 20px 20px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: rgb(0 0 0 / 10%) 0rem 0.25rem 0.375rem -0.0625rem,
    rgb(0 0 0 / 6%) 0rem 0.125rem 0.25rem -0.0625rem;

  /* Media Query para dispositivos móviles */
  @media (max-width: 480px) {
    width: 300px;
    height: 380px;
  }
`;

const Titulo = styled.div`
  z-index: 10;
  position: absolute;
  margin: 0 auto;
  top: -40px;
  left: 0;
  bottom: 0;
  right: 0;
  width: 90%;
  height: 80px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: 1.5px;
  background: linear-gradient(195deg, var(--light-blue), var(--dark-blue));
  color: #fff;
  box-shadow: rgb(0 0 0 / 14%) 0rem 0.25rem 1.25rem 0rem,
    rgb(0 187 212 / 40%) 0rem 0.4375rem 0.625rem -0.3125rem;
`;

const Entradas = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: center;

  p {
    color: rgb(123, 128, 154);
    font-weight: 300;
    font-size: 12px;
  }

  a {
    text-decoration: none;
    color: #1a73e8;
    font-weight: 600;
  }
`;

const Boton = styled.button`
  font-family: poppins;
  border: none;
  background-color: var(--light-blue);
  color: #fff;
  border-radius: 3px;
  padding: 4px 8px;
  text-align: center;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  box-shadow: 0 2px 2px 0 rgb(53 70 92 / 14%),
    0 3px 1px -2px rgb(53 70 92 / 20%), 0 1px 5px 0 rgb(53 70 92 / 12%);

  &:hover {
    background: var(--dark-blue);
    box-shadow: 0 14px 26px -12px rgb(53 70 92 / 42%),
      0 4px 23px 0px rgb(0 0 0 / 12%), 0 8px 10px -5px rgb(53 70 92 / 20%);
  }

  @media screen and (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const Spinner = styled.img`
  height: 12px;
`;
