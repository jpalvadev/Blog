// ESTE ES EL BLOGPAGE Esta es la página que se va a cargar cuando vayamos a /blog

// Lo que hacemos es traer el contenido de la paginación (/blog/page/1 por ej) y que se muestre la primer página en la
// ruta /blog/. LA ruta /blog/ es la ruta principal del blog

import { getStaticProps } from './page/[page_index]';
import BlogPage from './page/[page_index]';

export { getStaticProps };
export default BlogPage;
