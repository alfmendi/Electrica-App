import { Link } from "react-router-dom";

import styled from "styled-components";

// ------------------------------------
// - Defino la estructura de DataGrid -
// ------------------------------------
export const columns = [
  {
    field: "dni",
    headerName: "DNI",
    headerClassName: "header",
    headerAlign: "center",
    align: "center",
    width: 100,
    sortable: false,
  },
  {
    field: "nombre",
    headerName: "Nombre Cliente",
    headerClassName: "header",
    headerAlign: "center",
    width: 400,
    sortable: false,
  },
  {
    field: "cups",
    headerName: "CUPS",
    headerClassName: "header",
    headerAlign: "center",
    align: "center",
    width: 200,
    sortable: false,
  },
  {
    field: "tarifa",
    headerName: "Tarifa",
    headerClassName: "header",
    headerAlign: "center",
    align: "center",
    width: 200,
    sortable: false,
  },
  {
    field: "action",
    headerName: "Acción",
    headerClassName: "header",
    headerAlign: "center",
    align: "center",
    width: 200,
    sortable: false,
    renderCell: (params) => {
      return (
        <>
          {params.row.tiene ? (
            <Boton>
              <LinkPersonal to={"/consumos/consultar/" + params.row.id}>
                Consultar
              </LinkPersonal>
            </Boton>
          ) : (
            <BotonDeshabilitado>Consultar</BotonDeshabilitado>
          )}
        </>
      );
    },
  },
];

// ---------------------
// - Styled Components -
// ---------------------
const Boton = styled.button`
  font-family: poppins;
  border: none;
  background-color: #35465c;
  color: #fff;
  border-radius: 3px;
  padding: 4px 8px;
  text-align: center;
  margin: 0px 10px;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  box-shadow: 0 2px 2px 0 rgb(53 70 92 / 14%),
    0 3px 1px -2px rgb(53 70 92 / 20%), 0 1px 5px 0 rgb(53 70 92 / 12%);

  &:hover {
    background: var(--light-blue);
    box-shadow: 0 14px 26px -12px rgb(53 70 92 / 42%),
      0 4px 23px 0px rgb(0 0 0 / 12%), 0 8px 10px -5px rgb(53 70 92 / 20%);
  }

  @media screen and (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const BotonDeshabilitado = styled.button`
  font-family: poppins;
  border: none;
  background: var(--gris);
  color: #fff;
  border-radius: 3px;
  padding: 4px 8px;
  text-align: center;
  margin: 0px 10px;
  box-shadow: 0 2px 2px 0 rgb(53 70 92 / 14%),
    0 3px 1px -2px rgb(53 70 92 / 20%), 0 1px 5px 0 rgb(53 70 92 / 12%);

  @media screen and (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const LinkPersonal = styled(Link)`
  text-decoration: none;
  color: inherit;
`;
