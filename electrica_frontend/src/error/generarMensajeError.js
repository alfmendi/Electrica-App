import errorToast from "./errorToast";

// -------------------------------------------------------------
// - Método que gestiona los errores devueltos por el servidor -
// -------------------------------------------------------------
const generarMensajeError = (error, posicion = "top-center") => {
  let mensajeError = "";
  if (error.message.includes("Los passwords introducidos no coinciden")) {
    mensajeError = error.message;
  } else if (!error?.response) {
    mensajeError = "No hay respuesta del servidor";
  } else {
    mensajeError = error.response.data.mensaje;
    if (Array.isArray(mensajeError)) {
      mensajeError = mensajeError.join("\n");
    }
  }
  return errorToast(mensajeError, posicion);
};

export default generarMensajeError;
