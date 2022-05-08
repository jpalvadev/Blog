import Layout from '@/components/Layout';
import Head from 'next/head';

export default function AboutPage(keywords, description) {
  return (
    <>
      <Head>
        <title>Sobre Mi Blog</title>
        <meta name="keywords" content={keywords} />
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-5xl border-b-4 pb-5 font-bold">About</h1>

      <div className="bg-white shadow-md rounded-lg px-10 py-6 mt-6">
        <h3 className="text-2xl-mb-5">Juan Pablo Alvarez Blog</h3>
        <p className="mb-3">
          Este es un blog hecho con Next.js - GrayMatter - Framer Motion -
          Tailwind
        </p>
        <span className="font-bold">Version: 1.0.0</span>
      </div>
    </>
  );
}
// Vamos a setear los defaults, que quiere decir que si no estamos pasando los props, estos tomen un valor por defecto
Layout.defaultProps = {
  title: 'Bienvenidos a mi Blog',
  keywords: 'development, coding, programming',
  description: 'La mejor información y noticias en el mundo del desarrollo',
};
