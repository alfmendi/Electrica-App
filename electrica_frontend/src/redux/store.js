import { configureStore } from "@reduxjs/toolkit";

import empleadoReducer from "./empleadoSlice";
import empleadosReducer from "./empleadosSlice";
import clientesReducer from "./clientesSlice";
import tarifasReducer from "./tarifasSlice";

const store = configureStore({
  reducer: {
    empleado: empleadoReducer,
    empleados: empleadosReducer,
    clientes: clientesReducer,
    tarifas: tarifasReducer,
  },
});

export default store;
