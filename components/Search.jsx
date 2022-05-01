// Este componente es la barra superior encargada del search

import { useState, useEffect } from 'react';
import { FaSearch, faSearch } from 'react-icons/fa';
import SearchResults from './SearchResults';
import { AnimatePresence, motion } from 'framer-motion';
import PixelBorder from './PixelBorder';

export default function Search({ showSearch }) {
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
    <AnimatePresence>
      {showSearch && (
        <motion.div
          // className="left-0 right-0 absolute rrelative bbg-gray-600 p-3 w-full md:w-3/4 lg:w-1/2 xl:w-1/2 mx-auto"
          className="px-4 w-full md:w-3/4 lg:w-1/2 xl:w-1/2 md:mx-auto"
          // initial={{ y: '-100%' }}
          // animate={{ y: 0 }}
          // exit={{ y: '-100%' }}
          initial={{ opacity: 0, marginTop: 0, height: 0 }}
          animate={{ opacity: 1, marginTop: 26, height: 'auto' }}
          exit={{
            opacity: 0,
            marginTop: 0,
            transform: 'translateY(26px)',
            height: 0,
          }}
          // transition={{ type: 'spring', stiffness: 200 }}
        >
          <PixelBorder>
            <div className="container mx-auto flex items-center justify-center md:justify-end">
              <div className="relative text-gray-600 w-full">
                <form>
                  <input
                    type="search"
                    name="search"
                    id="search"
                    className="bg-white h-10 px-5 pr-10 rrounded-full font-arcade text-md focus:outline-none w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search Posts..."
                  />
                  {/* <FaSearch className="absolute top-0 right-0 text-black mt-3 mr-4" /> */}
                </form>
              </div>
            </div>
            <SearchResults results={searchResults} />
          </PixelBorder>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
