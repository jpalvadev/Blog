// The head tag is the HTML head => like title, description, meta, etc
import Head from 'next/head';
import { SKY_COLOR } from '../config';
// import Cloud from './Cloud';
// import { MemoizedCloud } from './Cloud';
import Header from './Header';
import Search from './Search';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Footer from './Footer';
import { useAppContext } from 'context/appContext';
import PixelBorder from './PixelBorder';
import styles from '../styles/PixelBorder.module.css';

// children prop: anything that will be inside the Layout component is the children prop
export default function Layout({ title, keywords, description, children }) {
  const {
    setShowSearch,
    setShowCategoryList,
    setShowPlayer,
    showTitle,
    setShowTitle,
    titleString,
    setTitletring,
    showBackground,
    setShowBackground,
    backgroundString,
    setBackgroundString,
  } = useAppContext();

  // Detect URL changes to hide search, categoryList and musicPLayer
  const router = useRouter();
  console.log(titleString);

  useEffect(() => {
    const onHashChangeStart = (url) => {
      setShowPlayer(false);
      setShowCategoryList(false);
      setShowSearch(false);
    };

    router.events.on('routeChangeStart', onHashChangeStart);

    return () => {
      router.events.off('routeChangeStart', onHashChangeStart);
    };
  }, [router.events]);

  return (
    <div
      // style={{ backgroundColor: SKY_COLOR }}
      className="mt-24 bg-background-1000 bbg-clouds bbg-slate-500 mmin-h-screen hh-[200vh] pb-4"
    >
      {/* <Cloud cloudsNumber={10} /> */}
      {/* <Cloud cloudsNumber={20} /> */}
      <Head>
        <title>{title}</title>
        <meta name="keywords" content={keywords} />
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <MemoizedCloud cloudsNumber={10} /> */}

      {/* {showSearch && <Search />} */}
      <Header />
      <div className="fixed top-[15.7rem] w-full px-6 flex justify-center z-50">
        {showTitle && (
          <motion.a
            layoutId={titleString}
            className="text-2xl font-arcade text-center text-primary-250 z-20"
          >
            {titleString}
          </motion.a>
        )}
      </div>

      <div className="fixed top-[11rem] w-full flex justify-center z-10">
        {showBackground && (
          <motion.div
            layoutId={backgroundString}
            className={`w-full h-screen bg-white max-w-[116ch] ${styles.pixelWrapper} ${styles.pixelBorder2}`}
          ></motion.div>
        )}
      </div>

      {/* <Search showSearch={showSearch} /> */}

      {/* <Cloud cloudsNumber={20} /> */}
      {/* <motion.div animate={{ y: showSearch ? 200 : 0 }}> */}
      <main className="container mx-auto my-7 mb-0">{children}</main>
      {/* </motion.div> */}
      {/* <Footer /> */}
    </div>
  );
}

// Vamos a setear los defaults, que quiere decir que si no estamos pasando los props, estos tomen un valor por defecto
Layout.defaultProps = {
  title: 'Bienvenidos a mi Blog',
  keywords: 'development, coding, programming',
  description: 'La mejor información y noticias en el mundo del desarrollo',
};
