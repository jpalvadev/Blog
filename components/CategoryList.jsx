// Este es el componente que renderiza el listado de categorias. Es el componente que va a la derecha
import Link from 'next/link';
import PixelBorder from './PixelBorder';
import { motion, AnimatePresence } from 'framer-motion';

const categories = ['JavaScript', 'PHP', 'Python', 'CSS'];

// export default function CategoryList({ categories }) {
export default function CategoryList({ showCategoryList }) {
  // console.log(categories);
  return (
    <AnimatePresence>
      {showCategoryList && (
        <motion.div
          className="px-4 mx-auto font-arcade w-full md:w-3/4 lg:w-1/2 xl:w-1/2 md:mx-auto"
          initial={{ opacity: 0, marginTop: 0, height: 0 }}
          animate={{ opacity: 1, marginTop: 26, height: 'auto' }}
          exit={{
            opacity: 0,
            marginTop: 0,
            transform: 'translateY(104px)',
            height: 0,
          }}
        >
          <PixelBorder>
            {/* <h3 className="text-2xl bg-gray-800 text-white p-3 rounded">
        Blog Categories
      </h3> */}
            <ul className="px-4 flex justify-between flex-row flex-wrap">
              {categories.map((category, index) => (
                <Link
                  href={`/blog/category/${category.toLowerCase()}`}
                  key={index}
                >
                  <li className="px-4 py-2 cursor-pointer transition duration-300 hover:text-primary-250">
                    {category}
                  </li>
                </Link>
              ))}
            </ul>
          </PixelBorder>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
