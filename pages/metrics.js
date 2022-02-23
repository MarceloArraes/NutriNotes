import { Box, Text, TextField, Image, Button, Icon } from '@skynexui/components';
import {FormControl,FormLabel,RadioGroup,FormControlLabel, Radio} from '@material-ui/core';
import React,{useEffect, useState, useRef} from 'react';
import appConfig from '../config.json';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useRouter } from 'next/router'
import { MathJaxContext, MathJax } from 'better-react-mathjax';

//         \\`frac(25x)(10) = 2^(10)\\`
//         \\(\\frac{25x}{10} = 2^{10}\\)
function IMC(props) {
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
    
      function DenseTable() {
        return (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 250 }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Estado Nutricional</TableCell>
                  <TableCell align="left">Faixa IMC</TableCell>
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
                    <TableRow 
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell align="right">{row.faixabaixaIMC}</TableCell>
                        <TableCell align="right">{row.faixaaltaIMC}</TableCell>
                    </TableRow>
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
            <Text>
                Colocar as tabelas aqui?
            </Text>
            <DenseTable/>
            </Box>
        </MathJaxContext>
    );
  }



  function GEB(props){
    console.log(props);
    //props = altura + peso + idade
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
            Perda de Peso: {props.perdaDePeso}%
            <Text styleSheet={{padding: '5px',
                    margin: '5px',
                    borderRadius: '5px',}}
            >
            {/* <MathJax>{`\\(IMC=\\frac{peso}{altura^2}=\\frac{${props.peso}}{${(props.altura*props.altura).toFixed(2)}} \\approx {${(props.imc).toFixed(2)}}\\)`}</MathJax> */}
            <MathJax>{`\\(\\frac {PH-PA}{PH} \\times 100=\\frac {${props.pesohabitual}-${props.pesoatual}}{${props.pesohabitual}} \\times 100={${props.perdaDePeso}}\\%\\)`}</MathJax>
            {/* <MathJax>{`\\(\\frac {${props.pesohabitual}-${props.pesoatual}}{${props.pesohabitual}} \\times 100={${props.perdaDePeso}}\\%\\)`}</MathJax> */}
            </Text>

            </Box>
        </MathJaxContext>
    );
  }
  function PerdaDePeso(props){
    console.log(props);
    
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
            Perda de Peso: {props.perdaDePeso}%
            <Text styleSheet={{padding: '5px',
                    margin: '5px',
                    borderRadius: '5px',}}
            >
            {/* <MathJax>{`\\(IMC=\\frac{peso}{altura^2}=\\frac{${props.peso}}{${(props.altura*props.altura).toFixed(2)}} \\approx {${(props.imc).toFixed(2)}}\\)`}</MathJax> */}
            <MathJax>{`\\(\\frac {PH-PA}{PH} \\times 100=\\frac {${props.pesohabitual}-${props.pesoatual}}{${props.pesohabitual}} \\times 100={${props.perdaDePeso}}\\%\\)`}</MathJax>
            {/* <MathJax>{`\\(\\frac {${props.pesohabitual}-${props.pesoatual}}{${props.pesohabitual}} \\times 100={${props.perdaDePeso}}\\%\\)`}</MathJax> */}
            </Text>

            </Box>
        </MathJaxContext>
    );
  }
//Peso (kg) = (1,73 x CB) + (0,98 x CP) + (0,37 x DCSE) + (1,16 x AJ) – 81,69

function EstimativaDePeso(props){
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
            Estimativa de Peso: 
            <Text styleSheet={{padding: '5px',
                    margin: '5px',
                    borderRadius: '5px',}}
            >
            {/* <MathJax>{`\\(IMC=\\frac{peso}{altura^2}=\\frac{${props.peso}}{${(props.altura*props.altura).toFixed(2)}} \\approx {${(props.imc).toFixed(2)}}\\)`}</MathJax> */}
            <MathJax>{`\\(Peso (kg) = (1.73  \\times  CB) + (0.98 \\times CP) + (0.37 \\times DCSE) + (1.16 \\times AJ) – 81.69\\)`}</MathJax>
            <MathJax>{`\\(Peso (kg) = (1.73  \\times  {${props.CB}}) + (0.98 \\times {${props.CP}}) + (0.37 \\times {${props.CDSE}}) + (1.16 \\times {${props.AJ}}) – 81.69={${props.estimativaDePeso.toFixed(2)}}\\)`}</MathJax>
             
            </Text>
            </Box>
        </MathJaxContext>
    );
  }

  function RadioSexo(props){

    function handleChange(event) {
        console.log(event.target.value);
        props.setSexo(event.target.value);
    }

    return(
        <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label">Sexo</FormLabel>
        <RadioGroup
            aria-labelledby="demo-row-radio-buttons-group-label"
            defaultValue="Mulher"
            name="radio-row-buttons-group"
            onChange={handleChange}
        >
            <FormControlLabel value="mulher" control={<Radio />} label="Mulher" />
            <FormControlLabel value="homem" control={<Radio />} label="Homem" />
        </RadioGroup>
        </FormControl>      
    )
  }


