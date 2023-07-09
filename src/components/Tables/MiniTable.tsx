import * as React from "react";
import { Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Task, Coord } from "../../utils/types";
import { formaterDate } from "../../utils/fnGenerics";

function createData(
  clientId: number,
  dateLimit: Date,
  destination: Coord,
  numPackages: number
) {
  return { clientId, dateLimit, destination, numPackages };
}

const getSimulationDate = (dateLimit: Date) => {
  const dateSimulation = new Date(dateLimit);
  const dateToSimulString = dateSimulation.toLocaleString();
  const arrDate = dateToSimulString.split(",");
  //return `${formaterDate(arrDate[0])}${arrDate[1]}`;
  return `${formaterDate(arrDate[0])}`;
};

type Props = { specificDetail: Task[] };

function MiniTable({ specificDetail }: Props) {
  const rows: Task[] = [];
  specificDetail.forEach((task, index) => {
    let row = createData(
      task.clientId,
      task.dateLimit,
      task.destination,
      task.numPackages
    );
    // Check if it's the last element
    if (index !== specificDetail.length - 1) {
      rows.push(row);
    }
  });
  const tamanioArray = rows.length;
  return (
    <>
      {tamanioArray === 0 ? (
        <Typography
          id="modal-modal-title"
          variant="h4"
          sx={{
            textAlign: "center",
            color: "whitesmoke",
            fontWeight: "bold",
          }}
        >
          ¡Todos los pedidos ya fueron entregados!
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID Cliente</TableCell>
                <TableCell align="right">Fecha límite</TableCell>
                <TableCell align="right">Destino</TableCell>
                <TableCell align="right">Número de paquetes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.clientId}
                  </TableCell>
                  <TableCell align="right">
                    {getSimulationDate(row.dateLimit)}
                  </TableCell>
                  <TableCell align="right">{`(${row.destination.x} - ${row.destination.y})`}</TableCell>
                  <TableCell align="right">{row.numPackages}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}

export default MiniTable;
