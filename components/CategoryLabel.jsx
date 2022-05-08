// Este componente es la etiqueta de categoria, con su color correspondiente

import Link from 'next/link';
import { motion } from 'framer-motion';
import { COLOR_KEY } from '@/config/index';

// En este caso el prop children equivale al category. Pasamos como prop a este componente post.frontmatter.category como children
export default function CategoryLabel({ children }) {
  return (
    <motion.div
      // className={`${COLOR_KEY[children]} text-white text-center font-arcade py-1 px-2 pixel-badge text-xs left-1/2 absolute`}
      className={`bg-yellow-300 text-white text-center font-arcade px-4 pixel-badge mx-auto text-sm right-1/2 transform translate-x-1/2 -translate-y-[70%] absolute`}
      // initial={{ y: '-50%' }}
    >
      <Link href={`/blog/category/${children.toLowerCase()}`}>{children}</Link>
    </motion.div>
  );
}
