// Esta va a ser nuestra API route for Search

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export default function handler(req, res) {
  let posts;

  // vamos a chequear el environment ( si estamos en prod o dev)
  if (process.env.NODE_ENV === 'production') {
    // fetch from cache
  } else {
    const files = fs.readdirSync(path.join('posts'));

    posts = files.map((filename) => {
      const slug = filename.replace('.md', '');

      const markDownWithMeta = fs.readFileSync(
        path.join('posts', filename),
        'utf-8'
      );

      const { data: frontmatter } = matter(markDownWithMeta);

      return {
        slug,
        frontmatter,
      };
    });
  }

  // Acá hacemos un filtrado de articulos. Nos fijamos si el texto puesto en la searchbar corresponde con el titulo, excerpt
  // o category del algún/algunos artículo/s y lo guardamos en la variable results, que tomará el valor de un array de resultados de filtro
  // Prestar atención al destructuring de frontmatter, no es difícil, prestar atención nomás
  // res.query.q es el search term (lo que ponemos en el input search).
  // El seearch term lo sacamos del useEffect del componente Search ----> const res = await fetch(`api/search?q=${searchTerm}`);
  const results = posts.filter(
    ({ frontmatter: { title, excerpt, category } }) =>
      title.toLowerCase().indexOf(req.query.q) != -1 ||
      excerpt.toLowerCase().indexOf(req.query.q) != -1 ||
      category.toLowerCase().indexOf(req.query.q) != -1
  );

  //  Esta es la respuesta de nuestro API route
  // Esta respuesta de nuestro API route se guardará utilizando setSearchResults en el componente Search ----> setSearchResults(results);
  res.status(200).json(JSON.stringify(results));
}
