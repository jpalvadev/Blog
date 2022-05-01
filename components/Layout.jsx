// The head tag is the HTML head => like title, description, meta, etc
import Head from 'next/head';
import { SKY_COLOR } from '../config';
import Cloud from './Cloud';
import Header from './Header';
import Search from './Search';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Footer from './Footer';

// children prop: anything that will be inside the Layout component is the children prop
export default function Layout({ title, keywords, description, children }) {
  const [showSearch, setShowSearch] = useState(false);

  // console.log(children);

  return (
    <div
      // style={{ backgroundColor: SKY_COLOR }}
      className="bg-background-1000 bbg-clouds bbg-slate-500 min-h-screen"
    >
      {/* <Cloud cloudsNumber={10} /> */}
      {/* <Cloud cloudsNumber={20} /> */}
      <Head>
        <title>{title}</title>
        <meta name="keywords" content={keywords} />
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* {showSearch && <Search />} */}
      <Header showSearch={showSearch} setShowSearch={setShowSearch} />
      <iframe
        width="100%"
        height="300"
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/868565504&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
      ></iframe>
      {/* <Search showSearch={showSearch} /> */}

      {/* <Cloud cloudsNumber={20} /> */}
      {/* <motion.div animate={{ y: showSearch ? 200 : 0 }}> */}
      <main className="container mx-auto my-7">{children}</main>
      {/* </motion.div> */}
      <Footer />
    </div>
  );
}

// Vamos a setear los defaults, que quiere decir que si no estamos pasando los props, estos tomen un valor por defecto
Layout.defaultProps = {
  title: 'Bienvenidos a mi Blog',
  keywords: 'development, coding, programming',
  description: 'La mejor información y noticias en el mundo del desarrollo',
};
