import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
//import Avatar from '@mui/material/Avatar';


import React,{useEffect, useState, useRef} from 'react';
import IMC from '../components/imc.js';
import GEB from '../components/geb.js';
import EstimativaDePeso from '../components/estimativaDePeso.js';
import PerdaDePeso from '../components/perdaDePeso.js';
import RadioSexo from '../components/radioSexo.js';
import Results from '../components/results.js';
import RadioButtomFa from '../components/radioButtomFa.js';
import CheckboxFi from '../components/checkboxFi.js';
import SplitButton from '../components/splitButton.js';
import DropdownFi from '../components/dropdownFi.js';

import ClassificationFa from '../components/classificationFa.js';

import appConfig from '../config.json';

import { useRouter } from 'next/router'

export default function MetricsPage() {
    
    //Refs and constants
    const roteamento = useRouter();
    const username = roteamento.query.email;

    //Modals
    const [isDisabled, setIsDisabled] = useState(false); ///MODAL
    const firstUpdate = useRef(true); ///MODAL
    const [infoButton, setInfoButton] = useState(false); ///MODAL
    const [anchorEl, setAnchorEl] = useState(null); ///MODAL
    const [openPopper,setOpenPopper] = useState(false); ///MODAL
    
    //IMC e IMC ideal
    const [pesoAtual, setPesoAtual] = useState(''); ///INPUT
    const [altura, setAltura] = useState('');///INPUT
    const [imc, setImc] = useState(''); ///RESULTADO
    const [pesoIdeal, setPesoIdeal] = useState(''); ///RESULTADO
    const [showPesoIdeal, setShowPesoIdeal] = useState(false); ///RESULTADO
    const [showImc, setShowImc] = useState(false); ///RESULTADO
    const [interpretacaoDoImc, setInterpretacaoDoImc] = useState(''); ///INTERPRETACAO

    //Perda de peso
    const [pesoHabitual, setPesoHabitual] = useState(''); ///INPUT
    const [perdaDePeso, setPerdaDePeso] = useState(''); ///RESULTADO
    const [showPerdaDePeso, setShowPerdaDePeso] = useState(false); ///RESULTADO

    //Estimativa de peso
    const [CB, setCB] = useState(''); ///INPUT
    const [sexo, setSexo] = useState('mulher'); ///INPUT
    const [CP, setCP] = useState(''); ///INPUT
    const [DCSE, setDCSE] = useState(''); ///INPUT
    const [AJ, setAJ] = useState(''); ///INPUT
    const [estimativaDePeso, setEstimativaDePeso] = useState(''); ///RESULTADO
    const [showEstimativa, setShowEstimativa] = useState(false); ///RESULTADO
    const [InterpretacaoDeAdequacaoDoPeso,setInterpretacaoDeAdequacaoDoPeso]=useState(''); ///INTERPRETAÇAO

    //GEB
    const [idade, setIdade] = useState(''); ///INPUT
    const [nome, setNome] = useState(''); ///INPUT
    const [geb, setGeb] = useState('');   ///RESULTADO
    const [showGeb, setShowGeb] = useState(false); ///RESULTADO
    
    //Necessidade Energética Total - NET
    const [Fa, setFa] = useState(''); ///INPUT
    const [radioFa, setRadioFa] = useState(''); ///INPUT
    
    const [nET, setNET] = useState(''); ///RESULTADO
    const [showNET, setShowNET] = useState(false); ///RESULTADO

    //Relaçao Cintura/Quadril (rCQ)
    const [cC, setcC] = useState(''); ///INPUT
    const [cQ, setcQ] = useState(''); ///INPUT
    const [rCQ, setrCQ] = useState(''); ///RESULTADO
    const [showrCQ, setShowrCQ] = useState(false); ///RESULTADO

    //Fator Injúria:
    const [condicaoClinica, setCondicaoClinica] = useState('');
    const [level, setLevel] = useState('');
    const [fatorInjuria, setFatorInjuria] = useState(''); ///RESULTADO
    const [showFatorInjuria, setShowFatorInjuria] = useState(false); ///RESULTADO



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
        if(!openPopper && infoButton){
        const timer = setTimeout(() => {
                setInfoButton(false)
        }, 3000);
        }
        if(openPopper && infoButton){
            clearTimeout(timer);
        }
    }, [openPopper]);

    useEffect(() => {
        if(idade>=10 && radioFa!==''){
            console.log("entering faHandler");

            if(idade<=18 && idade>10){
                if(sexo==='mulher'){
                    if(radioFa=='pesado')setFa(6.0);

                    if(radioFa=='moderado')setFa(2.2);
    
                    if(radioFa=='leve')setFa(1.5);
                }else if(sexo==='homem'){
                    if(radioFa=='pesado')setFa(6.0);

                    if(radioFa=='moderado' )setFa(2.5);
    
                    if(radioFa=='leve')setFa(1.60);
                }
            }else if(idade>18 && idade<=65){
                if(sexo==='mulher'){
                    if(radioFa=='pesado')setFa(1.82);

                    if(radioFa=='moderado')setFa(1.64);
    
                    if(radioFa=='leve')setFa(1.56);
                }
                else if(sexo==='homem'){
                    if(radioFa=='pesado')setFa(2.1);

                    if(radioFa=='moderado')setFa(1.78);
    
                    if(radioFa=='leve')setFa(1.55);
                }

            }else if(idade>65){
                if(sexo==='mulher'){
                    if(radioFa=='pesado')setFa(1.8);

                    if(radioFa=='moderado')setFa(1.6);
    
                    if(radioFa=='leve')setFa(1.4);
                }
                else if(sexo==='homem'){
                    if(radioFa=='pesado')setFa(1.9);

                    if(radioFa=='moderado')setFa(1.6);
    
                    if(radioFa=='leve')setFa(1.4);
                }
            }
        }else if(idade>0 && idade<10){
            setFa('');
        }
    },[idade, radioFa, sexo]);


