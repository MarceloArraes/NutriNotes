import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(id ,idade, genero, leve, moderado, pesado) {
  return { id ,idade, genero, leve, moderado, pesado };
}

const rows = [
  createData(1,'10 a 18 anos', "Masculino", 1.6, 2.5, 6.0),
  createData(2,'10 a 18 anos', "Feminino", 1.5, 2.2, 6.0),
  createData(3,'18 a 65 anos',"Masculino" , 1.55, 1.78, 2.1),
  createData(4,'18 a 65 anos',"Feminino" , 1.56, 1.64, 1.82),
  createData(5,'Acima de 65 anos', "Masculino", 1.4, 1.6, 1.9),
  createData(6,'Acima de 65 anos', "Feminino", 1.4, 1.6, 1.8),
];


export default function ClassificationFa() {


  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 450 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Idade</TableCell>
            <TableCell align="left">Genero</TableCell>
            <TableCell colSpan={3} align="left">Classificação de atividade física</TableCell>
          </TableRow>
          <TableRow>
          <TableCell  align="left"></TableCell>
          <TableCell  align="left"></TableCell>
          <TableCell  align="left">Leve</TableCell>
          <TableCell  align="left">Moderado</TableCell>
          <TableCell  align="left">Pesado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.idade}
              </TableCell>
              <TableCell align="left">{row.genero}</TableCell>
              <TableCell align="left">{row.leve}</TableCell>
              <TableCell align="left">{row.moderado}</TableCell>
              <TableCell align="left">{row.pesado}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}