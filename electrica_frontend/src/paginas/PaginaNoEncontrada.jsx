import { useNavigate } from "react-router-dom";

import styled from "styled-components";

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// - Componente que se muestra en caso de que la página no exista -
// ----------------------------------------------------------------
// ----------------------------------------------------------------
const PaginaNoEncontrada = () => {
  const navigate = useNavigate();

  // -------
  // - JSX -
  // -------
  return (
    <Contenedor>
      <h2>Página no encontrada</h2>
      <Boton onClick={() => navigate("/")}>Volver</Boton>
    </Contenedor>
  );
};

export default PaginaNoEncontrada;

// ---------------------
// - Styled Components -
// ---------------------
const Contenedor = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;

const Boton = styled.button`
  font-family: poppins;
  border: none;
  background-color: var(--light-blue);
  color: #fff;
  border-radius: 3px;
  padding: 4px 8px;
  text-align: center;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  box-shadow: 0 2px 2px 0 rgb(53 70 92 / 14%),
    0 3px 1px -2px rgb(53 70 92 / 20%), 0 1px 5px 0 rgb(53 70 92 / 12%);

  &:hover {
    background: var(--dark-blue);
    box-shadow: 0 14px 26px -12px rgb(53 70 92 / 42%),
      0 4px 23px 0px rgb(0 0 0 / 12%), 0 8px 10px -5px rgb(53 70 92 / 20%);
  }
`;