function handleformSubmit(){
        console.log("submit");
        var localGeb = 0.0;
        var localPesoIdeal = 0.0;
        
        //Fator de Injúria
        if(fatorInjuria==''){
            setFatorInjuria(1);
            var localFi = 1;
        }else{
            var localFi = fatorInjuria;
        }

        //IMC
        if(pesoAtual.length > 0 && altura.length > 0 && idade.length>0) {
            console.log("Fazer conta do IMC");
            console.log("Peso: ", pesoAtual);
            console.log("Altura: ", altura);
            var idealImc = 0.0;
            var imc = 0.0;

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
                    imc = pesoAtual / (alturaemmetros * alturaemmetros);
                    localPesoIdeal = (alturaemmetros * alturaemmetros) * idealImc;
                    console.log("Peso Ideal1: ", localPesoIdeal);
                    setImc(imc);
                    setPesoIdeal(localPesoIdeal);
            }else{
                    imc = pesoAtual/(altura * altura);
                    localPesoIdeal = (altura * altura) * idealImc;
                    console.log("Peso Ideal2: ", localPesoIdeal);
                    setImc(imc);
                    setPesoIdeal(localPesoIdeal);
                }
            
            //INTERPRETACAO IMC
            if(imc<16){
                setInterpretacaoDoImc("Magreza grau III");
            }else if( imc>=16 && imc<17){
                setInterpretacaoDoImc("Magreza grau II");
            } else if( imc>=17 && imc<18.5){
                setInterpretacaoDoImc("Magreza grau I");
            } else if( imc>=18.5 && imc<25){
                setInterpretacaoDoImc("Faixa Normal");
            } else if( imc>=25 && imc<30){
                setInterpretacaoDoImc("Pré Obesidade");
            } else if( imc>=30 && imc<35){
                setInterpretacaoDoImc("Obesidade grau I");
            } else if( imc>=35 && imc<40){
                setInterpretacaoDoImc("Obesidade grau II");
            } else if( imc>=40){
                setInterpretacaoDoImc("Obesidade grau III");
            }
        }
        //Perda de peso
        if(pesoAtual.length > 0 && pesoHabitual.length > 0) {
                console.log("Fazer conta do peso habitual");
                console.log("Peso: ", pesoAtual);
                console.log("Peso habitual: ", pesoHabitual);
                let perdaDePeso = ((pesoHabitual - pesoAtual) / pesoHabitual )*100;
                console.log("Percentual de perda de peso: ", perdaDePeso);
                setPerdaDePeso(perdaDePeso);
            }
        //Estimativa de peso
        if(CB.length>0 && CP.length>0 && DCSE.length>0 && AJ.length>0){
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
        //GEB
        if(pesoAtual.length > 0 && idade.length > 0 && altura.length > 0) {
                console.log("Fazer conta do GEB");
                var pesoAtualLocal = 0.0;
                //Se o peso tiver adequado, GEB usa PA. Se não, usa Peso Ajustado.
                //Adequação do peso = PA x 100 / PI    (Entre 95% e 115% é adequado)
                //Peso Ajustado = (PA-PI)x0,25 + PI

                let adequacaoDoPeso = (pesoAtual * 100)/localPesoIdeal;
                
                if(adequacaoDoPeso>= 95 && adequacaoDoPeso <= 115){
                    pesoAtualLocal = pesoAtual;
                }else{
                    pesoAtualLocal = (pesoAtual - localPesoIdeal) * 0.25 + localPesoIdeal;
                    if(adequacaoDoPeso<=70){
                        setInterpretacaoDeAdequacaoDoPeso("Desnutrição Grave");
                    }else if(adequacaoDoPeso>70 && adequacaoDoPeso<=80){
                        setInterpretacaoDeAdequacaoDoPeso("Desnutrição Moderada");
                    }else if(adequacaoDoPeso>80 && adequacaoDoPeso<=90){
                        setInterpretacaoDeAdequacaoDoPeso("Desnutrição Leve");
                    } else if(adequacaoDoPeso>90 && adequacaoDoPeso<=110){
                        setInterpretacaoDeAdequacaoDoPeso("Eutrofia");
                    }else if(adequacaoDoPeso>110 && adequacaoDoPeso<=120){
                        setInterpretacaoDeAdequacaoDoPeso("Sobrepeso");
                    }else if(adequacaoDoPeso>120){
                        setInterpretacaoDeAdequacaoDoPeso("Obesidade");
                    }
                }

                var alturaemcentimetros = altura
                if(altura<3){
                    alturaemcentimetros = altura * 100;
                }

                if(sexo==="homem"){
                let geb = 66.47 + (13.75*pesoAtualLocal) + (5*alturaemcentimetros) - (6.76*idade);
                localGeb = geb;
                setGeb(geb);
                }else{
                let geb = 655.1 + (9.56*pesoAtualLocal) + (1.85*alturaemcentimetros) - (4.68*idade);
                localGeb = geb;
                setGeb(geb);
            }
        }
        //NET - Necessidade Energética Total
        if(Fa>0){
                console.log("Fazer conta do NET");
                console.log("Fa: ", Fa);
                console.log("fatorInjuria: ", localFi);
                if( localGeb>0){
                    console.log("Geb: ", localGeb);
                }
                let net1 = localGeb*(Fa * localFi)
                setNET(net1);
            }
        //Relaçao Cintura/Quadril (rCQ)
        if(cC.length>0 && cQ.length>0){
            console.log("Fazer conta do cQ");
            console.log("cC: ", cC);
            console.log("cQ: ", cQ);
            console.log("cC/cQ: ", cC/cQ);
            setrCQ(cC/cQ);
        }
    }

    return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    alignItems: 'center', 
                    justifyContent: 'center',
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    maxWidth: '100%',
                    height: 'auto',
                }}
            >
                <Header />
                <Box
                    sx={{
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
                            sx={{
                                display: 'flex',
                                alignItems: 'left',
                                flexDirection: 'column',
                                /* flexWrap: 'wrap', */
                                flex: 1,
                                
                            }}
                        >
                            <Box
                                sx={{
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
                                type="text"
                                disabled={isDisabled}
                                onChange={(e) => {
                                    setNome(e.target.value); 
                                } }
                                sx={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                                label: {fontWeight: 'bold'},
                                fontWeight: 'bold',
                                "& label.Mui-focused": {
                                    color: appConfig.theme.colors.neutrals[200],
                                  },
                                  "& .MuiFilledInput-underline:after": {
                                    borderBottomColor: appConfig.theme.colors.neutrals[200],
                                  },
                                }}/>
                            <Box
                                sx={{
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
                            {/* <TextField2 id="filled-basic" label="Filled" variant="filled" /> */}
                            <RadioSexo  isDisabled={isDisabled} setSexo={setSexo} />
                            </Box>
                            
                            <TextField
                                label="Idade"
                                disabled={isDisabled}
                                type="number"
                                value={idade}
                                variant="filled"
                                
                                onChange={(e) => {
                                    setIdade(e.target.value); 
                                } }
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
                                      "& label.Mui-focused": {
                                        color: appConfig.theme.colors.neutrals[200],
                                      },
                                      "& .MuiFilledInput-underline:after": {
                                        borderBottomColor: appConfig.theme.colors.neutrals[200],
                                      },
                                }}
                            />
                            <TextField
                                label="Altura em Centímetros"
                                disabled={isDisabled}
                                type="number"
                                value={altura}
                                variant="filled"
                                
                                onChange={(e) => {
                                    setAltura(e.target.value); 
                                } }
                                sx={{
                                    hiddenLabel: true,
                                    width: '100%',
                                    border: '0',
                                    resize: 'none',
                                    borderRadius: '5px',
                                    //padding: '6px 8px',
                                    backgroundColor: appConfig.theme.colors.neutrals[800],
                                    marginRight: '12px',
                                    color: appConfig.theme.colors.primary[200],
                                    //label: { color: 'red' }
                                    label: {fontWeight: 'bold'},
                                    "& label.Mui-focused": {
                                        color: appConfig.theme.colors.neutrals[200],
                                      },
                                      "& .MuiFilledInput-underline:after": {
                                        borderBottomColor: appConfig.theme.colors.neutrals[200],
                                      },
                                }}
                                InputProps={{
                                    endAdornment: <InputAdornment position="start">cm</InputAdornment>,
                                  }}
                            />
                            
                            <TextField
                                label="Peso Atual (Kg)"
                                disabled={isDisabled}
                                variant="filled"
                                type="number"
                                value={pesoAtual}
                                onChange={(e) => {  
                                    setPesoAtual(e.target.value); 
                                }}
                                sx={{width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                //padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                                label: {fontWeight: 'bold'},
                                "& label.Mui-focused": {
                                    color: appConfig.theme.colors.neutrals[200],
                                  },
                                  "& .MuiFilledInput-underline:after": {
                                    borderBottomColor: appConfig.theme.colors.neutrals[200],
                                  },
                                }}
                                InputProps={{
                                    endAdornment: <InputAdornment position="start">kg</InputAdornment>,
                                  }}
                                
                                
                            />
                            
                            <TextField
                                label="Peso Habitual(Anterior) (Kg)"
                                disabled={isDisabled}
                                variant="filled"
                                type="number"
                                value={pesoHabitual}
                                onChange={(e) => {  
                                    setPesoHabitual(e.target.value); 
                                }}
                                sx={{width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                //padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                                label: {fontWeight: 'bold'},
                                "& label.Mui-focused": {
                                    color: appConfig.theme.colors.neutrals[200],
                                  },
                                  "& .MuiFilledInput-underline:after": {
                                    borderBottomColor: appConfig.theme.colors.neutrals[200],
                                  },
                                }}
                                InputProps={{
                                    endAdornment: <InputAdornment position="start">kg</InputAdornment>,
                                  }}
                            />
                            <TextField
                                label="CB - Circunferência do Braço"
                                disabled={isDisabled}
                                type="number"
                                value={CB}
                                variant="filled"
                                onChange={(e) => {  
                                    setCB(e.target.value); 
                                }}
                                sx={{width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                //padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                                label: {fontWeight: 'bold'},
                                "& label.Mui-focused": {
                                    color: appConfig.theme.colors.neutrals[200],
                                  },
                                  "& .MuiFilledInput-underline:after": {
                                    borderBottomColor: appConfig.theme.colors.neutrals[200],
                                  },
                                }}
                                InputProps={{
                                    endAdornment: <InputAdornment position="start">cm</InputAdornment>,
                                  }}

                            />
                            <TextField
                                label="CP - Circunferência da Panturrilha"
                                disabled={isDisabled}
                                type="number"
                                value={CP}
                                variant="filled"
                                onChange={(e) => {  
                                    setCP(e.target.value); 
                                }}
                                sx={{width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                //padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                                label: {fontWeight: 'bold'},
                                "& label.Mui-focused": {
                                    color: appConfig.theme.colors.neutrals[200],
                                  },
                                  "& .MuiFilledInput-underline:after": {
                                    borderBottomColor: appConfig.theme.colors.neutrals[200],
                                  },
                                }}
                                InputProps={{
                                    endAdornment: <InputAdornment position="start">cm</InputAdornment>,
                                  }}
                            />
                            <TextField
                                label="DCSE - Dobra Cutânea Sub Escapular"
                                disabled={isDisabled}
                                type="number"
                                value={DCSE}
                                variant="filled"
                                onChange={(e) => {  
                                    setDCSE(e.target.value); 
                                }}
                                sx={{width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                //padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                                label: {fontWeight: 'bold'},
                                "& label.Mui-focused": {
                                    color: appConfig.theme.colors.neutrals[200],
                                  },
                                  "& .MuiFilledInput-underline:after": {
                                    borderBottomColor: appConfig.theme.colors.neutrals[200],
                                  },
                                }}
                                InputProps={{
                                    endAdornment: <InputAdornment position="start">cm</InputAdornment>,
                                  }}
                            />
                            <TextField
                                label="AJ - Altura do Joelho"
                                disabled={isDisabled}
                                type="number"
                                value={AJ}
                                variant="filled"
                                onChange={(e) => {  
                                    setAJ(e.target.value); 
                                }}
                                sx={{width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                //padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                                label: {fontWeight: 'bold'},
                                "& label.Mui-focused": {
                                    color: appConfig.theme.colors.neutrals[200],
                                  },
                                  "& .MuiFilledInput-underline:after": {
                                    borderBottomColor: appConfig.theme.colors.neutrals[200],
                                  },
                                }}
                                InputProps={{
                                    endAdornment: <InputAdornment position="start">cm</InputAdornment>,
                                  }}
                            />
                            <TextField
                                label="CC - Circunferência da Cintura"
                                disabled={isDisabled}
                                type="number"
                                value={cC}
                                variant="filled"
                                onChange={(e) => {  
                                    setcC(e.target.value); 
                                }}
                                sx={{width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                //padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                                label: {fontWeight: 'bold'},
                                "& label.Mui-focused": {
                                    color: appConfig.theme.colors.neutrals[200],
                                  },
                                  "& .MuiFilledInput-underline:after": {
                                    borderBottomColor: appConfig.theme.colors.neutrals[200],
                                  },
                                }}
                                InputProps={{
                                    endAdornment: <InputAdornment position="start">cm</InputAdornment>,
                                  }}
                            />
                            <TextField
                                label="CQ - Circunferência de Quadril"
                                disabled={isDisabled}
                                type="number"
                                value={cQ}
                                variant="filled"
                                onChange={(e) => {  
                                    setcQ(e.target.value); 
                                }}
                                sx={{width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                //padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                                label: {fontWeight: 'bold'},
                                "& label.Mui-focused": {
                                    color: appConfig.theme.colors.neutrals[200],
                                  },
                                  "& .MuiFilledInput-underline:after": {
                                    borderBottomColor: appConfig.theme.colors.neutrals[200],
                                  },
                                }}
                                InputProps={{
                                    endAdornment: <InputAdornment position="start">cm</InputAdornment>,
                                  }}
                            />
                            <Typography sx={{
                                    width: '100%',
                                    border: '0',
                                    resize: 'none',
                                    //borderRadius: '5px',
                                    //padding: '6px 8px',
                                    marginRight: '12px',
                                    color: appConfig.theme.colors.neutrals[200],
                                }}
                            >Nível de Atividade física: </Typography>
                            <Box
                                sx={{
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
                            <RadioButtomFa isDisabled={isDisabled} radioFa={radioFa} setRadioFa={setRadioFa} /> 
                            </Box>
                            <TextField
                                label="FA - Fator de Atividade"
                                disabled={isDisabled}
                                //disabled
                                type="number"
                                value={Fa}
                                variant="filled"
                                onChange={(e) => {
                                    setFa(Fa); 
                                }}
                                onMouseOver={(e) => {
                                    e.preventDefault();
                                    setInfoButton(true);
                                }
                                }
                                placeholder="Responda a idade e o nível de atividade física"
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
                                "& label.Mui-focused": {
                                    color: appConfig.theme.colors.neutrals[200],
                                  },
                                  "& .MuiFilledInput-underline:after": {
                                    borderBottomColor: appConfig.theme.colors.neutrals[200],
                                  },
                                }}

                            />

                            <ClassificationFa setOpenPopper={setOpenPopper}  />

                            <Box
                                sx={{
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
                            <DropdownFi fatorInjuria={fatorInjuria} setFatorInjuria={setFatorInjuria} condicaoClinica={condicaoClinica} setCondicaoClinica={setCondicaoClinica} 
                            level={level}  setLevel={setLevel} />
{/*                             <CheckboxFi/>
                            <SplitButton/> */}
                            </Box>
                            
                            <TextField
                                label="Fator de Injúria (padrão = 1)"
                                disabled={isDisabled}
                                type="number"
                                value={fatorInjuria}
                                variant="filled"
                                onChange={(e) => {  
                                    setFatorInjuria(fatorInjuria); 
                                }}
                                placeholder="Responda a condição clínica e a gravidade da injúria"
                                sx={{width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                                label: {fontWeight: 'bold'},
                                "& label.Mui-focused": {
                                    color: appConfig.theme.colors.neutrals[200],
                                  },
                                  "& .MuiFilledInput-underline:after": {
                                    borderBottomColor: appConfig.theme.colors.neutrals[200],
                                  },
                                }}
                            />

{/* A partir daqui são botões e depois os quadros(outputs) */}

                            {!isDisabled ?
                            <Button
                            variant="contained"
                            type='submit'
                            label='Enviar'
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleformSubmit();
                                }
                            }}
                            fullWidth
                            sx={{
                                width: '100%',
                                    border: '0',
                                    resize: 'none',
                                    borderRadius: '5px',
                                    padding: '6px 8px',
                                    marginRight: '12px',
                                    marginTop: '10px',
                                    contrastColor: appConfig.theme.colors.neutrals["000"],
                                    mainColor: appConfig.theme.colors.primary[500],
                                    color: appConfig.theme.colors.neutrals[100],
                                    backgroundColor: appConfig.theme.colors.primary[500],
                                    mainColorLight: appConfig.theme.colors.primary[400],
                                    mainColorStrong: appConfig.theme.colors.primary[600],
                                    mainColorHighlight: appConfig.theme.colors.primary[500],
                                    ":hover": {
                                      contrastColor: appConfig.theme.colors.neutrals["000"],
                                      mainColor: appConfig.theme.colors.primary[500],
                                      color: appConfig.theme.colors.neutrals[100],
                                      backgroundColor: appConfig.theme.colors.primary[600],
                                      mainColorLight: appConfig.theme.colors.primary[400],
                                      mainColorStrong: appConfig.theme.colors.primary[600],
                                    },
                                }}

                            >Enviar</Button>:
                            <><Button
                                variant="contained"
                                type='button'
                                label='Resetar'
                                fullWidth
                                onClick={() => {
                                    setIsDisabled(false);
                                    setOpenPopper(false);
                                    setShowImc(false);
                                    setShowEstimativa(false);
                                    setShowGeb(false);
                                    setShowPerdaDePeso(false);
                                    setShowNET(false);
                                    setShowPesoIdeal(false);
                                    setShowrCQ(false);
                                    setPesoAtual('');
                                    setPesoIdeal('');
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
                                    setFatorInjuria('');
                                    setCondicaoClinica('');
                                    setLevel('');
                                    setcC('');
                                    setcQ('');
                                    setrCQ('');
                                    setRadioFa('');
                                    setSexo('mulher');
                                    firstUpdate.current = true;
                                } }
                                sx={{
                                    width: '100%',
                                    border: '0',
                                    resize: 'none',
                                    borderRadius: '5px',
                                    padding: '6px 8px',
                                    marginRight: '12px',
                                    marginTop: '10px',
                                    contrastColor: appConfig.theme.colors.neutrals["000"],
                                    mainColor: appConfig.theme.colors.primary[500],
                                    color: appConfig.theme.colors.neutrals[100],
                                    backgroundColor: appConfig.theme.colors.primary[500],
                                    mainColorLight: appConfig.theme.colors.primary[400],
                                    mainColorStrong: appConfig.theme.colors.primary[600],
                                    mainColorHighlight: appConfig.theme.colors.primary[500],
                                    ":hover": {
                                      contrastColor: appConfig.theme.colors.neutrals["000"],
                                      mainColor: appConfig.theme.colors.primary[500],
                                      color: appConfig.theme.colors.neutrals[100],
                                      backgroundColor: appConfig.theme.colors.primary[600],
                                      mainColorLight: appConfig.theme.colors.primary[400],
                                      mainColorStrong: appConfig.theme.colors.primary[600],
                                    },
                                }}
                                  >Resetar</Button>
                                </>}

                                {isDisabled ?<>
                                <Box
                                    sx={{
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
                                        minHeight: '200px',
                                    }}
                                >
                                    <Results  imc={imc} geb={geb} net={nET} perdaDePeso={perdaDePeso} pesoIdeal={pesoIdeal} estimativaDePeso={estimativaDePeso} rCQ={rCQ}
                                    setShowEstimativa={setShowEstimativa} setShowGeb={setShowGeb} setShowPerdaDePeso={setShowPerdaDePeso} setShowPesoIdeal={setShowPesoIdeal}
                                    setShowNET={setShowNET} setShowImc={setShowImc} setShowrCQ={setShowrCQ} InterpretacaoDeAdequacaoDoPeso={InterpretacaoDeAdequacaoDoPeso}
                                    interpretacaoDoImc={interpretacaoDoImc}
                                    />
                                    
                                </Box>
                                </>:null}
                            
                        {showImc ? 
                        <Box
                            in={(imc!=='').toString()}
                            sx={{
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
                                <Box>
                                    {/* send props to APP */}
                                    <IMC pesoIdeal={pesoIdeal} peso={pesoAtual} altura={altura} imc={imc} />
                                </Box>
                        </Box>
                        :null}

                        {showPerdaDePeso?
                        <Box
                        sx={{
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
                            <Box>
                                {/* send props to APP */}
                                <PerdaDePeso pesoAtual={pesoAtual} pesohabitual={pesoHabitual} perdaDePeso={perdaDePeso} />
                            </Box>
                    </Box>
                    :null}
                    
                    {showEstimativa? 

                    <EstimativaDePeso sexo={sexo} CB={CB} CP={CP} DCSE={DCSE} AJ={AJ} estimativaDePeso={estimativaDePeso} />

                    :null}

                    {showGeb? 
                    <GEB sexo={sexo} pesoAtual={pesoAtual} altura={altura} idade={idade} geb={geb} /> 
                    :null} 
                    </Box>
                </Box>
            </Box>
        
    )
}

function Header() {
    return (
        <>
            <Box sx={{ width: '100%', marginBottom: '16px', marginRight:'10px', marginLeft:'10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Typography >
                    Metrics
                </Typography>
                <Button
                    variant='tertiary'
                    label='Logout'
                    href="/"
                    
                >Logout</Button>
            </Box>
        </>
    )
}
