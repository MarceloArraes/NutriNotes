import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SvgIcon from '@mui/material/SvgIcon';
import IconButton from '@mui/material/IconButton';


function createData(name, resultValue, setState) {
  return { name, resultValue, setState };
}


export default function Results(props) {
  console.log(props);
  var rows2 = [];

 /*  const rows = [
    createData('IMC', props.imc.toFixed(2), props.setShowImc),
    createData('Peso Ideal', props.pesoIdeal.toFixed(2) , props.setShowPesoIdeal),
    createData('Estimativa de Peso', props.estimativaDePeso.toFixed(2), props.setShowEstimativa),
    createData('Perda de Peso', `${props.perdaDePeso}%`, props.setShowPerdaDePeso),
    createData('Gasto Energético Basal', Math.round(props.geb) , props.setShowGeb),
    createData('Necessidade Energetica Total', Math.round(props.net), props.setShowNET),
  ]; */
  
  if(props.imc){
    rows2.push(createData('IMC', props.imc.toFixed(2), props.setShowImc));
  }
  if(props.pesoIdeal){
    rows2.push(createData('Peso Ideal', `${props.pesoIdeal.toFixed(2)} kg` , props.setShowPesoIdeal));
  }
  if(props.estimativaDePeso){
    rows2.push(createData('Estimativa de Peso', `${props.estimativaDePeso.toFixed(2)} kg`, props.setShowEstimativa));
  }
  if(props.perdaDePeso){
    rows2.push(createData('Perda de Peso', `${props.perdaDePeso.toFixed(2)}%`, props.setShowPerdaDePeso));
  }
  if(props.geb){
    rows2.push(createData('Gasto Energético Basal', `${Math.round(props.geb)} kcal` , props.setShowGeb));
  }
  if(props.net){
    rows2.push(createData('Necessidade Energetica Total', `${Math.round(props.net)} kcal`, props.setShowNET));
  }


  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 150 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Metódo de Medida: </TableCell>
            <TableCell align="right">Resultado: </TableCell>
            <TableCell align="right">Ver Formula: </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows2.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.resultValue}</TableCell>
              <TableCell align="right">
              <IconButton onClick={
                () => {
                  row.setState(prevState => !prevState )
                  console.log("Tentando alterar visibilidade.")
                }}
                align="center" aria-label="visibility" size="small">
                    <VisibilityIcon fontSize="inherit" />
              </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
