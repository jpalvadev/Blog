// Este componente es la etiqueta de categoria, con su color correspondiente

import Link from 'next/link';
import { motion } from 'framer-motion';
import PixelBorder from './PixelBorder';
import { COLOR_KEY } from '../config';

// En este caso el prop children equivale al category. Pasamos como prop a este componente post.frontmatter.category como children
export default function CategoryLabel({ children }) {
  return (
    <div className="absolute w-full -translate-y-[80%]">
      <PixelBorder
        borderColor={COLOR_KEY[children]}
        bgColor={COLOR_KEY[children]}
        classNames={
          'text-white text-center font-arcade px-4 w-max mx-auto text-sm'
        }
      >
        <Link href={`/blog/category/${children.toLowerCase()}`}>
          {children}
        </Link>
      </PixelBorder>
    </div>
  );
}
