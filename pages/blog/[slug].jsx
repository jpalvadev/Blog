// Este es el SLUG - Acá vemos el contenido de cada post

import Head from 'next/head';

import { useState, useEffect, useLayoutEffect, useRef } from 'react';

import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import matter from 'gray-matter';
import Layout from '@/components/Layout';
import CategoryLabel from '@/components/CategoryLabel';
import { marked } from 'marked';
import PixelBorder from '@/components/PixelBorder';
import GoBackBtn from '@/components/GoBackBtn';
import Image from 'next/image';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
const readingTime = require('reading-time');

// PRESTAR ATENCIÓN QUE LOS ARGUMENTOS LOS obtenemos del return de getStaticProps, EN ESTE MISMO ARCHIVO!
export default function PostPage({
  frontmatter: {
    title,
    keywords,
    description,
    category,
    date,
    cover_image,
    author,
    author_image,
  },
  content,
  slug,
}) {
  const articleContainer = useRef();
  const { scrollYProgress } = useViewportScroll();
  const [marioReversed, setMarioReversed] = useState(false);
  const [marioPaused, setMarioPaused] = useState(true);
  const [marioPos, setmarioPos] = useState(0);

  useEffect(() => {
    scrollYProgress.onChange((v) => {
      // scrollYProgress.current & scrollYProgress.prev value can be over 1, don't know why, fixed
      v = v >= 1 ? 1 : v;
      const prevPosition =
        scrollYProgress.prev < 1 ? scrollYProgress.prev : 0.999;

      // we set a width minus some number to avoid mario overflowing the container
      const containerWidth = articleContainer.current?.offsetWidth - 56;
      const marioCurrentPos = containerWidth * v;

      // mario walks when onChange is called, set his position and check for reversed
      setMarioPaused(false);
      setmarioPos(marioCurrentPos);
      setMarioReversed(v > prevPosition ? false : true);
    });

    // timeout to keep playing the walking animation for some time after page scrolling stops
    const myTimeout = setTimeout(marioSteps, 250);
    function marioSteps() {
      setMarioPaused(true);
    }

    // I clear the timeout to avoid firing multiple timeouts
    return () => {
      clearTimeout(myTimeout);
    };
  }, [scrollYProgress.current, articleContainer?.current?.offsetWidth]);

  // ESTE ANDA!!!
  // useEffect(() => {
  //   scrollYProgress.onChange((v) => {
  //     let marioOffSet = articleContainer?.current?.offsetWidth > 450 ? 66 : 62;
  //     setMarioPaused(false);
  //     setmarioPos((articleContainer?.current?.offsetWidth - marioOffSet) * v);
  //     setMarioReversed(v > scrollYProgress.prev ? false : true);
  //   });
  //   const myTimeout = setTimeout(marioSteps, 250);
  //   function marioSteps() {
  //     setMarioPaused(true);
  //     console.log('paused');
  //   }
  //   return () => {
  //     clearTimeout(myTimeout);
  //   };
  // }, [scrollYProgress.current]);

  return (
    // <Layout title={title}>
    <div ref={articleContainer} className="mx-auto max-w-[120ch]">
      <Head>
        <title>{title}</title>
        <meta name="keywords" content={keywords} />
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <GoBackBtn />

      {/* <PixelBorder classNames={'mx-3'}>
        <Link href="/blog">
          <a className="block font-arcade py-4 text-center">Go Back</a>
        </Link>
      </PixelBorder> */}

      {/* Post text */}

      <PixelBorder bgBottomColor="#0eb148" rounded classNames={'mx-4 my-6'}>
        {/* Read time */}
        <p>Lectura: {parseInt(readingTime(content).text)} min</p>

        <div className="w-full px-2 md:px-6 lg:px-10 py-6 mt-6 mb-6">
          {/* Title and category label */}

          <h1 className="text-2xl text-center mb-7 font-arcade text-primary-250 border-b-2 pb-4">
            {title}
          </h1>
          {/* <CategoryLabel>{category}</CategoryLabel> */}

          {/* Post main Image */}
          {/* <img src={cover_image} alt={title} className="w-full rounded" /> */}

          {/* Author, author image and date */}
          {/* <div className="flex justify-between items-center bg-gray-100 P-2 my-8">
          <div className="flex items-center">
          <img
          className="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block"
          src={author_image}
          alt="author image"
          />
          <h4>{author}</h4>
          </div>
          <div className="mr-4">{date}</div>
        </div> */}

          {/* Cuerpo del Post */}
          <div className="blog-text text-sm md:text-base lg:text-lg my-2">
            <div
              className="mx-auto max-w-[80ch]"
              dangerouslySetInnerHTML={{ __html: marked(content) }}
            ></div>
          </div>
        </div>

        {/* Mario GIF */}
        <motion.div
          style={{ translateX: -4 }}
          // style={{ translateX: yRange }}
          initial={{ y: 7 }}
          animate={{
            x: marioPos,
            scaleX: marioReversed ? -1 : 1,
          }}
          // transition={{
          //   type: 'spring',
          // damping: 300,
          // mass: 1.25,
          // stiffness: 50,
          // }}
          // animate={{
          //   x:
          //     articleContainer.current &&
          //     (articleContainer.current.offsetWidth - 48) *
          //       (yRange.current / 100) -
          //       12,
          // }}
          // transition={{ ease: 'easeInOut' }}
          className="sticky bottom-0 w-max"
        >
          {marioPaused ? (
            <Image
              src="/images/mario-paused.png"
              alt="mario standing"
              className="absolute inset-0 z-10"
              width={32}
              height={38}
            />
          ) : (
            <Image
              src="/images/mario.gif"
              alt="walking mario gif"
              className=""
              width={32}
              height={38}
            />
          )}
        </motion.div>
      </PixelBorder>
      {/* </Layout> */}

      <GoBackBtn />
    </div>
  );
}

// Generate the paths. Esto va a ser responsable de generar los paths a los artículos. Por ej http://localhost:3000/blog/writing-great-unit-tests
export async function getStaticPaths() {
  // Obtenemos los nombres de los archivos y los ponemos en un array
  const files = fs.readdirSync(path.join('posts'));

  // Prestar atención que de este map estamos haciendo un return de un objeto llamado params
  // la variable paths será un array con varios objetos dentro, por ej:  { params: { slug: 'python-book-review' } }
  const paths = files.map((filename) => ({
    params: {
      // creamos el slug a partir del nombre del post, y le sacamos la extension .md
      slug: filename.replace('.md', ''),
    },
  }));

  // vamos a hacer un return de los paths a los posts
  return {
    paths,
    fallback: false, // If fallback is false, then any paths not returned by getStaticPaths will result in a 404 page.
  };
}

// Y esta función es la encargada de obtener el post en si
// Obtenemos el slug de params
export async function getStaticProps({ params: { slug } }) {
  const markDownWithMeta = fs.readFileSync(
    path.join('posts', slug + '.md'),
    'utf-8'
  );

  const { data: frontmatter, content } = matter(markDownWithMeta);

  return {
    props: {
      frontmatter,
      content,
      slug,
    },
  };
}

// Vamos a setear los defaults, que quiere decir que si no estamos pasando los props, estos tomen un valor por defecto
Layout.defaultProps = {
  title: 'Bienvenidos a mi Blog',
  keywords: 'development, coding, programming',
  description: 'La mejor información y noticias en el mundo del desarrollo',
};
