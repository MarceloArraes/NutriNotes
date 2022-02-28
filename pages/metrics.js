import { Box, Text, TextField, Image, Button, Icon } from '@skynexui/components';
import {FormControl,FormLabel,RadioGroup,FormControlLabel, Radio, Collapse} from '@material-ui/core';
import React,{useEffect, useState, useRef} from 'react';
import IMC from '../components/imc.js';
import GEB from '../components/geb.js';
import EstimativaDePeso from '../components/estimativaDePeso.js';
import PerdaDePeso from '../components/perdaDePeso.js';

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
import ClassificationFa from '../components/classificationFa.js';
import Popper from '@mui/material/Popper';


function RadioSexo(props){

    function handleChange(event) {
        console.log(event.target.value);
        props.setSexo(event.target.value);
    }

    return(
        <FormControl disabled={props.isDisabled}>
        <FormLabel id="demo-row-radio-buttons-group-label"></FormLabel>
        <RadioGroup
            aria-labelledby="demo-row-radio-buttons-group-label"
            defaultValue="mulher"
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
    

    //IMC e IMC ideal
    const [pesoAtual, setPesoAtual] = useState(''); ///INPUT
    const [altura, setAltura] = useState('');///INPUT
    const [imc, setImc] = useState(''); ///RESULTADO
    const [pesoIdeal, setPesoIdeal] = useState(''); ///RESULTADO

    //Perda de peso
    const [pesoHabitual, setPesoHabitual] = useState(''); ///INPUT
    const [perdaDePeso, setPerdaDePeso] = useState(''); ///RESULTADO

    //Estimativa de peso
    const [CB, setCB] = useState(''); ///INPUT
    const [sexo, setSexo] = useState('mulher'); ///INPUT
    const [CP, setCP] = useState(''); ///INPUT
    const [DCSE, setDCSE] = useState(''); ///INPUT
    const [AJ, setAJ] = useState(''); ///INPUT
    const [estimativaDePeso, setEstimativaDePeso] = useState(''); ///RESULTADO

    //GEB
    const [idade, setIdade] = useState(''); ///INPUT
    const [geb, setGeb] = useState('');   ///RESULTADO
    const [nome, setNome] = useState(''); ///INPUT

    //Necessidade Energética Total - NET
    const [Fa, setFa] = useState(''); ///INPUT
    const [Fi, setFi] = useState(''); ///INPUT
    const[NET, setNET] = useState(''); ///RESULTADO

    //Modals
    const [isDisabled, setIsDisabled] = useState(false); ///MODAL
    const firstUpdate = useRef(true); ///MODAL
    const [infoButton, setInfoButton] = useState(false); ///MODAL
    const [anchorEl, setAnchorEl] = useState(null); ///MODAL
    const [openPopper,setOpenPopper] = useState(false); ///MODAL

    useEffect(() => {
        //prevent default
        if(firstUpdate.current) {
            firstUpdate.current = false;
            setIsDisabled(false);
            return;
        }
        setIsDisabled(true);
        firstUpdate.current = false;
    }, [imc, perdaDePeso,estimativaDePeso, geb]);
    

    useEffect(() => {
        //timer
        if(!openPopper){
        const timer = setTimeout(() => {
            setInfoButton(false)
            setAnchorEl(null)
        }, 3000);
        }
        if(openPopper){
            //setInfoButton(false)
            //setOpenPopper(false)
            //setAnchorEl(null)
            //pause timer
            clearTimeout(timer);
        }

    }, [setInfoButton, openPopper]);

function handleformSubmit(){
        console.log("submit");
        var localGeb = 0.0;
        if(pesoAtual.trim().length > 0 && altura.trim().length > 0) {
            console.log("Fazer conta do IMC");
            console.log("Peso: ", pesoAtual);
            console.log("Altura: ", altura);
            var idealImc = 0.0;

            if(idade>60){
                idealImc = 24.5;
            }else{
                if(sexo=='mulher'){
                    idealImc = 21;
                }
                else{
                    idealImc = 22;
                }
            }

            //Essa é a forma mais concisa de fazer a conta do IMC ideal, mas preferi deixar mais clara acima.
            //idade>60? idealImc = 24.5: sexo=='mulher'? idealImc = 21: idealImc = 22;

                if(altura > 3){
                    let alturaemmetros = altura /100;
                    let imc = pesoAtual / (alturaemmetros * alturaemmetros);
                    let pesoIdeal = (alturaemmetros * alturaemmetros) * idealImc;
                    console.log("Peso Ideal1: ", pesoIdeal);
                    setImc(imc);
                    setPesoIdeal(pesoIdeal);

                }else{
                    let imc = pesoAtual/(altura * altura);
                    let pesoIdeal = (altura * altura) * idealImc;
                    console.log("Peso Ideal2: ", pesoIdeal);
                    setImc(imc);
                    setPesoIdeal(pesoIdeal);
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
            if(sexo==='mulher'){
                let estimativaDePeso = (0.98 * CB) + (1.27 * CP) + (0.4 * DCSE) + (0.87 * AJ) - 62.35;
                setEstimativaDePeso(estimativaDePeso);
            }else{
            let estimativa = 1.73 * CB + (0.98 * CP) + (0.37 *DCSE) + (1.16 * AJ) - 81.69;
            setEstimativaDePeso(estimativa);
            }
            }
            if(pesoAtual.trim().length > 0 && idade.trim().length > 0 && altura.trim().length > 0) {
                console.log("Fazer conta do GEB");
                console.log("Sexo: ", sexo);
                console.log("Peso: ", pesoAtual);
                console.log("Idade: ", idade);
                console.log("Altura: ", altura);
                var alturaemcentimetros = altura
                if(altura<3){
                    alturaemcentimetros = altura * 100;
                }

                if(sexo==="homem"){
                let geb = 66.47 + (13.75*pesoAtual) + (5*alturaemcentimetros) - (6.76*idade);
                setGeb(geb);
                localGeb = geb;
                }else{
                let geb = 655.1 + (9.56*pesoAtual) + (1.85*alturaemcentimetros) - (4.68*idade);
                setGeb(geb);
                localGeb = geb;
            }
        }
            if(Fa.trim().length>0 && Fi.trim().length>0 && localGeb>0){
                console.log("Fazer conta do NET");
                console.log("Fa: ", Fa);
                console.log("Fi: ", Fi);
                let net = localGeb*(Fa * Fi)
                setNET(net);
                }
            
            
        
    }

    return (
        <Box
            styleSheet={{
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                height: 'auto',
                //backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(/background.png)`,
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
                                handleformSubmit();
                            }}
                            
                            styleSheet={{
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                flex: 2,
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

                            <TextField
                                placeholder="Nome do Paciente"
                                type="textarea"
                                disabled={isDisabled}
                                onChange={(e) => {
                                    setNome(e.target.value); 
                                } }
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
                            <Box
                                styleSheet={{
                                    backgroundColor: appConfig.theme.colors.neutrals[600],
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
                            <RadioSexo  isDisabled={isDisabled} setSexo={setSexo} />
                            </Box>
                            
                            <TextField
                                label="Idade"
                                disabled={isDisabled}
                                onChange={(e) => {
                                    setIdade(e.target.value); 
                                } }
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
                            <TextField
                                label="FA - Fator de Atividade"
                                disabled={isDisabled}
                                onChange={(e) => {  
                                    setFa(e.target.value); 
                                }}
                                onMouseOver={(e) => {
                                    e.preventDefault();
                                    setInfoButton(true);
                                }
                                }
                                //onMouseOut={() => setInfoButton(false)}
                                placeholder="Fator de Atividade (Ver Abaixo)PLACEHOLDER"
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
                                value={Fa}
                                variant="bottomBorder"
                            />
                            
                            <Collapse in={infoButton}>
                            <Button
                            type='button'
                            label='Tabela de Referencia.'
                            /* fullWidth */
                            onClick={(event) => {
                                setAnchorEl(anchorEl ? null : event.currentTarget);
                                setOpenPopper(!openPopper);
                            }}
                            styleSheet={{
                                width: '50%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                marginRight: '12px',
                                marginBottom: '9px',
                                }}
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary[500],
                                mainColorLight: appConfig.theme.colors.primary[400],
                                mainColorStrong: appConfig.theme.colors.primary[600],
                            }}
                            />
                            <Popper open={openPopper} anchorEl={anchorEl} placement={"right"}>
                            <Box styleSheet={{
                                    backgroundColor: appConfig.theme.colors.neutrals[600],
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
                                    <Text>
                                        <ClassificationFa  />
                                    </Text>
                                </Box>
                            </Popper>
                            </Collapse>
                            <TextField
                                label="FI - Fator de Injúria (padrão = 1)"
                                disabled={isDisabled}
                                onChange={(e) => {  
                                    setFi(e.target.value); 
                                }}
                                placeholder="FI - Fator de Injúria PLACEHOLDER"
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
                                value={Fi}
                                variant="bottomBorder"
                            />

{/* A partir daqui são botões e depois os quadros(outputs) */}


                            {!imc && !perdaDePeso && !estimativaDePeso && !geb ?
                            <Button
                            type='submit'
                            label='Enviar'
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleformSubmit();
                                }
                            }}
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
                                    setFa('');
                                    setFi('');
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
                                        <div></div>
                                        PESO IDEAL: {pesoIdeal.toFixed(2)}
                                    {geb? <Text>
                                        <div></div>
                                        GEB: {geb.toFixed(2)}
                                    </Text>:null}
                                    {NET? 
                                    <Text>
                                        NET: {NET.toFixed(2)}
                                    </Text>:null}
                                    </Text>:null}
                                    {perdaDePeso? <Text>
                                        Perda de peso: {perdaDePeso.toFixed(2)}%
                                    </Text>:null}
                                    {pesoIdeal? <Text>
                                        Peso ideal: {pesoIdeal.toFixed(2)}
                                    </Text>:null}
                                    {estimativaDePeso? <Text>
                                        <div></div>
                                        Estimativa de Peso: {estimativaDePeso.toFixed(2)}kg
                                    </Text>:null}
                                </Box></>
                            }
                        
                        {imc ? 
                        <Box
                            in={(imc!=='').toString()}
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
                                <PerdaDePeso pesoAtual={pesoAtual} pesohabitual={pesoHabitual} perdaDePeso={perdaDePeso} />
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
                    <EstimativaDePeso sexo={sexo} CB={CB} CP={CP} DCSE={DCSE} AJ={AJ} estimativaDePeso={estimativaDePeso} />
                    </Text>
                </Box>
                    :null}
                    {geb? 
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
                    <GEB sexo={sexo} pesoAtual={pesoAtual} altura={altura} idade={idade} geb={geb} />
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

