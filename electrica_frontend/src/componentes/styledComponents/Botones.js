import styled from "styled-components";

export const BotonAzul = styled.button`
  outline: none;
  border: none;
  cursor: ${(props) => (props.deshabilitado ? "default" : "pointer")};
  padding: 6px 20px;
  border-radius: 6px;
  font-size: 12px;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  letter-spacing: 1.1px;
  transition: 0.3s ease-in-out;
  color: ${(props) => (props.deshabilitado ? "#ddd" : "#fff")};
  background: linear-gradient(195deg, rgb(73, 163, 241), rgb(26, 115, 232));
  box-shadow: rgb(26 115 232 / 15%) 0rem 0.1875rem 0.1875rem 0rem,
    rgb(26 115 232 / 20%) 0rem 0.1875rem 0.0625rem -0.125rem,
    rgb(26 115 232 / 15%) 0rem 0.0625rem 0.3125rem 0rem;
  ${(props) =>
    props.desahabilitado
      ? "&:hover {box-shadow: rgb(26 115 232 / 40%) 0rem 0.875rem 1.625rem -0.75rem, rgb(26 115 232 / 15%) 0rem 0.25rem 1.4375rem 0rem, rgb(26 115 232 / 20%) 0rem 0.5rem 0.625rem -0.3125rem;}"
      : ""}
`;

export const BotonVerde = styled.button`
  outline: none;
  border: none;
  cursor: pointer;
  padding: 6px 20px;
  border-radius: 6px;
  font-size: 12px;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  letter-spacing: 1.1px;
  transition: 0.3s ease-in-out;
  color: rgb(255, 255, 255);
  background: linear-gradient(195deg, rgb(102, 187, 106), rgb(67, 160, 71));
  box-shadow: rgb(76 175 80 / 15%) 0rem 0.1875rem 0.1875rem 0rem,
    rgb(76 175 80 / 20%) 0rem 0.1875rem 0.0625rem -0.125rem,
    rgb(76 175 80 / 15%) 0rem 0.0625rem 0.3125rem 0rem;

  &:hover {
    box-shadow: rgb(76 175 80 / 40%) 0rem 0.875rem 1.625rem -0.75rem,
      rgb(76 175 80 / 15%) 0rem 0.25rem 1.4375rem 0rem,
      rgb(76 175 80 / 20%) 0rem 0.5rem 0.625rem -0.3125rem;
  }
`;

export const BotonVerdeContinuo = styled.button`
  outline: none;
  border: none;
  cursor: pointer;
  padding: 6px 20px;
  border-radius: 6px;
  font-size: 12px;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  letter-spacing: 1.1px;
  transition: 0.3s ease-in-out;
  color: rgb(255, 255, 255);
  background-color: #4caf50;
  box-shadow: 0 2px 2px 0 rgb(76 175 80 / 14%),
    0 3px 1px -2px rgb(76 175 80 / 20%), 0 1px 5px 0 rgb(76 175 80 / 12%);

  &:hover {
    box-shadow: 0 14px 26px -12px rgb(76 175 80 / 42%),
      0 4px 23px 0px rgb(0 0 0 / 12%), 0 8px 10px -5px rgb(76 175 80 / 20%);
  }
`;

export const BotonAmarillo = styled.button`
  outline: none;
  border: none;
  cursor: pointer;
  padding: 6px 20px;
  border-radius: 6px;
  font-size: 12px;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  letter-spacing: 1.1px;
  transition: 0.3s ease-in-out;
  color: rgb(255, 255, 255);
  background: linear-gradient(195deg, rgb(255, 167, 38), rgb(251, 140, 0));
  box-shadow: rgb(251 140 0 / 15%) 0rem 0.1875rem 0.1875rem 0rem,
    rgb(251 140 0 / 20%) 0rem 0.1875rem 0.0625rem -0.125rem,
    rgb(251 140 0 / 15%) 0rem 0.0625rem 0.3125rem 0rem;

  &:hover {
    box-shadow: rgb(251 140 0 / 40%) 0rem 0.875rem 1.625rem -0.75rem,
      rgb(251 140 0 / 15%) 0rem 0.25rem 1.4375rem 0rem,
      rgb(251 140 0 / 20%) 0rem 0.5rem 0.625rem -0.3125rem;
  }
`;

