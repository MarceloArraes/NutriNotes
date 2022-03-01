import { MathJaxContext, MathJax } from 'better-react-mathjax';
import React from 'react';
import { Box, Text } from '@skynexui/components';


export default function EstimativaDePeso(props){
  console.log("Estimativa de Peso props: ", props);
  
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
          Estimativa de Peso para {props.sexo}:
          <Text styleSheet={{padding: '5px',
                  margin: '5px',
                  borderRadius: '5px',}}
          >
          {/* <MathJax>{`\\(IMC=\\frac{peso}{altura^2}=\\frac{${props.peso}}{${(props.altura*props.altura).toFixed(2)}} \\approx {${(props.imc).toFixed(2)}}\\)`}</MathJax> */}
          {props.sexo=='homem'?
          <>
          <MathJax>{`\\(Peso = 1.73  \\times  CB + 0.98 \\times CP + 0.37 \\times DCSE + 1.16 \\times AJ– 81.69\\)`}</MathJax>
          <MathJax>{`\\(Peso = 1.73  \\times  {${props.CB}} + 0.98 \\times {${props.CP}} + 0.37 \\times {${props.DCSE}} + 1.16 \\times {${props.AJ}} – 81.69={${props.estimativaDePeso.toFixed(2)}}\\)`}</MathJax>
          </>:
          <>
          <MathJax>{`\\(Peso = 0.98  \\times  CB + 1.27 \\times CP + 0.4 \\times DCSE + 0.87 \\times AJ – 62.35\\)`}</MathJax>
          <MathJax>{`\\(Peso = 0.98  \\times  {${props.CB}} + 1.27 \\times {${props.CP}} + 0.4 \\times {${props.DCSE}} + 0.87 \\times {${props.AJ}} –  62.35={${props.estimativaDePeso.toFixed(2)}}\\)`}</MathJax>
          </>}
          </Text>
          </Box>
      </MathJaxContext>
  );
}