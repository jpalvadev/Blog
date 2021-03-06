// ESTA ES NUESTRA PAGINA PRINCIPAL, cuando vamos a por ej: localhost:3000

// Para que no de error importar un modulo server-side en el client-side, debemos usarlo en una función server-side
// En este caso, debemos usar fs en getStaticProps()

import Layout from '@/components/Layout';
import Link from 'next/link';
import Post from '@/components/Post';
import { getPosts } from '@/lib/posts';
import Cloud from '@/components/Cloud';
import { motion } from 'framer-motion';
import { useState } from 'react';

// PRESTAR ESPECIAL ATENCION ACA. El prop posts que estamos pasando como argumento lo traemos desde GetStaticProps(). Desde este mismo archivo!
export default function HomePage({ posts }) {
  // const [showTitle, setShowTitle] = useState(false);
  // const [title, setTitle] = useState(false);

  return (
    // <Layout>
    <>
      {/* {showTitle && (
        <motion.h1
          layoutId={title}
          className="fixed lleft-1/2 -translate-x-1/2 top-48 text-2xl ttext-center mb-7 font-arcade text-primary-250 z-20"
        >
          {title}
        </motion.h1>
      )} */}

      {/* <Cloud cloudsNumber={10} /> */}
      {/* Titulo */}
      <h1 className="text-2xl md:text-3xl bborder-b-4 p-5 font-bold font-arcade text-center mb-4">
        Latest Posts
      </h1>

      {/* Map de los posts para crear cada CARD */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 max-w-[116ch] mx-auto">
        {posts.map((post, index) => (
          <Post
            key={index}
            post={post}
            // setShow={setShow}
            // show={show}
            // setTitle={setTitle}
            // title={title}
          />
        ))}
      </div>

      {/* Boton de All Posts */}
      {/* <Link href="/blog">
        <a className="block text-center border border-gray-500 text-gray-800 rounded-md py-4 my-5 transition duration-500 ease select-none hover:text-white hover:bg-gray-900 focus:outline-none focus:shadow-outline w-full">
        All Posts
        </a>
      </Link> */}
    </>
    // </Layout>
  );
}

// method for fetching data
// What we are going to do is fetch data from a file
// Para hacerlo necesitamos importar el module "fs" , que es un módulo de Node
export async function getStaticProps() {
  return {
    props: {
      // posts es el objeto que tiene el slug, y el frontmatter
      posts: getPosts().slice(0, 6), // mostramos 6 posts nomás
    },
  };
}
