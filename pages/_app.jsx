import '../styles/globals.css';
import '../styles/pixel-borders.css';

// import '../styles/globals.scss';
import Layout from '../components/Layout';
import { MemoizedCloud } from '@/components/Cloud';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Layout>
        <MemoizedCloud cloudsNumber={10} />
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
