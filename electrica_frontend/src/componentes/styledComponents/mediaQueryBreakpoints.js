// /* Media Query para dispositivos móviles */
// @media (max-width: 480px) {}
// /* Media Query para baja resolución:  Tablets, Ipads */
// @media (min-width: 481px) and (max-width: 768px) {}
// /* Media Query para Tablets, Ipads en modo horizontal */
// @media (min-width: 769px) and (max-width: 1024px) {}
// /* Media Query para Laptops y Sobremesa */
// @media (min-width: 1025px) and (max-width: 1280px) {}
// /* Media Query para pantallas Grandes */
// @media (min-width: 1281px) {}

const dimensiones = {
  movil: "480px",
  tablet: "768px",
  laptop: "1024px",
  sobremesa: "1280px",
  pantallaGrande: "1281px",
};

const dispositivos = {
  movil: `(max-width: ${dimensiones.movil})`,
  tablet: `(max-width: ${dimensiones.tablet})`,
  laptop: `(max-width: ${dimensiones.laptop})`,
  sobremesa: `(max-width: ${dimensiones.sobremesa})`,
  pantallaGrande: `(min-width: ${dimensiones.pantallaGrande})`,
};

export default dispositivos;
