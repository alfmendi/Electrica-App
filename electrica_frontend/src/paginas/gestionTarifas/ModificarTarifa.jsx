import { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";

import { ToastContainer } from "react-toastify";

import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  Switch,
  Typography,
} from "@mui/material";

import { modificarTarifa } from "../../redux/tarifasSlice";
import { setMensajeAMostrar, setOpcionActiva } from "../../redux/empleadoSlice";

import useAxiosPrivado from "../../hooks/useAxiosPrivado";

import generarMensajeError from "../../error/generarMensajeError";

const ITEM_HEIGHT = 24;
const ITEM_PADDING_TOP = 4;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 6 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const valoresEstacional = [
  "Primavera",
  "Verano",
  "Otoño",
  "Invierno",
  "Noches",
  "Fines de semana",
];
const valoresHoras = [
  "00",
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
];

// ---------------------------------------------------
// ---------------------------------------------------
// - Componente para modificar una tarifa de la BBDD -
// ---------------------------------------------------
// ---------------------------------------------------
const ModificarTarifa = () => {
  const axiosPrivado = useAxiosPrivado();
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const { opcionActiva } = useSelector((state) => state.empleado);

  const { tarifaId } = useParams();

  const [nombre, setNombre] = useState("");
  const [tarifaBase, setTarifaBase] = useState(false);
  const [descripcion, setDescripcion] = useState("");
  const [precioHoraNormal, setPrecioHoraNormal] = useState(0);
  const [precioHoraEspecial, setPrecioHoraEspecial] = useState(0);

  const [estacional, setEstacional] = useState([]);
  const [horas, setHoras] = useState([]);
  const [opcion, setOpcion] = useState(false);

  // -------------------------------------------------------
  // - UseEffect para establecer la opción del menú activa -
  // -------------------------------------------------------
  useEffect(() => {
    if (!opcionActiva) {
      dispatch(setOpcionActiva(3));
    }
  }, []);

  // ------------------------------------------------
  // - UseEffect para obtener los datos a modificar -
  // ------------------------------------------------
  useEffect(() => {
    const conseguirTarifa = async () => {
      try {
        // axiosPrivado es el hook no el módulo exportado de axiosAPI
        // useAxiosPrivado llama al módulo exportado de axiosAPI
        const respuesta = await axiosPrivado.get(`/api/tarifas/${tarifaId}`);
        setNombre(respuesta.data.nombre);
        setTarifaBase(respuesta.data.tarifaBase);
        setDescripcion(respuesta.data.descripcion);
        setPrecioHoraNormal(respuesta.data.precioHoraNormal);
        setPrecioHoraEspecial(respuesta.data.precioHoraEspecial);
        setEstacional(respuesta.data.periodoPrecioEspecial.selectEstacional);
        setHoras(respuesta.data.periodoPrecioEspecial.selectHoras);
      } catch (error) {
        generarMensajeError(error);
      }
    };
    conseguirTarifa();
  }, []);

  // -----------------------------------------------------------------------------------------------------
  // - UseEffect para comprobar si se debe mostrar el select de Intervalo por días o Intervalo por horas -
  // -----------------------------------------------------------------------------------------------------
  useEffect(() => {
    // Todo esto porque setEstacional no realiza el cambio de manera síncrona.
    estacional.length > 0 ? setOpcion(false) : setOpcion(true);
  }, [estacional]);

  // -------------------------------------
  // - Menudas historias se me ocurren 1 -
  // -------------------------------------
  const handleChangeEstacional = (event) => {
    const {
      target: { value },
    } = event;
    setEstacional(typeof value === "string" ? value.split(",") : value);
  };

  // -------------------------------------
  // - Menudas historias se me ocurren 2 -
  // -------------------------------------
  const handleChangeHoras = (event) => {
    const {
      target: { value },
    } = event;
    setHoras(typeof value === "string" ? value.split(",") : value);
  };

  // ----------------------------------------------
  // - Método para modificar la tarifa en la BBDD -
  // ----------------------------------------------
  const handleAceptar = async (e) => {
    e.preventDefault();
    try {
      let periodoPrecioEspecial = {
        selectEstacional: estacional,
        selectHoras: horas,
        mes: [],
        dia: [],
        hora: [],
      };

      if (tarifaBase === true) {
        periodoPrecioEspecial = {
          selectEstacional: [],
          selectHoras: [
            "00",
            "01",
            "02",
            "03",
            "04",
            "05",
            "06",
            "07",
            "08",
            "09",
            "10",
            "11",
            "12",
            "13",
            "14",
            "15",
            "16",
            "17",
            "18",
            "19",
            "20",
            "21",
            "22",
            "23",
          ],
          mes: [],
          dia: [],
          hora: [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
            19, 20, 21, 22, 23,
          ],
        };
      } else {
        if (!opcion) {
          // Se ha elegido la opción "intervalo estacional"
          for (const elemento in estacional) {
            if (estacional[elemento] === "Invierno") {
              periodoPrecioEspecial.mes.push(12, 15, 3, 14);
            }
            if (estacional[elemento] === "Primavera") {
              periodoPrecioEspecial.mes.push(3, 15, 6, 14);
            }
            if (estacional[elemento] === "Verano") {
              periodoPrecioEspecial.mes.push(6, 15, 9, 14);
            }
            if (estacional[elemento] === "Otoño") {
              periodoPrecioEspecial.mes.push(9, 15, 12, 14);
            }
            if (estacional[elemento] === "Noches") {
              periodoPrecioEspecial.hora.push(
                0,
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12,
                13
              );
            }
            if (estacional[elemento] === "Fines de semana") {
              periodoPrecioEspecial.dia.push(5, 15, 7, 23);
            }
            if (periodoPrecioEspecial.hora.length === 0) {
              periodoPrecioEspecial.hora.push(
                0,
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12,
                13,
                14,
                15,
                16,
                17,
                18,
                19,
                20,
                21,
                22,
                23
              );
            }
          }
        } else {
          // Se ha elegido la opción "intervalo por horas"
          for (const elemento in horas) {
            periodoPrecioEspecial.hora.push(parseInt(horas[elemento]));
          }
        }
      }
      const nuevaTarifa = {
        nombre,
        tarifaBase,
        descripcion,
        precioHoraNormal,
        precioHoraEspecial,
        periodoPrecioEspecial,
      };
      // axiosPrivado es el hook no el módulo exportado de axiosAPI
      // useAxiosPrivado llama al módulo exportado de axiosAPI
      const respuesta = await axiosPrivado.patch(
        `/api/tarifas/${tarifaId}`,
        nuevaTarifa
      );
      dispatch(modificarTarifa(respuesta.data));
      dispatch(setMensajeAMostrar("Tarifa modificada correctamente"));
      navigate("/tarifas");
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
        <Titulo>Modificar Tarifa</Titulo>

        <Linea style={{ marginBottom: "1rem" }}>
          <Label>Tarifa Base</Label>
          <div
            style={{
              position: "absolute",
              top: -26,
              left: 150,
            }}
          >
            <Switch value={tarifaBase} checked={tarifaBase} disabled />
          </div>
        </Linea>

        <Linea>
          <Label>Nombre</Label>
          <Input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder={"Nombre de la tarifa..."}
            required
          />
        </Linea>
        <Linea>
          <Label>Descripción</Label>
          <TextArea
            value={descripcion}
            rows="5"
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder={"Introduce la descripción..."}
            required
          />
        </Linea>
        {!tarifaBase && (
          <Linea>
            <FormControlPersonal fullWidth>
              <Label>Parámetros de la tarifa</Label>
              <RadioGroup row>
                <FormControlLabel
                  value="estacional"
                  control={<Radio />}
                  label="Intervalo por Días"
                  onChange={() => setOpcion(false)}
                  checked={!opcion}
                />
                <FormControlLabel
                  value="horas"
                  control={<Radio />}
                  label="Intervalo por Horas"
                  onChange={() => setOpcion(true)}
                  checked={opcion}
                />
              </RadioGroup>
              {!opcion && (
                <FormControl size="small" sx={{ width: 230 }}>
                  <InputLabel
                    sx={{ fontSize: "13px" }}
                    id="demo-multiple-checkbox-label"
                  >
                    Elija las opciones deseadas...
                  </InputLabel>
                  <Select
                    sx={{ fontSize: "13px" }}
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={estacional}
                    onChange={handleChangeEstacional}
                    input={
                      <OutlinedInput label="Elija las opciones deseadas..." />
                    }
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={MenuProps}
                    required
                  >
                    {valoresEstacional.map((valor) => (
                      <MenuItem
                        key={valor}
                        value={valor}
                        style={{ height: "25px", display: "flex" }}
                      >
                        <Checkbox checked={estacional.indexOf(valor) > -1} />
                        <ListItemText
                          primary={
                            <Typography style={{ fontSize: "13px" }}>
                              {valor}
                            </Typography>
                          }
                        />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              {opcion && (
                <FormControl size="small" sx={{ width: 230 }}>
                  <InputLabel
                    sx={{ fontSize: "13px" }}
                    id="demo-multiple-checkbox-label"
                  >
                    Elija las opciones deseadas...
                  </InputLabel>
                  <Select
                    sx={{ fontSize: "13px" }}
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={horas}
                    onChange={handleChangeHoras}
                    input={
                      <OutlinedInput label="Elija las opciones deseadas..." />
                    }
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={MenuProps}
                    required
                  >
                    {valoresHoras.map((valor) => (
                      <MenuItem
                        key={valor}
                        value={valor}
                        style={{ height: "25px", display: "flex" }}
                      >
                        <Checkbox checked={horas.indexOf(valor) > -1} />
                        <ListItemText
                          primary={
                            <Typography style={{ fontSize: "13px" }}>
                              {valor}
                            </Typography>
                          }
                        />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </FormControlPersonal>
          </Linea>
        )}
        <Linea>
          <Label>Precio Hora Normal</Label>
          <Input
            style={{ textAlign: "right", paddingRight: "64px" }}
            type="number"
            min="0.001"
            step="any"
            value={precioHoraNormal}
            onChange={(e) => setPrecioHoraNormal(e.target.value)}
            required
          />
          <Simbolo>€/kWh</Simbolo>
        </Linea>
        <Linea>
          <Label>Precio Hora Especial</Label>
          <Input
            style={{ textAlign: "right", paddingRight: "64px" }}
            type="number"
            min="0"
            step="any"
            value={precioHoraEspecial}
            onChange={(e) => setPrecioHoraEspecial(e.target.value)}
            required
          />
          <Simbolo>€/kWh</Simbolo>
        </Linea>
        <Linea>
          <BotonCancelar
            type="button"
            onClick={() => {
              navigate("/tarifas");
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

export default ModificarTarifa;

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

const FormControlPersonal = styled(FormControl)`
  border: 1px solid #35465c !important;
  border-radius: 3px;
  padding: 0.2rem 0.6rem 0.6rem 0.6rem !important;
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
