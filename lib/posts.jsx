// En este archivo van todas las funcionalidades y código repetido para tratar de hacer este projecto más DRY

// Para que no de error importar un modulo server-side en el client-side, debemos usarlo en una función server-side
// En este caso, debemos usar fs en getStaticProps()
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Como el archivo que queremos importar se llama index.jsx no es necesario escribir el nombre
import { sortByDate } from '@/utils/index';

// En files se guardará un array con los nombres de los archivos que se encuentran en la carpeta posts
/* NOTE: The fs.readdirSync() method is used to synchronously read the contents of a given directory. 
           The method returns an array with all the file names or objects in the directory. The options 
           argument can be used to change the format in which the files are returned from the method. */
const files = fs.readdirSync(path.join('posts')); // NOTE: PARECE QUE path.join no es necesario. INVESTIGAR
export function getPosts() {
  const posts = files.map((filename) => {
    // SLUG: Esta palabra define la parte final de la URL que identifica una página dentro de un sitio web.
    // En pocas palabras, debes verla como la parte de la URL que resume el contenido de la página en una o más palabras clave.

    // Vamos a crear el slug de cada file. O sea la URL de cada post. También necesitamos remover la extension del archivo
    const slug = filename.replace('.md', '');

    /* NOTE: The fs.readFileSync() method is used to read the file and return its content.In fs.readFile() method, 
             we can read a file in a non-blocking asynchronous way, but in fs.readFileSync() method, we can read files
             in a synchronous way, we are telling node.js to block other parallel process and do the current file reading process.*/
    const markDownWithMeta = fs.readFileSync(
      path.join('posts', filename),
      'utf-8'
    );

    // gray-matter nos devuelve un objeto con 2 variables: data(el frontmatter, lo que está entre ---)
    // y el content, que es todo lo demás
    const { data: frontmatter, content } = matter(markDownWithMeta);

    return {
      slug,
      frontmatter,
      content,
    };
  });

  return posts.sort(sortByDate);
}
