// Este componente es la etiqueta de categoria, con su color correspondiente

import Link from 'next/link';
import { motion } from 'framer-motion';
import { COLOR_KEY } from '@/config/index';

// En este caso el prop children equivale al category. Pasamos como prop a este componente post.frontmatter.category como children
export default function CategoryLabel({ children }) {
  return (
    <motion.div
      className={`py-2 ${COLOR_KEY[children]} text-background-100 text-center font-title rounded-full w-3/5 mx-auto`}
      initial={{ y: '-50%' }}
    >
      <Link href={`/blog/category/${children.toLowerCase()}`}>{children}</Link>
    </motion.div>
  );
}
