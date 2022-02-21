import { Box, Text, TextField, Image, Button, Icon } from '@skynexui/components';
//import {Box} from '@material-ui/core';
import React,{useEffect, useState, useRef} from 'react';
import appConfig from '../config.json';

import { useRouter } from 'next/router'
import { MathJaxContext, MathJax } from 'better-react-mathjax';

//         \\`frac(25x)(10) = 2^(10)\\`
//         \\(\\frac{25x}{10} = 2^{10}\\)
function IMC(props) {
    console.log(props);
    
    return (
        <MathJaxContext>
              <h2>Formula para Calculo do IMC</h2>
              <Box 
                styleSheet={{
                    gap: '16px',
                    padding: '16px',
                    margin: '16px',
                    borderRadius: '5px',
                }}
              >
            <Text styleSheet={{padding: '5px',
                    margin: '5px',
                    borderRadius: '5px',}} >
            
            <MathJax>{"\\(\\frac{peso}{altura^2} \\approx IMC\\)"}</MathJax>
            </Text>
            <Text styleSheet={{padding: '5px',
                    margin: '5px',
                    borderRadius: '5px',}}
            >
            <MathJax>{`\\(\\frac{${props.peso}}{${(props.altura*props.altura).toFixed(2)}} \\approx {${(props.imc).toFixed(2)}}\\)`}</MathJax>
            </Text>
            </Box>
        </MathJaxContext>
    );
  }




export default function MetricsPage() {
    const roteamento = useRouter();
    const [message, setMessage] = useState('');
    const [pesoAtual, setPesoAtual] = useState('');
    const [altura, setAltura] = useState('');
    const [imc, setImc] = useState('');
    const username = roteamento.query.email;
    const [messages, setMessages] = useState([]);
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
    }, [imc]);


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
                display: 'flex', alignItems: 'center', justifyContent: 'center',
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
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
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
                            if(pesoAtual.trim().length > 0 && altura.trim().length > 0) {
                            console.log("Fazer conta do IMC");
                            console.log("Peso: ", pesoAtual);
                            console.log("Altura: ", altura);
                                if(altura > 2){
                                    let alturaemmetros = altura /100;
                                    setAltura(alturaemmetros);
                                    let imc = pesoAtual / (alturaemmetros * alturaemmetros);
                                    setImc(imc);
                                }else{
                                
                                let localimc = pesoAtual/(altura * altura);

                                setImc(localimc);
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
                        {!imc?
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
                        <Button
                        type='button'
                        label='Resetar'
                        fullWidth
                        onClick={() => {
                            setPesoAtual('');
                            setAltura('');
                            setImc('');
                            setIsDisabled(false);
                            firstUpdate.current = true;
                        }}
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
                        />}
                    </Box>
                    {imc ? 
                    <Box
                        styleSheet={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        alignItems: 'center',
                        /* maxWidth: '200px', */
                        padding: '16px',
                        backgroundColor: appConfig.theme.colors.neutrals[800],
                        border: '1px solid',
                        borderColor: appConfig.theme.colors.neutrals[999],
                        borderRadius: '10px',
                        flex: 1,
                        minHeight: '240px',
                        }}
                    >
                            <Text>
                                IMC: {imc.toFixed(2)}
                                {/* send props to APP */}
                                <IMC peso={pesoAtual} altura={altura} imc={imc} />
                            </Text>
                    </Box>
                    :null}
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

