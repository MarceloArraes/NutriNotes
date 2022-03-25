import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { MathJaxContext, MathJax } from 'better-react-mathjax';
import React from 'react';
import appConfig from '../config.json';


export default function GEB(props){
  console.log("PROPS GEB: ", props);

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
        minHeight: '240px', 
    }}
>   <Box>
      <MathJaxContext>
            <Box 
              sx={{
                  gap: '16px',
                  padding: '16px',
                  margin: '16px',
                  borderRadius: '5px',
              }}
            >
      GEB(Gasto Energético Basal) para {props.sexo}: {props.geb.toFixed(2)}
          <Typography sx={{padding: '5px',
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
          </Typography>

          </Box>
      </MathJaxContext>
      </Box>
    </Box>
  );
}