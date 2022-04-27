import { createSlice } from "@reduxjs/toolkit";

const empleadosSlice = createSlice({
  name: "empleados",
  initialState: { empleados: [] },
  reducers: {
    conseguirEmpleados: (state, action) => {
      state.empleados = action.payload;
    },
    crearEmpleado: (state, action) => {
      state.empleados.push(action.payload);
    },
    modificarEmpleado: (state, action) => {
      state.empleados = state.empleados.map((empleado) =>
        empleado.id !== action.payload.id ? empleado : action.payload
      );
    },
    eliminarEmpleado: (state, action) => {
      state.empleados = state.empleados.filter(
        (empleado) => empleado.id !== action.payload
      );
    },
  },
});

export const {
  conseguirEmpleados,
  crearEmpleado,
  modificarEmpleado,
  eliminarEmpleado,
} = empleadosSlice.actions;
export default empleadosSlice.reducer;
