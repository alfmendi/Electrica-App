import { createSlice } from "@reduxjs/toolkit";

const tarifasSlice = createSlice({
  name: "tarifas",
  initialState: { tarifas: [] },
  reducers: {
    conseguirTarifas: (state, action) => {
      state.tarifas = action.payload;
    },
    crearTarifa: (state, action) => {
      state.tarifas.push(action.payload);
    },
    modificarTarifa: (state, action) => {
      state.tarifas = state.tarifas.map((tarifa) =>
        tarifa.id !== action.payload.id ? tarifa : action.payload
      );
    },
    eliminarTarifa: (state, action) => {
      state.tarifas = state.tarifas.filter(
        (tarifa) => tarifa.id !== action.payload
      );
    },
  },
});

export const {
  conseguirTarifas,
  crearTarifa,
  modificarTarifa,
  eliminarTarifa,
} = tarifasSlice.actions;

export default tarifasSlice.reducer;
