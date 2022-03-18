import appConfig from '../config.json';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
//import Image from 'next/image';
import React,{ useState, createContext, useContext } from 'react';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';

//Aqui vou usar para capturar o email do usuário e enviar para o banco de dados;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SUPABASE_URL =  process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabase_client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


function Titulo(props) {
  const Tag = props.tag || 'h1';
  return (
  <>
  <Tag>{props.children}</Tag>
  <style jsx>{`
      ${Tag} {
        color: ${appConfig.theme.colors.neutrals['500']};
      }
    `}</style>
  </>
  )
}

export default function PaginaInicial() {
  const roteamento = useRouter();
  const [username, setUsername] = useState('Seu Email');

  function insertEmailonDatabase(){
    console.log('para inserir no banco de dados');
    const registeremail ={
      /* id: Math.random(),  */
      email: username, 
    }
    supabase_client
    .from('emails').insert(
        [registeremail])
    .then(result => {
        console.log(result);
        //setMessages([...messages, result.data[0]]);
    });

  }


  return (
    <>
      <Box
        sx={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.primary[100],
          backgroundImage: 'url(/background.png)',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%', maxWidth: '700px',
            borderRadius: '5px', padding: '32px', margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.neutrals[700],
          }}
        >
          {/* Formulário  width: { xs: '100%', sm: '50%' }*/}
          <Box
            as="form"
            //component="form"
            noValidate 
            onSubmit={
              (e) => {
              e.preventDefault();
              // Aqui vou usar para capturar o email do usuário e enviar para o banco de dados;
              insertEmailonDatabase();
              roteamento.push(`/metrics?email=${username}`);
            }}
            sx={{
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, 
              textAlign: 'center', 
              marginBottom: '32px',
            }}
          >
            <Titulo tag="h2">Boas vindas!</Titulo>
            <Typography variant="body2" sx={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
              {appConfig.name}
            </Typography>

            <TextField
              placeholder="Digite seu email"
              fullWidth
              autoFocus
              required
              autoComplete="email"
              variant='outlined'
              type="email"
              size="small"
              sx={{
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.primary[500],
                //color:appConfig.theme.colors.neutrals[200],
                textColor: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[800],
                borderColor: appConfig.theme.colors.neutrals[999],
              }}
              onChange={ 
                (e) => {
                if(e.target.value.length > 2){
                setUsername(e.target.value)
                }
                else{
                  setUsername('Seu Email')
                }
              }
              }
              />
            <Button variant="contained" 
            fullWidth 
            type='submit'
            sx={{
              margin: '18px',
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
              
            }}>
              Entrar
            </Button> 
          </Box>  
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              backgroundColor: appConfig.theme.colors.neutrals[800],
              border: '1px solid',
              borderColor: appConfig.theme.colors.neutrals[999],
              borderRadius: '10px',
              flex: 1,
              minHeight: '240px',
              overflow: 'hidden',
            }}
          >
            <Avatar alt="Icon" src="/Icon2.png" 
            sx={{
                borderRadius: '50%',
                marginBottom: '16px',
                width: '90%',
                height: 'auto',
                }} />
            <Typography
              variant="body2"
              sx={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: '3px 10px',
                borderRadius: '1000px',
                wordBreak: 'break-word',

              }}
            >
              {username}
            </Typography>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}