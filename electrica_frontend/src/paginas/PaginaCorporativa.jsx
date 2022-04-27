import styled, { keyframes } from "styled-components";

import fondo01 from "../assets/fondo01.jpg";

// ------------------------------------------------
// ------------------------------------------------
// - Componente para mostrar una página de inicio -
// ------------------------------------------------
// ------------------------------------------------
const PaginaCorporativa = () => {
  // -------
  // - JSX -
  // -------
  return (
    <Contenido img={fondo01}>
      <TextoDesvanecer>
        <span>R</span>
        <span>E</span>
        <span>D</span>
        <span>E</span>
        <span>G</span>
        <span>A</span>
        <span>L</span>
      </TextoDesvanecer>
      <div
        style={{
          border: "1px solid var(--light-blue)",
          borderRadius: "3px",
          padding: "1rem",
        }}
      >
        <p>Cliente para probar la aplicación</p>
        <h4>Luis Perez</h4>
      </div>
    </Contenido>
  );
};

export default PaginaCorporativa;

// ---------------------
// - Styled Components -
// ---------------------
const desaparecer = keyframes`
  30%{
    transform:skew(0deg) translateY(-200%);
    text-shadow:0px 0px 50px;
    opacity:0;
  }
`;

const Contenido = styled.div`
  position: relative;
  height: calc(100% - 60px);
  background: linear-gradient(
      to left,
      rgba(255, 255, 255, 0.95),
      rgba(255, 255, 255, 0.85)
    ),
    url(${(props) => props.img});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  // Añadido para incluir el texto con el usuario
  flex-direction: column;
`;

const TextoDesvanecer = styled.div`
  font-weight: 900;
  font-size: 12vw;

  span {
    display: inline-block;
    color: transparent;

    text-shadow: 0px 0px 0px var(--light-blue);
    animation-duration: 10s;
    animation-iteration-count: infinite;
  }

  span:nth-child(1) {
    animation-name: ${desaparecer};
  }

  span:nth-child(2) {
    animation-name: ${desaparecer};
    animation-delay: 1s;
  }

  span:nth-child(3) {
    animation-name: ${desaparecer};
    animation-delay: 2s;
  }

  span:nth-child(4) {
    animation-name: ${desaparecer};
    animation-delay: 3s;
  }

  span:nth-child(5) {
    animation-name: ${desaparecer};
    animation-delay: 4s;
  }

  span:nth-child(6) {
    animation-name: ${desaparecer};
    animation-delay: 5s;
  }

  span:nth-child(7) {
    animation-name: ${desaparecer};
    animation-delay: 6s;
  }
`;
