// Este componente es el resultado del search. Va a listar los resultados de lo que escribimos en el search box

import Post from './Post';

export default function SearchResults({ results }) {
  if (results.length === 0) return <></>; // Si no hay resultados devolvemos un fragment vacío

  return (
    <div className="overflow-scroll mmax-h-screen max-h-96 mmax-h-[50%] mmax-h-fit aabsolute ttop-20 rright-0 mmd:right-10 zz-10 bborder-4 bborder-gray-500 bbg-white text-black ww-full mmd:w-6/12 rrounded-2xl">
      {/* <div className="pp-10"> */}
        <h2 className="text-3xl mb-3">{results.length} Results</h2>
        {results.map((result, index) => (
          <Post key={index} post={result} compact={true} /> // La propiedad compact es para mostrar los resultados mas chicos
        ))}
      {/* </div> */}
    </div>
  );
}
