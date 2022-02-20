import { Box, Text, TextField, Image, Button, Icon } from '@skynexui/components';
import React,{useEffect} from 'react';
import appConfig from '../config.json';
//import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/router'


export default function MetricsPage() {
    const roteamento = useRouter();
    const [message, setMessage] = React.useState('');
    const [pesoAtual, setPesoAtual] = React.useState(undefined);
    const [altura, setAltura] = React.useState(undefined);
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
                            styleSheet={{
                                backgroundColor: appConfig.theme.colors.primary[900],
                                border: '0',
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
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                            crossAxisCount : {
                                xs : 3
                                }
                        }}
                    >
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
                            label="Peso Atual"
                            onChange={(e) => {  setPesoAtual(e.target.value); } }
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
                            value={pesoAtual}
                            variant="bottomBorder"
                        />
                        <TextField
                            label="Altura"
                            onChange={(e) => {  setAltura(e.target.value); } }
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
                        buttonColors={{
                            contrastColor: appConfig.theme.colors.neutrals["000"],
                            mainColor: appConfig.theme.colors.primary[500],
                            mainColorLight: appConfig.theme.colors.primary[400],
                            mainColorStrong: appConfig.theme.colors.primary[600],
                        }}
                        />

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

