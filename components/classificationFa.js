import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Box from '@mui/material/Box';
import appConfig from '../config.json';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';  


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
  createData(7,'Acamado', "", '', 1.2, ''),
  createData(8,'Acamado + Movimento', "", '', 1.25, ''),
  createData(9,'Ambulante', "", '', 1.3, ''),
];

export default function ClassificationFa(props) {


  return (
    <Accordion sx={{
      width: '100%',
      border: '0',
      resize: 'none',
      borderRadius: '5px',
      //padding: '6px 8px',
      backgroundColor: appConfig.theme.colors.neutrals[800],
      marginRight: '12px',
      color: appConfig.theme.colors.neutrals[200],
      label: {fontWeight: 'bold'},
    }}>
    <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{
            width: '100%',
            border: '0',
            resize: 'none',
            borderRadius: '5px',
            //padding: '6px 8px',
            backgroundColor: appConfig.theme.colors.neutrals[800],
            marginRight: '12px',
            color: appConfig.theme.colors.neutrals[200],
            label: {fontWeight: 'bold'},
          }}
        >
          <Typography>Referência do Fator de Atividade</Typography>
        </AccordionSummary>
        <AccordionDetails>
    <Box sx={{
      backgroundColor: appConfig.theme.colors.neutrals[500],
      width: '100%',
      border: '5px',
      marginBottom: '5px',
      resize: 'none',
      borderRadius: '5px',
      padding: '6px 8px',
      marginRight: '12px',
      color: appConfig.theme.colors.neutrals[200],
  }}
>
  <Box >
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 150, opacity:1 }} size="small" aria-label="a dense table">
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
    </Box>
    </Box>
    </AccordionDetails>
    </Accordion>
  );
}