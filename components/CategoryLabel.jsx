// Este componente es la etiqueta de categoria, con su color correspondiente

import Link from 'next/link';

// En este caso el prop children equivale al category. Pasamos como prop a este componente post.frontmatter.category como children
export default function CategoryLabel({ children }) {
  // Cargamos todas las clases a esta variable porque no podemos asignar variables dinámicamente a Tailwind
  const colorKey = {
    JavaScript: 'bg-yellow-600',
    CSS: 'bg-blue-600',
    Python: 'bg-green-600',
    PHP: 'bg-purple-600',
    Ruby: 'bg-red-600',
  };

  return (
    <div
      className={`px-2 py-1 ${colorKey[children]} text-gray-100 font-bold rounded`}
    >
      <Link href={`/blog/category/${children.toLowerCase()}`}>{children}</Link>
    </div>
  );
}
