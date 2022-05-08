// Este componente se encarga del renderizado de los elementos de paginación- Botones de páginas

import Link from 'next/link';
import PixelBorder from './PixelBorder';

export default function Pagination({ currentPage, numPages }) {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === numPages;

  const prevPage = `/blog/page/${currentPage - 1}`;
  const nextPage = `/blog/page/${currentPage + 1}`;

  // Si es la primer página no queremos devolver nada
  if (numPages === 1) return <></>;

  return (
    <div className="container pl-3 mt-6">
      <ul className="flex ppl-0 list-none mmy-2 gap-3">
        {!isFirstPage && (
          <PixelBorder btn inset>
            <Link href={prevPage}>
              <li className="relative block py-2 px-4 text-gray-800 cursor-pointer">
                Previous
              </li>
            </Link>
          </PixelBorder>
        )}
        {Array.from({ length: numPages }, (_, i) => (
          <PixelBorder btn inset key={`page-${i}`}>
            <Link href={`/blog/page/${i + 1}`}>
              <li className="relative block py-2 px-4 text-gray-800 cursor-pointer">
                {i + 1}
              </li>
            </Link>
          </PixelBorder>
        ))}

        {!isLastPage && (
          <PixelBorder btn inset>
            <Link href={nextPage}>
              <li className="relative block py-2 px-4 text-gray-800 cursor-pointer">
                Next
              </li>
            </Link>
          </PixelBorder>
        )}
      </ul>
    </div>
  );
}