export default function MetricsPage() {
    //Refs and constants
    const roteamento = useRouter();
    const username = roteamento.query.email;
    

    //IMC
    const [pesoAtual, setPesoAtual] = useState('');
    const [altura, setAltura] = useState('');
    const [imc, setImc] = useState('');

    //Perda de peso
    const [pesoHabitual, setPesoHabitual] = useState('');
    const [perdaDePeso, setPerdaDePeso] = useState('');

    //Estimativa de peso
    const [CB, setCB] = useState('');
    const [sexo, setSexo] = useState('mulher');
    const [CP, setCP] = useState('');
    const [DCSE, setDCSE] = useState('');
    const [AJ, setAJ] = useState('');
    const [estimativaDePeso, setEstimativaDePeso] = useState('');

    //GEB
    const [idade, setIdade] = useState('');
    const [geb, setGeb] = useState('');
    
    
    const [message, setMessage] = useState('');

    //Modals
    const [isDisabled, setIsDisabled] = useState(false);
    const firstUpdate = useRef(true);
    
    useEffect(() => {
        //prevent default
        if(firstUpdate.current) {
            firstUpdate.current = false;
            setIsDisabled(false);
            return;
        }
        setIsDisabled(true);
        firstUpdate.current = false;
    }, [imc, perdaDePeso,estimativaDePeso]);


    function handleMessageInput(e){
        const mensagem ={
            /* id: Math.random(),  */
            texto: message,
            peso: pesoAtual,
            de: username
       }
       if (e.key === 'Enter') {
           e.preventDefault();
       }
       if (e.key === 'Enter' && message.trim().length  > 0) {
           console.log('entered e.key', e.key);
           setMessage('');
       } 
    }

    return (
        <Box
            styleSheet={{
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                height: 'auto',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(https://i.giphy.com/media/l2JHVUriDGEtWOx0c/giphy.webp)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    maxWidth: '95%',
                    maxHeight: '100%',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        //height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >
                    
                    <Box
                            as="form"
                            onSubmit={(e) => {
                                e.preventDefault();
                                //Here i will put a function that i send all the inputs and the function set the results.

                                if(pesoAtual.trim().length > 0 && altura.trim().length > 0) {
                                console.log("Fazer conta do IMC");
                                console.log("Peso: ", pesoAtual);
                                console.log("Altura: ", altura);
                                    if(altura > 3){
                                        let alturaemmetros = altura /100;
                                        //setAltura(alturaemmetros);
                                        let imc = pesoAtual / (alturaemmetros * alturaemmetros);
                                        setImc(imc);
                                    }else{
                                        let localimc = pesoAtual/(altura * altura);
                                        setImc(localimc);
                                    }
                                }
                                if(pesoAtual.trim().length > 0 && pesoHabitual.trim().length > 0) {
                                    console.log("Fazer conta do peso habitual");
                                    console.log("Peso: ", pesoAtual);
                                    console.log("Peso habitual: ", pesoHabitual);
                                    let perdaDePeso2 = ((pesoHabitual - pesoAtual) / pesoHabitual )*100;
                                    console.log("Percentual de perda de peso: ", perdaDePeso2);
                                    setPerdaDePeso(perdaDePeso2);
                                }
                                if(CB.trim().length>0 && CP.trim().length>0 && DCSE.trim().length>0 && AJ.trim().length>0){
                                console.log("Estimativa de peso baseadas nos dados");
                                console.log("CB: ", CB);
                                console.log("CP: ", CP);
                                console.log("DCSE: ", DCSE);
                                console.log("AJ: ", AJ);
                                //aqui tenho q ver se o paciente é homem ou mulher
                                let estimativa = 1.73 * CB + (0.98 * CP) + (0.37 *DCSE) + (1.16 * AJ) - 81.69;
                                setEstimativaDePeso(estimativa);
                                }
                                if(pesoAtual.trim().length > 0 && idade.trim().length > 0 && altura.trim().length > 0) {
                                    console.log("Fazer conta do GEB");
                                    if(sexo==="homem"){
                                    console.log("Sexo: ", sexo);
                                    console.log("Peso: ", pesoAtual);
                                    console.log("Idade: ", idade);
                                    console.log("Altura: ", altura);
                                    //66,47  + 13,75  (Peso) + 5 (Estatura cm) - 6,76 (Idade)

                                    let geb = 66.47 + (13.75*pesoAtual) + (5*altura) - (6.76*idade);
                                    setGeb(geb);
                                }else{
                                    console.log("Sexo: ", sexo);
                                    console.log("Peso: ", pesoAtual);
                                    console.log("Idade: ", idade);
                                    console.log("Altura: ", altura);
                                    //66,47  + 13,75  (Peso) + 5 (Estatura cm) - 6,76 (Idade)

                                    let geb = 655.1 + (9.56*pesoAtual) + (1.85*altura) - (4.68*idade);
                                    setGeb(geb);
                                }
                                }
                            }}
                            
                            styleSheet={{
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: 'column',
                                
                            }}
                        >
                            <Box
                                styleSheet={{
                                    backgroundColor: appConfig.theme.colors.primary[900],
                                    width: '100%',
                                    border: '5px',
                                    marginBottom: '16px',
                                    resize: 'none',
                                    borderRadius: '5px',
                                    padding: '6px 8px',
                                    marginRight: '12px',
                                    color: appConfig.theme.colors.neutrals[200],
                                }}
                                >
                                Usuário: {username} 
                            </Box>
                            <Box
                                styleSheet={{
                                    backgroundColor: appConfig.theme.colors.neutrals[600],
                                    width: '100%',
                                    border: '5px',
                                    marginBottom: '16px',
                                    resize: 'none',
                                    borderRadius: '5px',
                                    padding: '6px 8px',
                                    marginRight: '12px',
                                    color: appConfig.theme.colors.neutrals[200],
                                }}
                                >
                            <TextField
                                placeholder="Nome do Paciente"
                                type="textarea"
                                styleSheet={{
                                    width: '100%',
                                    border: '0',
                                    resize: 'none',
                                    borderRadius: '5px',
                                    padding: '6px 8px',
                                    backgroundColor: appConfig.theme.colors.neutrals[800],
                                    marginRight: '12px',
                                    color: appConfig.theme.colors.neutrals[200],
                                }}/>
                                <RadioSexo setSexo={setSexo} />
                            </Box>
                            <TextField
                                label="Idade"
                                disabled={isDisabled}
                                onChange={(e) => {
                                    setIdade(e.target.value); 
                                } }
                                onKeyPress={(e) => {
                                    handleMessageInput(e);
                                }}
                                placeholder="Placeholder text..."
                                styleSheet={{
                                    width: '100%',
                                    border: '0',
                                    resize: 'none',
                                    borderRadius: '5px',
                                    padding: '6px 8px',
                                    backgroundColor: appConfig.theme.colors.neutrals[800],
                                    marginRight: '12px',
                                    color: appConfig.theme.colors.neutrals[200],
                                }}
                                type="number"
                                value={idade}
                                variant="bottomBorder"
                            />
                            <TextField
                                label="Altura em Centímetros"
                                disabled={isDisabled}
                                onChange={(e) => {
                                    setAltura(e.target.value); 
                                } }
                                onKeyPress={(e) => {
                                    handleMessageInput(e);
                                }}
                                placeholder="Placeholder text..."
                                styleSheet={{
                                    width: '100%',
                                    border: '0',
                                    resize: 'none',
                                    borderRadius: '5px',
                                    padding: '6px 8px',
                                    backgroundColor: appConfig.theme.colors.neutrals[800],
                                    marginRight: '12px',
                                    color: appConfig.theme.colors.neutrals[200],
                                }}
                                type="number"
                                value={altura}
                                variant="bottomBorder"
                            />
                            
                            <TextField
                                label="Peso Atual (Kg)"
                                disabled={isDisabled}
                                onChange={(e) => {  
                                    setPesoAtual(e.target.value); 
                                }}
                                onKeyPress={(e) => {
                                    handleMessageInput(e);
                                }}
                                placeholder="PESO ATUAL PLACEHOLDER"
                                styleSheet={{width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                                }}
                                type="number"
                                value={pesoAtual}
                                variant="bottomBorder"
                            />
                            
                            <TextField
                                label="Peso Habitual(Anterior) (Kg)"
                                disabled={isDisabled}
                                onChange={(e) => {  
                                    setPesoHabitual(e.target.value); 
                                }}
                                onKeyPress={(e) => {
                                    handleMessageInput(e);
                                }}
                                placeholder="PESO Habitual PLACEHOLDER"
                                styleSheet={{width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                                }}
                                type="number"
                                value={pesoHabitual}
                                variant="bottomBorder"
                            />
                            <TextField
                                label="CB - Circunferência do Braço"
                                disabled={isDisabled}
                                onChange={(e) => {  
                                    setCB(e.target.value); 
                                }}
                                onKeyPress={(e) => {
                                    handleMessageInput(e);
                                }}
                                placeholder="PESO Habitual PLACEHOLDER"
                                styleSheet={{width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                                }}
                                type="number"
                                value={CB}
                                variant="bottomBorder"
                            />
                            <TextField
                                label="CP - Circunferência da Panturrilha"
                                disabled={isDisabled}
                                onChange={(e) => {  
                                    setCP(e.target.value); 
                                }}
                                onKeyPress={(e) => {
                                    handleMessageInput(e);
                                }}
                                placeholder="PESO Habitual PLACEHOLDER"
                                styleSheet={{width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                                }}
                                type="number"
                                value={CP}
                                variant="bottomBorder"
                            />
                            <TextField
                                label="DCSE - Dobra Cutânea Sub Escapular"
                                disabled={isDisabled}
                                onChange={(e) => {  
                                    setDCSE(e.target.value); 
                                }}
                                onKeyPress={(e) => {
                                    handleMessageInput(e);
                                }}
                                placeholder="PESO Habitual PLACEHOLDER"
                                styleSheet={{width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                                }}
                                type="number"
                                value={DCSE}
                                variant="bottomBorder"
                            />
                            <TextField
                                label="AJ - Altura do Joelho"
                                disabled={isDisabled}
                                onChange={(e) => {  
                                    setAJ(e.target.value); 
                                }}
                                onKeyPress={(e) => {
                                    handleMessageInput(e);
                                }}
                                placeholder="PESO Habitual PLACEHOLDER"
                                styleSheet={{width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                                }}
                                type="number"
                                value={AJ}
                                variant="bottomBorder"
                            />
                            {!imc && !perdaDePeso && !estimativaDePeso && !geb ?
                            <Button
                            type='submit'
                            label='Enviar'
                            fullWidth
                            styleSheet={{
                                width: '100%',
                                    border: '0',
                                    resize: 'none',
                                    borderRadius: '5px',
                                    padding: '6px 8px',
                                    marginRight: '12px',
                                }}
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary[500],
                                mainColorLight: appConfig.theme.colors.primary[400],
                                mainColorStrong: appConfig.theme.colors.primary[600],
                            }}
                            />:
                            <><Button
                                type='button'
                                label='Resetar'
                                fullWidth
                                onClick={() => {
                                    setPesoAtual('');
                                    setAltura('');
                                    setImc('');
                                    setPesoHabitual('');
                                    setCB('');
                                    setCP('');
                                    setDCSE('');
                                    setAJ('');
                                    setPerdaDePeso('');
                                    setEstimativaDePeso('');
                                    setGeb('');
                                    setIdade('');
                                    setSexo('mulher');
                                    setIsDisabled(false);
                                    firstUpdate.current = true;
                                } }
                                styleSheet={{
                                    width: '100%',
                                    border: '0',
                                    resize: 'none',
                                    borderRadius: '5px',
                                    padding: '6px 8px',
                                    marginRight: '12px',
                                }}
                                buttonColors={{
                                    contrastColor: appConfig.theme.colors.neutrals["000"],
                                    mainColor: appConfig.theme.colors.primary[500],
                                    mainColorLight: appConfig.theme.colors.primary[400],
                                    mainColorStrong: appConfig.theme.colors.primary[600],
                                }} /><Box
                                    styleSheet={{
                                        display: 'flex',
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
                                >   
                                    {imc? <Text>
                                        IMC: {imc.toFixed(2)}
                                    </Text>:null}
                                    
                                    {perdaDePeso? <Text>
                                        Perda de peso: {perdaDePeso.toFixed(2)}%
                                    </Text>:null}

                                    {estimativaDePeso? <Text>
                                        Estimativa de Peso: {estimativaDePeso.toFixed(2)}kg
                                    </Text>:null}
                                    {geb? <Text>
                                        GEB: {geb.toFixed(2)}
                                    </Text>:null}
                                    

                                </Box></>
                            }
                        
                        {imc ? 
                        <Box
                            styleSheet={{
                            display: 'flex',
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
                        >
                                <Text>
                                    {/* send props to APP */}
                                    <IMC peso={pesoAtual} altura={altura} imc={imc} />
                                </Text>
                        </Box>
                        :null}
                        {perdaDePeso?
                        <Box
                        styleSheet={{
                            display: 'flex',
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
                    >
                            <Text>
                                
                                {/* send props to APP */}
                                <PerdaDePeso pesoatual={pesoAtual} pesohabitual={pesoHabitual} perdaDePeso={perdaDePeso} />
                            </Text>
                    </Box>
                    :null}
                    {estimativaDePeso? 
                    <Box
                    styleSheet={{
                        display: 'flex',
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
                >   <Text>
                    <EstimativaDePeso CB={CB} CP={CP} DCSE={DCSE} AJ={AJ} estimativaDePeso={estimativaDePeso} />
                    </Text>
                </Box>
                    :null}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}


function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Metrics
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

