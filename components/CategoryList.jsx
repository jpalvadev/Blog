// Este es el componente que renderiza el listado de categorias. Es el componente que va a la derecha
import Link from 'next/link';
import PixelBorder from './PixelBorder';

export default function CategoryList({ categories }) {
  return (
    <PixelBorder>
      <div className="w-full pp-5 bg-white rounded-lg shadow-md mmt-6 font-arcade">
        {/* <h3 className="text-2xl bg-gray-800 text-white p-3 rounded">
        Blog Categories
      </h3> */}
        <ul className="flex flex-wrap ddivide-x divide-black">
          {categories.map((category, index) => (
            <Link href={`/blog/category/${category.toLowerCase()}`} key={index}>
              <li className="px-4 py-2 cursor-pointer transition duration-300 hover:text-primary-250">
                {category}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </PixelBorder>
  );
}
