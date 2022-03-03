import { Box, Text, TextField, Image, Button, Icon } from '@skynexui/components';
import {Collapse} from '@material-ui/core';
import React,{useEffect, useState, useRef} from 'react';

import IMC from '../components/imc.js';
import GEB from '../components/geb.js';
import EstimativaDePeso from '../components/estimativaDePeso.js';
import PerdaDePeso from '../components/perdaDePeso.js';
import RadioSexo from '../components/radioSexo.js';
import Results from '../components/results.js';
import RadioButtomFa from '../components/radioButtomFa.js';

import ClassificationFa from '../components/classificationFa.js';

import appConfig from '../config.json';

import { useRouter } from 'next/router'

import Popper from '@mui/material/Popper';
import ClickAwayListener from '@mui/material/ClickAwayListener';

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

    //GEB
    const [idade, setIdade] = useState(''); ///INPUT
    const [nome, setNome] = useState(''); ///INPUT
    const [geb, setGeb] = useState('');   ///RESULTADO
    const [showGeb, setShowGeb] = useState(false); ///RESULTADO
    
    //Necessidade Energética Total - NET
    const [Fa, setFa] = useState(''); ///INPUT
    const [radioFa, setRadioFa] = useState(''); ///INPUT
    const [Fi, setFi] = useState(''); ///INPUT
    const [NET, setNET] = useState(''); ///RESULTADO
    const [showNET, setShowNET] = useState(false); ///RESULTADO

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
        
        if(Fi==''){
            setFi(1);
            var localFi = 1;
        }else{
            var localFi = Fi;
        }

        //IMC
        if(pesoAtual.length > 0 && altura.length > 0 && idade.length>0) {
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
                    localPesoIdeal = (alturaemmetros * alturaemmetros) * idealImc;
                    console.log("Peso Ideal1: ", localPesoIdeal);
                    setImc(imc);
                    setPesoIdeal(localPesoIdeal);
            }else{
                    let imc = pesoAtual/(altura * altura);
                    localPesoIdeal = (altura * altura) * idealImc;
                    console.log("Peso Ideal2: ", localPesoIdeal);
                    setImc(imc);
                    setPesoIdeal(localPesoIdeal);
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
                
                if((pesoAtual * 100)/localPesoIdeal >= 95 && (pesoAtual * 100)/localPesoIdeal <= 115){
                    pesoAtualLocal = pesoAtual;
                }else{
                    pesoAtualLocal = (pesoAtual - localPesoIdeal) * 0.25 + localPesoIdeal;
                }

                var alturaemcentimetros = altura
                if(altura<3){
                    alturaemcentimetros = altura * 100;
                }

                if(sexo==="homem"){
                let geb = 66.47 + (13.75*pesoAtualLocal) + (5*alturaemcentimetros) - (6.76*idade);
                setGeb(geb);
                localGeb = geb;
                }else{
                let geb = 655.1 + (9.56*pesoAtualLocal) + (1.85*alturaemcentimetros) - (4.68*idade);
                setGeb(geb);
                localGeb = geb;
            }
        }
        //NET - Necessidade Energética Total
        if(Fa.length>0 && localFi.length>0 && localGeb>0){
                console.log("Fazer conta do NET");
                console.log("Fa: ", Fa);
                console.log("Fi: ", Fi);
                let net = localGeb*(Fa * Fi)
                setNET(net);
            }
    }

    const handleClickAway = () => {
        setOpenPopper(false);
      };

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
                                alignItems: 'left',
                                flexDirection: 'column',
                                /* flexWrap: 'wrap', */
                                flex: 1,
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
                            <Text styleSheet={{
                                    width: '100%',
                                    border: '0',
                                    resize: 'none',
                                    //borderRadius: '5px',
                                    //padding: '6px 8px',
                                    marginRight: '12px',
                                    color: appConfig.theme.colors.neutrals[200],
                                }}
                            >Nível de Atividade física: </Text>
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
                            <RadioButtomFa setRadioFa={setRadioFa} />
                            </Box>
                            <TextField
                                label="FA - Fator de Atividade"
                                disabled={isDisabled}
                                onChange={(e) => {
                                    setFa(Fa); 
                                }}
                                onMouseOver={(e) => {
                                    e.preventDefault();
                                    setInfoButton(true);
                                }
                                }
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
                                event.preventDefault();
                                setAnchorEl(anchorEl ? null : event.currentTarget);
                                if(Boolean(anchorEl)){
                                    setOpenPopper(false);
                                }else setOpenPopper(true);
                                
                            }}
                            styleSheet={{
                                width: '50%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                /* marginRight: '12px', */
                                marginBottom: '9px',
                                }}
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary[500],
                                mainColorLight: appConfig.theme.colors.primary[400],
                                mainColorStrong: appConfig.theme.colors.primary[600],
                            }}
                            />
                            
                            <Popper  disablePortal={false} open={openPopper} anchorEl={anchorEl} placement={'bottom-start'}
                            modifiers={[
                                {
                                  name: 'flip',
                                  enabled: true,
                                  options: {
                                    altBoundary: true,
                                    rootBoundary: 'document',
                                    padding: 8,
                                  },
                                },
                                {
                                  name: 'preventOverflow',
                                  enabled: true,
                                  options: {
                                    altAxis: true,
                                    altBoundary: true,
                                    tether: true,
                                    rootBoundary: 'document',
                                    padding: 8,
                                  },
                                },
                                
                              ]}
                            >
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
                            ><ClickAwayListener onClickAway={handleClickAway}>
                                    <Text>
                                        <ClassificationFa  />
                                    </Text>
                            </ClickAwayListener>
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


                            {!imc && !perdaDePeso && !estimativaDePeso && !geb && !NET && !pesoIdeal ?
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
                                    
                                    setIsDisabled(false);
                                    setOpenPopper(false);
                                    setShowImc(false);
                                    setShowEstimativa(false);
                                    setShowGeb(false);
                                    setShowPerdaDePeso(false);
                                    setShowNET(false);
                                    setShowPesoIdeal(false);
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
                                    setFi('');
                                    setSexo('mulher');
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
                                }} />
                                </>}

                                {isDisabled ?<>
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
                                    <Results  imc={imc} geb={geb} net={NET} perdaDePeso={perdaDePeso} pesoIdeal={pesoIdeal} estimativaDePeso={estimativaDePeso}
                                    setShowEstimativa={setShowEstimativa} setShowGeb={setShowGeb} setShowPerdaDePeso={setShowPerdaDePeso} setShowPesoIdeal={setShowPesoIdeal}
                                    setShowNET={setShowNET} setShowImc={setShowImc}
                                    />
                                </Box>
                                </>:null}
                            
                        {showImc ? 
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
                                    <IMC pesoIdeal={pesoIdeal} peso={pesoAtual} altura={altura} imc={imc} />
                                </Text>
                        </Box>
                        :null}

                        {showPerdaDePeso?
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
                    
                    {showEstimativa? 
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

                    {showGeb? 
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

