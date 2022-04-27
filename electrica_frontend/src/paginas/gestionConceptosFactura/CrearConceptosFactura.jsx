import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import styled from "styled-components";

import { ToastContainer } from "react-toastify";

import { setMensajeAMostrar, setOpcionActiva } from "../../redux/empleadoSlice";

import useAxiosPrivado from "../../hooks/useAxiosPrivado";

import generarMensajeError from "../../error/generarMensajeError";

// --------------------------------------------------
// --------------------------------------------------
// - Componente para añadir un registro con los     -
// - diferentes conceptos aplicables a las facturas -
// --------------------------------------------------
// --------------------------------------------------
const CrearConceptosFactura = () => {
  const axiosPrivado = useAxiosPrivado();
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const { opcionActiva } = useSelector((state) => state.empleado);

  const [precioPotencia, setPrecioPotencia] = useState(0);
  const [impuestoElectricidad, setImpuestoElectricidad] = useState(0);
  const [alquilerEquipos, setAlquilerEquipos] = useState(0);
  const [iva, setIva] = useState(0);

  // -------------------------------------------------------
  // - UseEffect para establecer la opción del menú activa -
  // -------------------------------------------------------
  useEffect(() => {
    if (!opcionActiva) {
      dispatch(setOpcionActiva(7));
    }
  }, []);

  // -------------------------------------------------------------
  // - Método para almacenar los conceptos de factura en la BBDD -
  // -------------------------------------------------------------
  const handleAceptar = async (e) => {
    e.preventDefault();
    try {
      const nuevoRegistro = {
        precioPotencia,
        impuestoElectricidad,
        alquilerEquipos,
        iva,
      };
      // axiosPrivado es el hook no el módulo exportado de axiosAPI
      // useAxiosPrivado llama al módulo exportado de axiosAPI
      await axiosPrivado.post("/api/conceptosFactura", nuevoRegistro);
      dispatch(setMensajeAMostrar("Registro creado correctamente"));
      navigate("/conceptosFactura");
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
        <Titulo>Crear Parámetros</Titulo>
        <Linea>
          <Label>Precio Potencia</Label>
          <Input
            style={{ textAlign: "right", paddingRight: "56px" }}
            type="number"
            min="0.001"
            step="any"
            value={precioPotencia}
            onChange={(e) => setPrecioPotencia(e.target.value)}
            required
          />
          <Simbolo>€/kW</Simbolo>
        </Linea>
        <Linea>
          <Label>Impuesto Electricidad</Label>
          <Input
            style={{ textAlign: "right", paddingRight: "26px" }}
            type="number"
            min="0.1"
            step="any"
            value={impuestoElectricidad}
            onChange={(e) => setImpuestoElectricidad(e.target.value)}
            required
          />
          <Simbolo>%</Simbolo>
        </Linea>
        <Linea>
          <Label>Precio Alquiler Equipos</Label>
          <Input
            style={{ textAlign: "right", paddingRight: "56px" }}
            type="number"
            min="0.001"
            step="any"
            name="alquilerEquipos"
            value={alquilerEquipos}
            onChange={(e) => setAlquilerEquipos(e.target.value)}
            required
          />
          <Simbolo>€/día</Simbolo>
        </Linea>
        <Linea>
          <Label>IVA</Label>
          <Input
            style={{ textAlign: "right", paddingRight: "26px" }}
            type="number"
            min="0.1"
            name="iva"
            step="any"
            value={iva}
            onChange={(e) => setIva(e.target.value)}
            required
          />
          <Simbolo>%</Simbolo>
        </Linea>
        <Linea>
          <BotonCancelar
            type="button"
            onClick={() => {
              navigate("/conceptosFactura");
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

export default CrearConceptosFactura;

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
