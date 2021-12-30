import type { AppProps } from 'next/app'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const GlobalStyle = (
  <style jsx>{`
    :global(body) {
      margin: 0;
    }
  `}</style>
);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      {GlobalStyle}
    </>
  )
}

export default MyApp
