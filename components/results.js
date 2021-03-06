import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import appConfig from '../config.json';

function createData(name, resultValue, setState, interpretacao) {
  return { name, resultValue, setState, interpretacao };
}


export default function Results(props) {
  console.log(props);
  var rows2 = [];
  
  if(props.imc){
    rows2.push(createData('IMC', props.imc.toFixed(2), props.setShowImc, props.interpretacaoDoImc));
  }
  if(props.pesoIdeal){
    rows2.push(createData('Peso Ideal', `${props.pesoIdeal.toFixed(2)} kg` , props.setShowPesoIdeal, ''));
  }
  if(props.adequacaoDePeso){
    rows2.push(createData('Adequação de Peso', `${props.pesoIdeal.toFixed(2)} %` , props.setShowAdequacao, props.InterpretacaoDeAdequacaoDoPeso));
  }
  if(props.estimativaDePeso){
    rows2.push(createData('Estimativa de Peso', `${props.estimativaDePeso.toFixed(2)} kg`, props.setShowEstimativa, ''));
  }
  if(props.perdaDePeso){
    rows2.push(createData('Perda de Peso', `${props.perdaDePeso.toFixed(2)}%`, props.setShowPerdaDePeso, ''));
  }
  if(props.geb){
    rows2.push(createData('Gasto Energético Basal', `${Math.round(props.geb)} kcal` , props.setShowGeb, props.InterpretacaoDeAdequacaoDoPeso));
  }
  if(props.net){
    rows2.push(createData('Necessidade Energetica Total', `${Math.round(props.net)} kcal`, props.setShowNET, ''));
  }
  if(props.rCQ){
    rows2.push(createData('Relaçao Cintura/Quadril', `${props.rCQ.toFixed(2)}`, props.setShowRCQ, props.interpretacaoDeRCQ));
  }

  if(rows2.length === 0){
    return(
      null
    )
  }

  return (
    <Box
      sx={{
          display: 'table',
          flexDirection: 'column',
          width: '100%',
          alignItems: 'center',
          padding: '6px 8px',
          marginBottom: '16px',
          marginTop: '16px',
          marginRight: '12px',
          backgroundColor: appConfig.theme.colors.neutrals[800],
          border: '1px solid',
          borderColor: appConfig.theme.colors.neutrals[999],
          borderRadius: '10px',
          flex: 1,
          minHeight: '200px',
      }}
  >
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 150 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Metódo de Medida: </TableCell>
            <TableCell align="right">Resultado: </TableCell>
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
                {row.setState?<IconButton onClick={
                () => {
                  row.setState(prevState => !prevState )
                }}
                align="center" aria-label="visibility" size="small">
                    <VisibilityIcon fontSize="inherit" />
              </IconButton>:null}
              </TableCell>
              <TableCell align="right"><h2>{row.resultValue}</h2>
              {row.interpretacao ?<div>
                <strong>Interpretação: <Typography color="red" align="right">{row.interpretacao}</Typography></strong></div>
                :null}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  );
}