export const BotonNegro = styled.button`
  outline: none;
  border: none;
  cursor: pointer;
  padding: 6px 20px;
  border-radius: 6px;
  font-size: 12px;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  letter-spacing: 1.1px;
  transition: 0.3s ease-in-out;
  /* color: rgb(255, 255, 255); */
  /* background: linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25)); */
  /* border: 5px solid linear(195deg, rgb(66, 66, 74), rgb(25, 25, 25)); */
  border: 1px solid #333;
  box-shadow: rgb(52 71 103 / 15%) 0rem 0.1875rem 0.1875rem 0rem,
    rgb(52 71 103 / 20%) 0rem 0.1875rem 0.0625rem -0.125rem,
    rgb(52 71 103 / 15%) 0rem 0.0625rem 0.3125rem 0rem;

  &:hover {
    box-shadow: rgb(52 71 103 / 40%) 0rem 0.875rem 1.625rem -0.75rem,
      rgb(52 71 103 / 15%) 0rem 0.25rem 1.4375rem 0rem,
      rgb(52 71 103 / 20%) 0rem 0.5rem 0.625rem -0.3125rem;
  }
`;

export const BotonAzulTwitter = styled.button`
  outline: none;
  border: none;
  cursor: ${(props) => (props.deshabilitado ? "default" : "pointer")};
  padding: 6px 20px;
  border-radius: 6px;
  font-size: 12px;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  letter-spacing: 1.1px;
  transition: 0.3s ease-in-out;
  color: ${(props) => (props.deshabilitado ? "#ddd" : "#fff")};
  background-color: #55acee;
  box-shadow: 0 2px 2px 0 rgb(85 172 238 / 14%),
    0 3px 1px -2px rgb(85 172 238 / 20%), 0 1px 5px 0 rgb(85 172 238 / 12%);

  &:hover {
    box-shadow: 0 14px 26px -12px rgb(85 172 238 / 42%),
      0 4px 23px 0px rgb(0 0 0 / 12%), 0 8px 10px -5px rgb(85 172 238 / 20%);
  }
`;

export const BotonAzulFacebook = styled.button`
  outline: none;
  border: none;
  cursor: ${(props) => (props.deshabilitado ? "default" : "pointer")};
  padding: 6px 20px;
  border-radius: 6px;
  font-size: 12px;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  letter-spacing: 1.1px;
  transition: 0.3s ease-in-out;
  color: ${(props) => (props.deshabilitado ? "#ddd" : "#fff")};
  background-color: #3b5998;
  box-shadow: 0 2px 2px 0 rgb(59 89 152 / 14%),
    0 3px 1px -2px rgb(59 89 152 / 20%), 0 1px 5px 0 rgb(59 89 152 / 12%);

  &:hover {
    box-shadow: 0 14px 26px -12px rgb(59 89 152 / 42%),
      0 4px 23px 0px rgb(0 0 0 / 12%), 0 8px 10px -5px rgb(59 89 152 / 20%);
  }
`;

export const BotonRojoGoogle = styled.button`
  outline: none;
  border: none;
  cursor: ${(props) => (props.deshabilitado ? "default" : "pointer")};
  padding: 6px 20px;
  border-radius: 6px;
  font-size: 12px;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  letter-spacing: 1.1px;
  transition: 0.3s ease-in-out;
  color: ${(props) => (props.deshabilitado ? "#ddd" : "#fff")};
  background-color: #dd4b39;
  box-shadow: 0 2px 2px 0 rgb(221 75 57 / 14%),
    0 3px 1px -2px rgb(221 75 57 / 20%), 0 1px 5px 0 rgb(221 75 57 / 12%);

  &:hover {
    box-shadow: 0 14px 26px -12px rgb(221 75 57 / 42%),
      0 4px 23px 0px rgb(0 0 0 / 12%), 0 8px 10px -5px rgb(221 75 57 / 20%);
  }
`;

