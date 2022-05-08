// Acá manejamos la paginación del blog ej: /blog/page2

// Para que no de error importar un modulo server-side en el client-side, debemos usarlo en una función server-side
// En este caso, debemos usar fs en getStaticProps()
import fs from 'fs';
import path from 'path';
import Layout from '@/components/Layout';
import Post from '@/components/Post';
import { POST_PER_PAGE } from '@/config/index';
import Pagination from '@/components/Pagination';
import { getPosts } from '@/lib/posts';
import CategoryList from '@/components/CategoryList';

// PRESTAR ESPECIAL ATENCION ACA. El prop posts que estamos pasando como argumento lo traemos desde GetStaticProps(). Desde este mismo archivo!
export default function BlogPage({ posts, numPages, currentPage, categories }) {
  return (
    <div className="container flex justify-between">
      {/* Separamos la pagina del blog en 4 partes, 3 partes para los arts, 1 parte para las categorias */}
      <div className="ww-3/4 mmr-10">
        <h1 className="text-2xl md:text-3xl bborder-b-4 p-5 font-bold font-arcade text-center mb-4">
          Blog
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
          {posts.map((post, index) => (
            <Post key={index} post={post} />
          ))}
        </div>
        <Pagination currentPage={currentPage} numPages={numPages} />
      </div>

      {/* Acá va el componente de las categorias, con un width de 1/4 */}
      {/* <div className="w-1/4">
          <CategoryList categories={categories} />
        </div> */}
    </div>
  );
}

// getstaticPaths and getStaticProps SE EJECUTAN EN BUILD TIME!!!

// DYNAMIC ROUTES - Vamos a crear la página (route) para cada artículo. At build time
// Debe retornar un objeto llamado paths, dentro de paths debe haber un array de objetos.
// Cada objeto de este array tendrá una key llamada params y que tomará el valor de cada route
// paths: [ { params: {route: "la_ruta_al_articulo"} } ]
// también necesitamos establecer el fallback. Si lo ponemos en false mostrará un 404 si accedemos a una route que no existe
export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'));

  // Calculamos el num de páginas que vamos a usar de acuerdo a la cantidad de post creados
  const numPages = Math.ceil(files.length / POST_PER_PAGE);

  // creamos las routes, 1 por cada page_index. page_index va a valer desde 1 hasta la cantidad de numPages
  let paths = [];
  for (let i = 1; i <= numPages; i++) {
    paths.push({
      params: { page_index: i.toString() },
    });
  }

  return {
    paths,
    fallback: false,
  };
}

// METHOD FOR FETCHING DATA (ASYNC)
// getStaticProps se ejecuta antes de mostrar en pantalla el componente, en este caso BlogPage. Por lo tanto
// getStaticProps va a buscar los datos, y como es una async function una vez que los obtiene se renderiza el componente
// What we are going to do is fetch data from a file
// Para hacerlo necesitamos importar el module "fs" , que es un módulo de Node
export async function getStaticProps({ params }) {
  // params es lo que devuelve getStaticPaths

  // Lo que queremos hacer es que cuando vayamos a la route /blog/ nos muestre los post que estarían en /blog/page/1
  const page = parseInt((params && params.page_index) || 1);

  // En files se guardará un array con los nombres de los archivos que se encuentran en la carpeta posts
  /* NOTE: The fs.readdirSync() method is used to synchronously read the contents of a given directory. 
           The method returns an array with all the file names or objects in the directory. The options 
           argument can be used to change the format in which the files are returned from the method. */
  const files = fs.readdirSync(path.join('posts'));

  const posts = getPosts();

  // Get categories for sidebar
  const categories = posts.map((post) => post.frontmatter.category);
  // creamos un set para que no haya categorias repetidas, y luego usamos
  // el spread operator para convertirlo en un array
  const uniqueCategories = [...new Set(categories)];

  // Vamos a separar los post a devolver según la page en la que estemos
  const numPages = Math.ceil(files.length / POST_PER_PAGE);
  const pageIndex = page - 1;
  const orderedPost = posts.slice(
    pageIndex * POST_PER_PAGE,
    (pageIndex + 1) * POST_PER_PAGE
  );

  return {
    props: {
      // posts es el objeto que tiene el slug, y el frontmatter
      posts: orderedPost,
      numPages, // tenemos que devolver la cantidad total de pages
      currentPage: page, // y también la page en la que estamos actualmente
      categories: uniqueCategories,
    },
  };
}
