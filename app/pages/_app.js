
import { MoralisProvider } from 'react-moralis'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (

    <MoralisProvider
      apiKey="process.env.NEXT_PUBLIC_MORALIS_APP_ID"
      apiSecret="process.env.NEXT_PUBLIC_MORALIS_SERVER_URL"
      >
        <Component {...pageProps} />
      </MoralisProvider>
  )
}

export default MyApp
