import { Box, Text, TextField, Image, Button, Icon } from '@skynexui/components';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { MathJaxContext, MathJax } from 'better-react-mathjax';




export default function IMC(props) {
  console.log(props);
  
  function createData(name, faixabaixaIMC, faixaaltaIMC) {
      return { name, faixabaixaIMC, faixaaltaIMC };
    }

    if(props.altura>3){
    var alturaemmetros = props.altura /100;
      }
    const rows = [
      createData('Magreza grau III', '<16', ''),
      createData('Magreza grau II',   '≤16','≤16.9'),
      createData('Magreza grau I',    '≤17','≤18,4'),
      createData('Faixa Normal',      '≤18,5','≤24,9'),
      createData('Pré Obesidade',     '≤25','≤29,9'),
      createData('Obesidade Grau I',  '≤30','≤34,9'),
      createData('Obesidade Grau II', '≤35','≤39,9'),
      createData('Obesidade Grau III','≤40',''),
    ];
  
    function NutricionalStateTable() {
      return (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 250 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Estado Nutricional</TableCell>
                <TableCell colSpan={2} align="center">Faixa IMC</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  
                      <TableCell align="right">{row.faixabaixaIMC}</TableCell>
                      <TableCell align="right">{row.faixaaltaIMC}</TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
    }
    
  return (
      <MathJaxContext>
            <Box 
              styleSheet={{
                  gap: '16px',
                  padding: '16px',
                  margin: '16px',
                  borderRadius: '5px',
              }}
            >
          IMC: {props.imc.toFixed(2)}
          <Text styleSheet={{padding: '5px',
                  margin: '5px',
                  borderRadius: '5px',}}
          >
          <MathJax>{`\\(IMC=\\frac{peso}{altura^2}=\\frac{${props.peso}}{${(alturaemmetros*alturaemmetros).toFixed(2)}} \\approx {${(props.imc).toFixed(2)}}\\)`}</MathJax>
          </Text>
          <NutricionalStateTable/>
          
          </Box>
      </MathJaxContext>
  );
}
