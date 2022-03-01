// Este componente es la barra superior encargada del search

import { useState, useEffect } from 'react';
import { FaSearch, faSearch } from 'react-icons/fa';
import SearchResults from './SearchResults';

export default function Search() {
  const [searchTerm, setSearchTerm] = useState(''); // lo que buscamos
  const [searchResults, setSearchResults] = useState([]); // array con los resultados de búsqueda

  // Usamos el useEffect porque queremos que esto se ejecute cada vez que cambia el searchTerm
  // O sea, se va a ejecutar cada vez que ingresemos una letra en el buscador de posts
  useEffect(() => {
    const getResults = async () => {
      if (searchTerm === '') {
        setSearchResults([]); // si no ponemos nada en el search devolvemos un array vacío
      } else {
        const res = await fetch(`/api/search?q=${searchTerm}`);
        const results = await res.json();
        console.log(results);
        setSearchResults(results); // Acá se guarda lo que devuelve nuestro API route
      }
    };

    // console.log(searchResults);

    getResults();
  }, [searchTerm]);

  return (
    <div className="relative bg-gray-600 p-4">
      <div className="container mx-auto flex items-center justify-center md:justify-end">
        <div className="relative text-gray-600 w-72">
          <form>
            <input
              type="search"
              name="search"
              id="search"
              className="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none w-72"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Posts..."
            />
            <FaSearch className="absolute top-0 right-0 text-black mt-3 mr-4" />
          </form>
        </div>
      </div>
      <SearchResults results={searchResults} />
    </div>
  );
}
