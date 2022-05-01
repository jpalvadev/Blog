import '../styles/globals.css';
import '../styles/pixel-borders.css';

import '../styles/globals.scss';
import Layout from '../components/Layout';
import Cloud from '@/components/Cloud';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Layout>
        <Cloud cloudsNumber={10} />
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
