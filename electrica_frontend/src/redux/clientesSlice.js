import { createSlice } from "@reduxjs/toolkit";

const clientesSlice = createSlice({
  name: "clientes",
  initialState: { clientes: [] },
  reducers: {
    conseguirClientes: (state, action) => {
      state.clientes = action.payload;
    },
    crearCliente: (state, action) => {
      state.clientes.push(action.payload);
    },
    modificarCliente: (state, action) => {
      state.clientes = state.clientes.map((cliente) =>
        cliente.id !== action.payload.id ? cliente : action.payload
      );
    },
    eliminarCliente: (state, action) => {
      state.clientes = state.clientes.filter(
        (cliente) => cliente.id !== action.payload
      );
    },
  },
});

export const {
  conseguirClientes,
  crearCliente,
  modificarCliente,
  eliminarCliente,
} = clientesSlice.actions;
export default clientesSlice.reducer;