export const BotonAzulLinkedin = styled.button`
  outline: none;
  border: none;
  cursor: ${(props) => (props.deshabilitado ? "default" : "pointer")};
  padding: 6px 20px;
  border-radius: 6px;
  font-size: 12px;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  letter-spacing: 1.1px;
  transition: 0.3s ease-in-out;
  color: ${(props) => (props.deshabilitado ? "#ddd" : "#fff")};
  background-color: #0976b4;
  box-shadow: 0 2px 2px 0 rgb(9 118 180 / 14%),
    0 3px 1px -2px rgb(9 118 180 / 20%), 0 1px 5px 0 rgb(9 118 180 / 12%);

  &:hover {
    box-shadow: 0 14px 26px -12px rgb(9 118 180 / 42%),
      0 4px 23px 0px rgb(0 0 0 / 12%), 0 8px 10px -5px rgb(9 118 180 / 20%);
  }
`;

export const BotonRojoPintarest = styled.button`
  outline: none;
  border: none;
  cursor: ${(props) => (props.deshabilitado ? "default" : "pointer")};
  padding: 6px 20px;
  border-radius: 6px;
  font-size: 12px;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  letter-spacing: 1.1px;
  transition: 0.3s ease-in-out;
  color: ${(props) => (props.deshabilitado ? "#ddd" : "#fff")};
  background-color: #cc2127;
  box-shadow: 0 2px 2px 0 rgb(204 33 39 / 14%),
    0 3px 1px -2px rgb(204 33 39 / 20%), 0 1px 5px 0 rgb(204 33 39 / 12%);

  &:hover {
    box-shadow: 0 14px 26px -12px rgb(204 33 39 / 42%),
      0 4px 23px 0px rgb(0 0 0 / 12%), 0 8px 10px -5px rgb(204 33 39 / 20%);
  }
`;

export const BotonRojoYoutube = styled.button`
  outline: none;
  border: none;
  cursor: ${(props) => (props.deshabilitado ? "default" : "pointer")};
  padding: 6px 20px;
  border-radius: 6px;
  font-size: 12px;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  letter-spacing: 1.1px;
  transition: 0.3s ease-in-out;
  color: ${(props) => (props.deshabilitado ? "#ddd" : "#fff")};
  background-color: #e52d27;
  box-shadow: 0 2px 2px 0 rgb(229 45 39 / 14%),
    0 3px 1px -2px rgb(229 45 39 / 20%), 0 1px 5px 0 rgb(229 45 39 / 12%);

  &:hover {
    box-shadow: 0 14px 26px -12px rgb(229 45 39 / 42%),
      0 4px 23px 0px rgb(0 0 0 / 12%), 0 8px 10px -5px rgb(229 45 39 / 20%);
  }
`;

export const BotonNegroRepost = styled.button`
  outline: none;
  border: none;
  cursor: ${(props) => (props.deshabilitado ? "default" : "pointer")};
  padding: 6px 20px;
  border-radius: 6px;
  font-size: 12px;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  letter-spacing: 1.1px;
  transition: 0.3s ease-in-out;
  color: ${(props) => (props.deshabilitado ? "#ddd" : "#fff")};
  background-color: #35465c;
  box-shadow: 0 2px 2px 0 rgb(53 70 92 / 14%),
    0 3px 1px -2px rgb(53 70 92 / 20%), 0 1px 5px 0 rgb(53 70 92 / 12%);

  &:hover {
    box-shadow: 0 14px 26px -12px rgb(53 70 92 / 42%),
      0 4px 23px 0px rgb(0 0 0 / 12%), 0 8px 10px -5px rgb(53 70 92 / 20%);
  }
`;

