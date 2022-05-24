import '../styles/globals.css';
import '../styles/pixel-borders.css';

// import '../styles/globals.scss';
import Layout from '../components/Layout';
import { MemoizedCloud } from '@/components/Cloud';
import { AppProvider } from 'context/appContext';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AppProvider>
        <Layout>
          <MemoizedCloud cloudsNumber={10} />
          <Component {...pageProps} />
        </Layout>
      </AppProvider>
    </>
  );
}

export default MyApp;
