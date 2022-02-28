import { Box, Text} from '@skynexui/components';
/* import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper'; */
import { MathJaxContext, MathJax } from 'better-react-mathjax';
import React from 'react';



export default function GEB(props){
  console.log("PROPS GEB: ", props);

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
      GEB(Gasto Energético Basal) para {props.sexo}: {props.geb.toFixed(2)}
          <Text styleSheet={{padding: '5px',
                  margin: '5px',
                  borderRadius: '5px',}}
          >
          {props.sexo=='homem'?
          <>
          <MathJax>{`\\(66.47  + 13.75  \\times Peso + 5 \\times Estatura\(cm\) - 6.76 \\times Idade\\)`}</MathJax>
          <MathJax>{`\\(66.47  + 13.75 \\times ${props.pesoAtual} + 5 \\times ${props.altura} - 6.76 \\times ${props.idade}=${props.geb.toFixed(2)}kcal/dia\\)`}</MathJax>
          </>
          :
          <>
          <MathJax>{`\\(655.1 + 9.56  \\times Peso + 1.85 \\times Estatura\(cm\) - 4.68\\times Idade\\)`}</MathJax>
          <MathJax>{`\\(655.1 + 9.56 \\times ${props.pesoAtual} + 1.85 \\times ${props.altura} - 4.68 \\times ${props.idade}=${props.geb.toFixed(2)}kcal/dia\\)`}</MathJax>
          </>
          }
          </Text>

          </Box>
      </MathJaxContext>
  );
}