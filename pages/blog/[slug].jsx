// Este es el SLUG - Acá vemos el contenido de cada post

import Head from 'next/head';

import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import matter from 'gray-matter';
import Layout from '@/components/Layout';
import CategoryLabel from '@/components/CategoryLabel';
import { marked } from 'marked';

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
  return (
    // <Layout title={title}>
    <>
      <Head>
        <title>{title}</title>
        <meta name="keywords" content={keywords} />
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Link href="/blog">
        <a>Go Back</a>
      </Link>

      {/* Post text */}
      <div className="w-full px-10 py-6 bbg-white rounded-lg shadow-md mt-6">
        {/* Title and category label */}
        <div className="flex justify-between items-center mt-4">
          <h1 className="text-5xl mb-7">{title}</h1>
          <CategoryLabel>{category}</CategoryLabel>
        </div>

        <img src={cover_image} alt={title} className="w-full rounded" />

        {/* Author, author image and date */}
        <div className="flex justify-between items-center bg-gray-100 P-2 my-8">
          <div className="flex items-center">
            <img
              className="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block"
              src={author_image}
              alt="author image"
            />
            <h4>{author}</h4>
          </div>
          <div className="mr-4">{date}</div>
        </div>
        <div className="blog-text mt-2">
          <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
        </div>
      </div>
      {/* </Layout> */}
    </>
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
