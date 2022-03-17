import { MathJaxContext, MathJax } from 'better-react-mathjax';
import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


export default function PerdaDePeso(props){
  console.log(props);
  
  return (
      <MathJaxContext>
            <Box 
              sx={{
                  gap: '16px',
                  padding: '16px',
                  margin: '16px',
                  borderRadius: '5px',
              }}
            >
          Perda de Peso: {props.perdaDePeso.toFixed(2)}%
          <Typography sx={{padding: '5px',
                  margin: '5px',
                  borderRadius: '5px',}}
          >
          {/* <MathJax>{`\\(IMC=\\frac{peso}{altura^2}=\\frac{${props.peso}}{${(props.altura*props.altura).toFixed(2)}} \\approx {${(props.imc).toFixed(2)}}\\)`}</MathJax> */}
          <MathJax>{`\\(\\frac {PH-PA}{PH} \\times 100=\\frac {${props.pesohabitual}-${props.pesoAtual}}{${props.pesohabitual}} \\times 100={${props.perdaDePeso.toFixed(2)}}\\%\\)`}</MathJax>
          {/* <MathJax>{`\\(\\frac {${props.pesohabitual}-${props.pesoAtual}}{${props.pesohabitual}} \\times 100={${props.perdaDePeso}}\\%\\)`}</MathJax> */}
          </Typography>

          </Box>
      </MathJaxContext>
  );
}
