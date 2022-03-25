import { MathJaxContext, MathJax } from 'better-react-mathjax';
import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import appConfig from '../config.json';

export default function EstimativaDePeso(props){
  console.log("Estimativa de Peso props: ", props);
  
  return (
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            alignItems: 'left',
            padding: '6px 8px',
            marginBottom: '16px',
            marginTop: '16px',
            marginRight: '12px',
            backgroundColor: appConfig.theme.colors.neutrals[800],
            border: '1px solid',
            borderColor: appConfig.theme.colors.neutrals[999],
            borderRadius: '10px',
            flex: 1,
            minHeight: '240px', 
        }}>
      <MathJaxContext>
            <Box 
              sx={{
                  gap: '16px',
                  padding: '16px',
                  borderRadius: '5px',
                  maxWidth: '100%',
              }}
            >
          Estimativa de Peso para {props.sexo}:
          <Typography sx={{padding: '5px',
                  margin: '5px',
                  borderRadius: '5px',
                }}
          >
          {props.sexo=='homem'?
          <>
          <p>Formula:</p>
          <MathJax inline hideUntilTypeset={"first"}>{`\\(Peso=1.73 \\times CB+0.98 \\times CP+0.37 \\)`}</MathJax>
          <MathJax inline hideUntilTypeset={"first"}>{`\\(\\times DCSE+1.16 \\times AJ– 81.69\\)`}</MathJax>
          <p>Formula Aplicada:</p>
          <MathJax hideUntilTypeset={"first"}>{`\\(1.73 \\times{${props.CB}}+0.98 \\times{${props.CP}}+0.37 \\)`}</MathJax>
          <MathJax hideUntilTypeset={"first"}>{`\\(\\times{${props.DCSE}}+1.16 \\times{${props.AJ}}–81.69=\\)`}</MathJax>
          <MathJax hideUntilTypeset={"first"}>{`\\({${props.estimativaDePeso.toFixed(2)}}Kg\\)`}</MathJax>
          </>:
          <>
          <p>Formula:</p>
          <MathJax inline hideUntilTypeset={"first"}>{`\\(Peso=0.98 \\times CB+1.27 \\times CP+0.4\\)`}</MathJax>
          <MathJax inline hideUntilTypeset={"first"}>{`\\(\\times DCSE+0.87 \\times AJ–62.35\\)`}</MathJax>
          <p>Formula Aplicada:</p>
          <MathJax hideUntilTypeset={"first"}>{`\\(0.98 \\times {${props.CB}} + 1.27 \\times {${props.CP}} + 0.4 \\)`}</MathJax>
          <MathJax hideUntilTypeset={"first"}>{`\\(\\times {${props.DCSE}} + 0.87 \\times {${props.AJ}}–62.35=\\)`}</MathJax>
          <MathJax hideUntilTypeset={"first"}>{`\\( {${props.estimativaDePeso.toFixed(2)}}Kg\\)`}</MathJax>
          </>}
          </Typography>
          </Box>
      </MathJaxContext>
    </Box>
  );
}