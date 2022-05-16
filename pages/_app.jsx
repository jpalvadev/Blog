import '../styles/globals.css';
import '../styles/pixel-borders.css';

// import '../styles/globals.scss';
import Layout from '../components/Layout';
import { MemoizedCloud } from '@/components/Cloud';

// import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  // const handleEventListeners = () => {
  //   console.log('hi');
  //   window.removeEventListener('click', handleEventListeners);
  //   window.removeEventListener('scroll', handleEventListeners);
  //   window.removeEventListener('keydown', handleEventListeners);
  // };

  // useEffect(() => {
  //   window.addEventListener('click', handleEventListeners);
  //   window.addEventListener('scroll', handleEventListeners);
  //   window.addEventListener('keydown', handleEventListeners);
  // }, []);

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
