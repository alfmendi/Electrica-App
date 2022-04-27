import { toast } from "react-toastify";
import { Slide, Zoom, Flip, Bounce } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

// --------------------------------------------------------
// - Método que devuelve un toast con un mensaje de éxito -
// --------------------------------------------------------
const exitoToast = (mensajeExito, posicion = "top-center") => {
  toast.clearWaitingQueue();
  return toast.success(mensajeExito, {
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

export default exitoToast;
