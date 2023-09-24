import '../styles/globals.css'

import type { AppProps } from 'next/app'
import { SessionProvider, useSession } from "next-auth/react";
import { ThemeProvider } from '../src/context/ThemeContext'
import NextNProgress from 'nextjs-progressbar';
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {

  return (
    <SessionProvider session={session}>
      <ThemeProvider>
        <ToastContainer theme="colored" />
        <NextNProgress options={{ easing: "ease", speed: 500, showSpinner: false }} />
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  )
}

export default MyApp