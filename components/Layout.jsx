// The head tag is the HTML head => like title, description, meta, etc
import Head from 'next/head';
import Header from './Header';
import Search from './Search';

// children prop: anything that will be inside the Layout component is the children prop
export default function Layout({ title, keywords, description, children }) {
  return (
    <div className="bg-background-100">
      <Head>
        <title>{title}</title>
        <meta name="keywords" content={keywords} />
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Search />
      <main className="container mx-auto my-7">{children}</main>
    </div>
  );
}

// Vamos a setear los defaults, que quiere decir que si no estamos pasando los props, estos tomen un valor por defecto
Layout.defaultProps = {
  title: 'Bienvenidos a mi Blog',
  keywords: 'development, coding, programming',
  description: 'La mejor información y noticias en el mundo del desarrollo',
};
