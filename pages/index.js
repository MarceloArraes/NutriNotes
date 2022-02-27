import appConfig from '../config.json';
import { Box, Button, Text, TextField, Image } from '@skynexui/components';
//import Image from 'next/image';
import React,{ useState, createContext, useContext } from 'react';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';
import sampleImage from '../public/download.jpg';

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
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.primary[100],
          backgroundImage: 'url(/fundo.png)',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        }}
      >
        <Box
          styleSheet={{
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
            onSubmit={(e) => {
              e.preventDefault();
              // Aqui vou usar para capturar o email do usuário e enviar para o banco de dados;
              insertEmailonDatabase();
              roteamento.push(`/metrics?email=${username}`);

            }}
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
            }}
          >
            <Titulo tag="h2">Boas vindas!</Titulo>
            <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
              {appConfig.name}
            </Text>

            <TextField
              placeholder="Digite seu email"
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.primary[500],
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                },
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

            <Button
              type='submit'
              label='Entrar'
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
            />
          </Box>  
          {/* Formulário */}
          

          {/* Photo Area */}
          <Box
            styleSheet={{
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
            }}
          >
            <Image
              styleSheet={{
                borderRadius: '50%',
                marginBottom: '16px',
              }}
              src={'/ícone.png'}
              alt="Icon"
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: '3px 10px',
                borderRadius: '1000px'
              }}
            >
              {username}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}