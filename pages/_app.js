import React,{useEffect} from "react";
import { CacheProvider } from '@emotion/react';
import Head from 'next/head';
import { ThemeProvider} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import createEmotionCache from '../utility/createEmotionCache';
import lightTheme from '../styles/theme/lightTheme';
import theme from '../styles/theme/theme.js';

const clientSideEmotionCache = createEmotionCache();

export default function MyApp({ Component, emotionCache = clientSideEmotionCache, pageProps}) {
  console.log('Roda em todas as páginas');

   useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, []) 


  return ( 
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
    <GlobalStyle />
    <CssBaseline />
    <Component {...pageProps} />
    </ThemeProvider>
    </CacheProvider>
  );
}

//        border: 1px solid red;
function GlobalStyle() {
  return (
    <style global jsx>{`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
      }
      body {
        font-family: 'Open Sans', sans-serif;
      }
      /* App fit Height */ 
      html, body, #__next {
        min-height: 100vh;
        display: flex;
        flex: 1;
      }
      #__next {
        flex: 1;
      }
      #__next > * {
        flex: 1;
      }
      /* ./App fit Height */ 
    `}</style>
  );
}
