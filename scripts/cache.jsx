// Dado que una vez que hacemos deploy de nuestro blog a Vercel el search no funciona más, debemos hacer un cache de nuestros
// posts para que la funcionalidad de search ande
// Debemos crear una folder llamada cache y dentro poner un archivo llamado data.js que contendrá nuestros cached posts
// Este archivo se correrá en NODE, no se ejecutará dentro de Next.js

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

function postData() {
  const files = fs.readdirSync(path.join('posts'));

  const posts = files.map((filename) => {
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

  // lo que retornamos acá es lo que queremos que esté dentro de nuestro cache file(data.js)
  return `export const posts = ${JSON.stringify(posts)}`;
}

// Buscamos la folder llamada cache y si no existe la creamos
try {
  fs.readdirSync('cache'); // existe la folder cache?
} catch (error) {
  fs.mkdirSync('cache'); // si no existe la creamos
}

// 1er argumento => dentro de la carpeta llamada cache creamos un archivo llamado data.js
// 2do argumento => dentro del archivo data ponemos lo que retorna la función postData() Esta funcion retorna los posts
// 3er argumento => callback function que acepta un error
fs.writeFile('cache/data.js', postData(), function (err) {
  if (err) return console.log(err);
  console.log('Posts cached!!');
});
