import { Box, Text, TextField, Image, Button, Icon } from '@skynexui/components';
//import {Box} from '@material-ui/core';
import React,{useEffect} from 'react';
import appConfig from '../config.json';
//import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/router'


export default function MetricsPage() {
    const roteamento = useRouter();
    const [message, setMessage] = React.useState('');
    const [pesoAtual, setPesoAtual] = React.useState('');
    const [altura, setAltura] = React.useState('');
    const [imc, setImc] = React.useState('');
    const username = roteamento.query.email;
    const [messages, setMessages] = React.useState([]);
    
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
                            console.log("Fazer conta do IMC");
                            console.log("Peso: ", pesoAtual);
                            console.log("Altura: ", altura);
                            // Aqui vou usar para capturar o email do usuário e enviar para o banco de dados;
                            if(altura > 2){
                                let alturaemmetros = altura /100;
                                let imc = pesoAtual / (alturaemmetros * alturaemmetros);
                                setImc(imc);
                            }else{
                            
                            let localimc = pesoAtual/(altura * altura);

                            setImc(localimc);
                        }
                          }}
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: 'column',
                            crossAxisCount : {
                                xl : 2,
                                lg : 2,
                                md : 1,
                                sm : 1,
                                xs : 1,
                                }
                            
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
                        {/* <TextField
                            placeholder="Insira sua mensagem aqui..."
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
                            }}
                            value={message}

                            onKeyPress={(e) => {
                                handleMessageInput(e);
                            }
                          }
                            onChange={(e) => {
                            setMessage(e.target.value);
                            }
                            }
                        /> */}
                        <TextField
                            label="Peso Atual (Kg)"
                            onChange={(e) => {  

                                setPesoAtual(e.target.value); 
                            
                            } }
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
                        />
                    </Box>
                    {imc ? 
                    <Box
                    styleSheet={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 1,
                        
                    }}
                    >
                        
                        <Text>
                            IMC: {imc}
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

