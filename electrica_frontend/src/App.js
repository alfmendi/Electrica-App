import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPersistente from "./componentes/LoginPersistente";
import ContenidoProtegido from "./componentes/ContenidoProtegido";

import Login from "./paginas/Login";
import PaginaPrincipal from "./paginas/PaginaPrincipal";
import PaginaNoEncontrada from "./paginas/PaginaNoEncontrada";
import PaginaCorporativa from "./paginas/PaginaCorporativa";

import GestionEmpleados from "./paginas/gestionEmpleados/GestionEmpleados";
import CrearEmpleado from "./paginas/gestionEmpleados/CrearEmpleado";
import ModificarEmpleado from "./paginas/gestionEmpleados/ModificarEmpleado";
import EliminarEmpleado from "./paginas/gestionEmpleados/EliminarEmpleado";
import ModificarPassword from "./paginas/gestionEmpleados/ModificarPassword";

import GestionClientes from "./paginas/gestionClientes/GestionClientes";
import CrearCliente from "./paginas/gestionClientes/CrearCliente";
import ConsultarCliente from "./paginas/gestionClientes/ConsultarCliente";
import ModificarCliente from "./paginas/gestionClientes/ModificarCliente";
import EliminarCliente from "./paginas/gestionClientes/EliminarCliente";

import GestionTarifas from "./paginas/gestionTarifas/GestionTarifas";
import CrearTarifa from "./paginas/gestionTarifas/CrearTarifa";
import ConsultarTarifa from "./paginas/gestionTarifas/ConsultarTarifa";
import ModificarTarifa from "./paginas/gestionTarifas/ModificarTarifa";
import EliminarTarifa from "./paginas/gestionTarifas/EliminarTarifa";

import GestionConsumos from "./paginas/gestionConsumos/GestionConsumos";
import ConsultarConsumos from "./paginas/gestionConsumos/ConsultarConsumos";

import GestionFacturas from "./paginas/gestionFacturas/GestionFacturas";
import ConsultarFacturas from "./paginas/gestionFacturas/ConsultarFacturas";

import CargarConsumos from "./paginas/cargarConsumos/CargarConsumos";

import GestionConceptosFactura from "./paginas/gestionConceptosFactura/GestionConceptosFactura";
import CrearConceptosFactura from "./paginas/gestionConceptosFactura/CrearConceptosFactura";
import ModificarConceptosFactura from "./paginas/gestionConceptosFactura/ModificarConceptosFactura";

// -----------------------------------------
// -----------------------------------------
// - Componente principal de la aplicación -
// -----------------------------------------
// -----------------------------------------
function App() {
  // -------
  // - JSX -
  // -------
  return (
    <Router>
      <Routes>
        <Route path="/">
          {/* Rutas públicas */}
          <Route path="login" element={<Login />} />
          {/* Rutas protegidas */}
          <Route element={<LoginPersistente />}>
            <Route element={<ContenidoProtegido />}>
              <Route path="" element={<PaginaPrincipal />}>
                <Route path="" element={<PaginaCorporativa />} />
                <Route path="empleados" element={<GestionEmpleados />} />
                <Route path="empleados/crear" element={<CrearEmpleado />} />
                <Route
                  path="empleados/modificar/:empleadoId"
                  element={<ModificarEmpleado />}
                />
                <Route
                  path="empleados/eliminar/:empleadoId"
                  element={<EliminarEmpleado />}
                />
                <Route
                  path="empleados/modificarPassword/:empleadoId"
                  element={<ModificarPassword />}
                />

                <Route path="clientes" element={<GestionClientes />} />
                <Route path="clientes/crear" element={<CrearCliente />} />
                <Route
                  path="clientes/consultar/:clienteId"
                  element={<ConsultarCliente />}
                />
                <Route
                  path="clientes/modificar/:clienteId"
                  element={<ModificarCliente />}
                />
                <Route
                  path="clientes/eliminar/:clienteId"
                  element={<EliminarCliente />}
                />
                <Route path="tarifas" element={<GestionTarifas />} />
                <Route path="tarifas/crear" element={<CrearTarifa />} />
                <Route
                  path="tarifas/consultar/:tarifaId"
                  element={<ConsultarTarifa />}
                />
                <Route
                  path="tarifas/modificar/:tarifaId"
                  element={<ModificarTarifa />}
                />
                <Route
                  path="tarifas/eliminar/:tarifaId"
                  element={<EliminarTarifa />}
                />
                <Route path="consumos" element={<GestionConsumos />} />
                <Route
                  path="consumos/consultar/:clienteId"
                  element={<ConsultarConsumos />}
                />
                <Route path="facturas" element={<GestionFacturas />} />
                <Route
                  path="facturas/consultar/:clienteId"
                  element={<ConsultarFacturas />}
                />
                <Route path="cargarConsumos" element={<CargarConsumos />} />
                <Route
                  path="conceptosFactura"
                  element={<GestionConceptosFactura />}
                />
                <Route
                  path="conceptosFactura/crear"
                  element={<CrearConceptosFactura />}
                />
                <Route
                  path="conceptosFactura/modificar"
                  element={<ModificarConceptosFactura />}
                />
              </Route>
            </Route>
          </Route>
          {/* Ruta no válida */}
          <Route path="*" element={<PaginaNoEncontrada />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
