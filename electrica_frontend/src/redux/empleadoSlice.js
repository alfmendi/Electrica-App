import { createSlice } from "@reduxjs/toolkit";

// // Creación del thunk
// export const conseguirEmpleado = createAsyncThunk(
//   "empleado/conseguirEmpleado",
//   async (credenciales, { rejectWithValue }) => {
//     // const empleado = await axios.post("/api/auth/login", credenciales);
//     // console.log("El valor de empleado en conseguirEmpleado es...", empleado);
//     // return empleado.data;
//     try {
//       const empleado = await axios.post("/api/auth/login", credenciales);
//       return empleado.data;
//     } catch (error) {
//       // Use `error.response.data` as `action.payload` for a `rejected` action,
//       // by explicitly returning it using the `rejectWithValue()` utility
//       // Dentro de error.response.data hay un objeto {mensaje:"descripción del error"}
//       return rejectWithValue(error.response.data.mensaje);
//     }
//   }
// );

const empleadoSlice = createSlice({
  name: "empleado",
  // initialState: { empleado: null, loading: false, error: null },
  initialState: {
    empleado: null,
    ocultarSidebar: false,
    opcionActiva: null,
    mensajeAMostrar: null,
  },
  reducers: {
    setEmpleado: (state, action) => {
      state.empleado = action.payload;
    },
    setOcultarSidebar: (state, action) => {
      state.ocultarSidebar = action.payload;
    },
    setOpcionActiva: (state, action) => {
      state.opcionActiva = action.payload;
    },

    setMensajeAMostrar: (state, action) => {
      state.mensajeAMostrar = action.payload;
    },
  },
  // extraReducers: (builder) => {
  //   // Add reducers for additional action types here, and handle loading state as needed
  //   builder.addCase(conseguirEmpleado.pending, (state) => {
  //     state.loading = true;
  //     state.error = null;
  //   });
  //   builder.addCase(conseguirEmpleado.fulfilled, (state, action) => {
  //     // Añade el empleado al estado
  //     state.empleado = action.payload;
  //     state.loading = false;
  //   });
  //   builder.addCase(conseguirEmpleado.rejected, (state, action) => {
  //     // console.log("El valor de action.payload es...", action.payload);
  //     // console.log(
  //     //   "El valor de action.error.message es...",
  //     //   action.error.message
  //     // );
  //     // console.log("El valor de action.error es...", action.error);
  //     state.empleado = null;
  //     state.error = action.payload;
  //     //state.error = action.error.message;
  //     state.loading = false;
  //   });
  // },
});

export const {
  setEmpleado,
  setOcultarSidebar,
  setOpcionActiva,
  setMensajeAMostrar,
} = empleadoSlice.actions;
export default empleadoSlice.reducer;
