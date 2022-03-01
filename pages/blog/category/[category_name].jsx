// ESTA ES NUESTRA PAGINA DE CATEGORIAS

// Para que no de error importar un modulo server-side en el client-side, debemos usarlo en una función server-side
// En este caso, debemos usar fs en getStaticProps()
import fs from 'fs';
import path from 'path';
import Layout from '@/components/Layout';
import matter from 'gray-matter';
import Link from 'next/link';
import Post from '@/components/Post';
import { getPosts } from '@/lib/posts';
import CategoryList from '@/components/CategoryList';

// PRESTAR ESPECIAL ATENCION ACA. El prop posts que estamos pasando como argumento lo traemos desde GetStaticProps(). Desde este mismo archivo!
export default function CategoryBlogPage({ posts, categoryName, categories }) {
  return (
    <Layout>
      <div className="flex justify-between">
        {/* Separamos la pagina del blog en 4 partes, 3 partes para los arts, 1 parte para las categorias */}
        <div className="w-3/4 mr-10">
          {/* Titulo */}
          <h1 className="text-5xl border-b-4 p-5 font-bold">
            {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} posts
          </h1>

          {/* Map de los posts para crear cada CARD */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post, index) => (
              <Post key={index} post={post} />
            ))}
          </div>
        </div>

        {/* Acá va el componente de las categorias, con un width de 1/4 */}
        <div className="w-1/4">
          <CategoryList categories={categories} />
        </div>
      </div>
    </Layout>
  );
}

// Debemos generar los paths a cada categoria. Por ej: http://localhost:3000/blog/category/javascript
export async function getStaticPaths() {
  // files va a ser un array con los nombres de los archivos
  const files = fs.readdirSync(path.join('posts'));

  // Como mapeamos el files, categories será un array. Cada elemento del array creado será el valor category del frontmatter
  const categories = files.map((filename) => {
    // markDownWithMeta será todo el markdown
    const markDownWithMeta = fs.readFileSync(
      path.join('posts', filename),
      'utf-8'
    );

    const { data: frontmatter } = matter(markDownWithMeta);
    return frontmatter.category.toLowerCase();
  });

  const paths = categories.map((category) => ({
    params: { category_name: category },
  }));

  return {
    paths,
    fallback: false,
  };
}

// method for fetching data
// What we are going to do is fetch data from a file
// Para hacerlo necesitamos importar el module "fs" , que es un módulo de Node
// params lo traemos de getStaticPaths
export async function getStaticProps({ params: { category_name } }) {
  //category_name tomará el valor del filtro por categoría. SI estamos en blog/category/javascript, valdrá "javascript"

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

  // Filter post by category
  const categoryPosts = posts.filter(
    (post) => post.frontmatter.category.toLowerCase() === category_name
  );

  return {
    props: {
      // Solamente devolvemos los posts que corresponden con la categoría filtrada
      posts: categoryPosts,
      categoryName: category_name,
      categories: uniqueCategories,
    },
  };
}
