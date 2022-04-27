import { toast } from "react-toastify";
import { Slide, Zoom, Flip, Bounce } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

// --------------------------------------------------------
// - Método que devuelve un toast con un mensaje de error -
// --------------------------------------------------------
const errorToast = (mensajeError, posicion) => {
  toast.clearWaitingQueue();
  return toast.error(mensajeError, {
    position: posicion,
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    transition: Zoom,
    theme: "colored",
    // className: "contenedor__toastify",
    bodyClassName: "texto__toastify",
  });
};

export default errorToast;