export const BotonNegroGithub = styled.button`
  outline: none;
  border: none;
  cursor: ${(props) => (props.deshabilitado ? "default" : "pointer")};
  padding: 6px 20px;
  border-radius: 6px;
  font-size: 12px;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  letter-spacing: 1.1px;
  transition: 0.3s ease-in-out;
  color: ${(props) => (props.deshabilitado ? "#ddd" : "#fff")};
  background-color: #333;
  box-shadow: 0 2px 2px 0 rgb(85 85 85 / 14%),
    0 3px 1px -2px rgb(85 85 85 / 20%), 0 1px 5px 0 rgb(85 85 85 / 12%);

  &:hover {
    box-shadow: 0 14px 26px -12px rgb(85 85 85 / 42%),
      0 4px 23px 0px rgb(0 0 0 / 12%), 0 8px 10px -5px rgb(85 85 85 / 20%);
  }
`;

export const BotonAzulBe = styled.button`
  outline: none;
  border: none;
  cursor: ${(props) => (props.deshabilitado ? "default" : "pointer")};
  padding: 6px 20px;
  border-radius: 6px;
  font-size: 12px;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  letter-spacing: 1.1px;
  transition: 0.3s ease-in-out;
  color: ${(props) => (props.deshabilitado ? "#ddd" : "#fff")};
  background-color: #1769ff;
  box-shadow: 0 2px 2px 0 rgb(23 105 255 / 14%),
    0 3px 1px -2px rgb(23 105 255 / 20%), 0 1px 5px 0 rgb(23 105 255 / 12%);

  &:hover {
    box-shadow: 0 14px 26px -12px rgb(23 105 255 / 42%),
      0 4px 23px 0px rgb(0 0 0 / 12%), 0 8px 10px -5px rgb(23 105 255 / 20%);
  }
`;

export const BotonRosaDribble = styled.button`
  outline: none;
  border: none;
  cursor: ${(props) => (props.deshabilitado ? "default" : "pointer")};
  padding: 6px 20px;
  border-radius: 6px;
  font-size: 12px;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  letter-spacing: 1.1px;
  transition: 0.3s ease-in-out;
  color: ${(props) => (props.deshabilitado ? "#ddd" : "#fff")};
  background-color: #ea4c89;
  box-shadow: 0 2px 2px 0 rgb(234 76 137 / 14%),
    0 3px 1px -2px rgb(234 76 137 / 20%), 0 1px 5px 0 rgb(234 76 137 / 12%);

  &:hover {
    box-shadow: 0 14px 26px -12px rgb(234 76 137 / 42%),
      0 4px 23px 0px rgb(0 0 0 / 12%), 0 8px 10px -5px rgb(234 76 137 / 20%);
  }
`;

export const BotonRojoRepost = styled.button`
  outline: none;
  border: none;
  cursor: ${(props) => (props.deshabilitado ? "default" : "pointer")};
  padding: 6px 20px;
  border-radius: 6px;
  font-size: 12px;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  letter-spacing: 1.1px;
  transition: 0.3s ease-in-out;
  color: ${(props) => (props.deshabilitado ? "#ddd" : "#fff")};
  background-color: #ff4500;
  box-shadow: 0 2px 2px 0 rgb(255 69 0 / 14%),
    0 3px 1px -2px rgb(255 69 0 / 20%), 0 1px 5px 0 rgb(255 69 0 / 12%);

  &:hover {
    box-shadow: 0 14px 26px -12px rgb(255 69 0 / 42%),
      0 4px 23px 0px rgb(0 0 0 / 12%), 0 8px 10px -5px rgb(255 69 0 / 20%);
  }
`;
