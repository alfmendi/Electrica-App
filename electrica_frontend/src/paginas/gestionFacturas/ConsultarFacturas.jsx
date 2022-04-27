import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";

import styled from "styled-components";

import { ToastContainer } from "react-toastify";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";

import { format } from "date-fns";
import esLocale from "date-fns/locale/es";

import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

import useAxiosPrivado from "../../hooks/useAxiosPrivado";

import { setOpcionActiva } from "../../redux/empleadoSlice";

import generarMensajeError from "../../error/generarMensajeError";

// Necesario para poder utilizar algún componente de ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Necesario para poder utilizar el Pie Chart
ChartJS.register(ArcElement, Tooltip, Legend);

// -------------------------------------------------------------------
// -------------------------------------------------------------------
// - Componente que muestra la página para llevar a cabo la consulta -
// - de las facturas de los clientes                                 -
// -------------------------------------------------------------------
// -------------------------------------------------------------------
const ConsultarFacturas = () => {
  const axiosPrivado = useAxiosPrivado();
  const { opcionActiva, mensajeAMostrar } = useSelector(
    (state) => state.empleado
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { clienteId } = useParams();

  const [dni, setDni] = useState("");

  const [tarifa, setTarifa] = useState("");

  const [mostrarInfoCliente, setMostrarInfoCliente] = useState(false);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [panelActivo, setPanelActivo] = useState(0);

  // PROBANDO
  const [nombre, setNombre] = useState("");
  const [cups, setCups] = useState("");
  const [facturas, setFacturas] = useState([]);
  const [fecha, setFecha] = useState(null);
  const [minimo, setMinimo] = useState(Date);
  const [maximo, setMaximo] = useState(Date);
  const [fechaValida, setFechaValida] = useState(false);
  const [valoresFactura, setValoresFactura] = useState([]);
  const [datosPreparados, setDatosPreparados] = useState(false);
  const [grafico, setGrafico] = useState(1);

  // FIN PROBANDO

  // Estas variables se cargan con los valores a pasar al componente Bar
  let labels = [];
  let data;

  // Opciones para el componente Bar
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          title: function (tooltipItem) {
            return tooltipItem[0].label;
          },
          label: function (tooltipItem) {
            return tooltipItem.formattedValue + " €";
          },
        },
      },
      legend: {
        position: "top",
      },
    },
  };

  // Opciones para el componente Bar en formato móvil
  const optionsMovil = {
    plugins: {
      tooltip: {
        callbacks: {
          title: function (tooltipItem) {
            return tooltipItem[0].label;
          },
          label: function (tooltipItem) {
            return tooltipItem.formattedValue + " €";
          },
        },
      },
      legend: {
        position: "top",
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  // Opciones para el Pie Chart
  const optionsPie = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      tooltip: {
        callbacks: {
          title: function (tooltipItem) {
            return tooltipItem[0].label;
          },
          label: function (tooltipItem) {
            return tooltipItem.formattedValue + " €";
          },
        },
      },
      legend: {
        display: false,
      },
    },
  };

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

  // -------------------------------------------------------
  // - UseEffect para establecer la opción del menú activa -
  // -------------------------------------------------------
  useEffect(() => {
    if (!opcionActiva) {
      dispatch(setOpcionActiva(5));
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
        setCups(respuesta.data.cups);
        setTarifa(respuesta.data.tarifa.nombre);
      } catch (error) {
        generarMensajeError(error);
      }
    };
    conseguirCliente();
  }, []);

  //
  // ---------------------------------------------------
  // - UseEffect para obtener las facturas del cliente -
  // ---------------------------------------------------
  useEffect(() => {
    const cargarFacturas = async () => {
      try {
        const facturaConsultar = await axiosPrivado.get(
          `/api/facturas/${clienteId}`
        );
        const arrayFacturas = facturaConsultar.data;
        setFacturas(facturaConsultar.data);
        let minimoAño = arrayFacturas[0]?.consumo.año;
        let minimoMes = arrayFacturas[0]?.consumo.mes;
        let maximoAño = arrayFacturas[0]?.consumo.año;
        let maximoMes = arrayFacturas[0]?.consumo.mes;
        for (let indice = 1; indice < arrayFacturas.length; indice++) {
          if (arrayFacturas[indice].consumo.año < minimoAño) {
            minimoAño = arrayFacturas[indice].consumo.año;
            minimoMes = arrayFacturas[indice].consumo.mes;
          } else if (arrayFacturas[indice].consumo.año === minimoAño) {
            if (arrayFacturas[indice].consumo.mes < minimoMes) {
              minimoMes = arrayFacturas[indice].consumo.mes;
            }
          }
          if (arrayFacturas[indice].consumo.año > maximoAño) {
            maximoAño = arrayFacturas[indice].consumo.año;
            maximoMes = arrayFacturas[indice].consumo.mes;
          } else if (arrayFacturas[indice].consumo.año === maximoAño) {
            if (arrayFacturas[indice].consumo.mes > maximoMes) {
              maximoMes = arrayFacturas[indice].consumo.mes;
            }
          }
        }
        setMinimo(new Date(`${minimoAño}-${minimoMes}-01`));
        setMaximo(new Date(`${maximoAño}-${maximoMes}-15`));
        setFecha(new Date(`${maximoAño}-${maximoMes}-15`));
      } catch (error) {
        generarMensajeError(error);
      }
    };
    cargarFacturas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // -------------------------------------------------
  // - UseEffect para preparar los valores a mostrar -
  // -------------------------------------------------
  useEffect(() => {
    if (datosPreparados) {
      setFechaValida(true);
      if (grafico === 1) {
        const meses = [
          "Enero",
          "Febrero",
          "Marzo",
          "Abril",
          "Mayo",
          "Junio",
          "Julio",
          "Agosto",
          "Septiembre",
          "Octubre",
          "Noviembre",
          "Diciembre",
        ];
        let filtrarAño = facturas.filter(
          (elemento) => elemento.consumo.año === fecha.getFullYear()
        );
        let facturaConsultar = [];
        for (let indice = 0; indice < filtrarAño.length; indice++) {
          let importeTotal =
            filtrarAño[indice].importePotenciaContratada +
            filtrarAño[indice].importeEnergiaConsumida +
            filtrarAño[indice].importeImpuestoElectricidad +
            filtrarAño[indice].importeAlquilerEquipos +
            filtrarAño[indice].importeIva;
          facturaConsultar[indice] = {
            mes: meses[filtrarAño[indice].consumo.mes - 1],
            importeTotal: importeTotal.toFixed(2),
          };
        }
        setValoresFactura(facturaConsultar);
      }
      if (grafico === 2) {
        let filtrarMes = facturas.filter(
          (elemento) =>
            elemento.consumo.mes === fecha.getMonth() + 1 &&
            elemento.consumo.año === fecha.getFullYear()
        );

        setValoresFactura(filtrarMes);
      }
      setDatosPreparados(false);
    }
  }, [datosPreparados]);

  // -------------------------------------------------
  // - En función de la opción seleccionada, preparo -
  // - los valores para pasar al componente Bar      -
  // -------------------------------------------------
  if (grafico === 1) {
    labels = valoresFactura.map((elemento) => elemento.mes);
    data = {
      labels: labels,
      datasets: [
        {
          label: "Importe Total",
          data: valoresFactura.map((elemento) => elemento.importeTotal),
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ],
    };
  }

  if (grafico === 2) {
    data = {
      labels: [
        "Energía Consumida",
        "Potencia Contratada",
        "Impuesto Electricidad",
        "Alquiler Equipos",
        "IVA",
      ],
      datasets: [
        {
          data: [
            valoresFactura[0]?.importeEnergiaConsumida,
            valoresFactura[0]?.importePotenciaContratada,
            valoresFactura[0]?.importeImpuestoElectricidad,
            valoresFactura[0]?.importeAlquilerEquipos,
            valoresFactura[0]?.importeIva,
          ],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
  }

  // -------
  // - JSX -
  // -------
  return (
    <Contenedor>
      {mensajeAMostrar && <ToastContainer limit={1} />}
      <PanelBotones>
        <Boton onClick={() => setMostrarInfoCliente(!mostrarInfoCliente)}>
          {mostrarInfoCliente ? "Ocultar Info Cliente" : "Mostrar Info Cliente"}
        </Boton>
      </PanelBotones>
      {mostrarInfoCliente && (
        <PanelInfo>
          <Linea>
            <Label>DNI</Label>
            <LineaInfo>{dni}</LineaInfo>
          </Linea>
          <Linea>
            <Label>Nombre</Label>
            <LineaInfo>{nombre}</LineaInfo>
          </Linea>
          <Linea>
            <Label>CUPS</Label>
            <LineaInfo>{cups}</LineaInfo>
          </Linea>
          <Linea>
            <Label>Tarifa</Label>
            <LineaInfo>{tarifa}</LineaInfo>
          </Linea>
        </PanelInfo>
      )}
      {!fechaValida && (
        <PanelSeleccion>
          <Titulo>Consultar Facturas</Titulo>
          <Linea>
            <Boton
              type="button"
              onClick={() => {
                setPanelActivo(1);
              }}
            >
              Anuales
            </Boton>
            <Boton
              type="button"
              onClick={() => {
                setPanelActivo(2);
              }}
            >
              Mensuales
            </Boton>
          </Linea>
          {fecha !== null && (
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              locale={esLocale}
            >
              {panelActivo === 1 && (
                <DatePicker
                  views={["year"]}
                  label="Seleccione Año"
                  value={fecha}
                  minDate={minimo}
                  maxDate={maximo}
                  onChange={(newValue) => {
                    setFecha(newValue);
                  }}
                  onAccept={() => {
                    setGrafico(1);
                    setDatosPreparados(true);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} helperText={null} />
                  )}
                />
              )}
              {panelActivo === 2 && (
                <DatePicker
                  views={["year", "month"]}
                  label="Seleccione Año y Mes"
                  value={fecha}
                  minDate={minimo}
                  maxDate={maximo}
                  onChange={(newValue) => {
                    setFecha(newValue);
                  }}
                  onAccept={() => {
                    setGrafico(2);
                    setDatosPreparados(true);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} helperText={null} />
                  )}
                />
              )}
            </LocalizationProvider>
          )}
        </PanelSeleccion>
      )}
      {fechaValida && (
        <PanelGrafica>
          {grafico === 1 && (
            <LabelGrafica>Importe (€) año {fecha.getFullYear()}</LabelGrafica>
          )}
          {grafico === 2 && (
            <LabelGrafica>
              Importe (€){" "}
              {format(fecha, "MMMM yyyy", {
                locale: esLocale,
              })}
            </LabelGrafica>
          )}
          {grafico === 1 && (
            <div style={{ minHeight: "400px", height: "60vh" }}>
              {windowWidth <= 480 ? (
                <Bar options={optionsMovil} data={data} />
              ) : (
                <Bar options={options} data={data} />
              )}
            </div>
          )}
          {grafico === 2 && (
            <>
              <div
                style={{
                  maxWidth: "400px",
                  width: "100%",
                  margin: "0 auto",
                  display: "flex",
                }}
              >
                <Pie options={optionsPie} data={data} />
              </div>
              <PanelInfo>
                <Linea>
                  <Label>Energía Consumida</Label>
                  <LineaInfo>
                    {valoresFactura[0].importeEnergiaConsumida}
                    {" €"}
                  </LineaInfo>
                </Linea>
                <Linea>
                  <Label>Potencia Contratada</Label>
                  <LineaInfo>
                    {valoresFactura[0].importePotenciaContratada}
                    {" €"}
                  </LineaInfo>
                </Linea>
                <Linea>
                  <Label>Impuesto Electricidad</Label>
                  <LineaInfo>
                    {valoresFactura[0].importeImpuestoElectricidad}
                    {" €"}
                  </LineaInfo>
                </Linea>
                <Linea>
                  <Label>Alquiler Equipos</Label>
                  <LineaInfo>
                    {valoresFactura[0].importeAlquilerEquipos}
                    {" €"}
                  </LineaInfo>
                </Linea>
                <Linea>
                  <Label>IVA</Label>
                  <LineaInfo>
                    {valoresFactura[0].importeIva}
                    {" €"}
                  </LineaInfo>
                </Linea>
                <Linea>
                  <Label>Importe Total</Label>
                  <LineaInfo>
                    {(
                      valoresFactura[0].importeEnergiaConsumida +
                      valoresFactura[0].importePotenciaContratada +
                      valoresFactura[0].importeImpuestoElectricidad +
                      valoresFactura[0].importeAlquilerEquipos +
                      valoresFactura[0].importeIva
                    ).toFixed(2)}
                    {" €"}
                  </LineaInfo>
                </Linea>
              </PanelInfo>
            </>
          )}
          <Linea>
            <Boton
              type="button"
              onClick={() => {
                navigate("/facturas");
              }}
            >
              Aceptar
            </Boton>
          </Linea>
        </PanelGrafica>
      )}
    </Contenedor>
  );
};

export default ConsultarFacturas;

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

const PanelInfo = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto;
  margin-top: 1rem;
  border: 1px solid var(--light-blue);
  border-radius: 3px;
  padding: 1rem 0.5rem 0.5rem 0.5rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  box-shadow: 0 14px 26px -12px rgb(59 89 152 / 42%),
    0 4px 23px 0px rgb(0 0 0 / 12%), 0 8px 10px -5px rgb(59 89 152 / 20%);

  /* Media Query para dispositivos móviles */
  @media (max-width: 480px) {
    flex-wrap: nowrap;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const PanelSeleccion = styled.div`
  position: relative;
  max-width: 600px;
  margin: 0 auto;
  margin-top: 2rem;
  border: 1px solid var(--light-blue);
  border-radius: 3px;
  padding: 2rem 1rem 1rem 1rem;
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

  /* Media Query para dispositivos móviles */
  @media (max-width: 480px) {
    width: 100%;
  }
`;

const Label = styled.label`
  position: absolute;
  white-space: nowrap;
  top: -12px;
  left: 0px;
  background: var(--light-blue);
  color: #fff;
  font-weight: 500;
  padding: 0px 6px;
  border-radius: 3px;
  font-size: 10px;
  box-shadow: 2px 8px 6px rgba(0, 0, 0, 0.2),
    0px -5px 35px rgba(255, 255, 255, 0.3);
`;

const LineaInfo = styled.div`
  font-size: 1rem;
  min-width: 120px;

  @media (max-width: 768px) {
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

const PanelGrafica = styled.div`
  width: 100%;
  min-height: 400px;
  position: relative;
  margin-top: 1rem;
  border: 1px solid var(--light-blue);
  border-radius: 3px;
  padding: 1rem 1rem 1rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: 0 14px 26px -12px rgb(59 89 152 / 42%),
    0 4px 23px 0px rgb(0 0 0 / 12%), 0 8px 10px -5px rgb(59 89 152 / 20%);
`;

const LabelGrafica = styled.label`
  width: fit-content;
  padding: 4px 6px;
  z-index: 10;
  border-radius: 3px;
  color: #fff;
  font-weight: normal;
  font-size: 13px;
  background: linear-gradient(-45deg, #2979ff 0%, #1976d2 100%);
  -webkit-box-shadow: 0px 10px 13px -7px #037bff,
    5px 5px 15px 5px rgba(3, 123, 255, 0);
  box-shadow: 0px 10px 13px -7px #037bff, 5px 5px 15px 5px rgba(3, 123, 255, 0);
`;
