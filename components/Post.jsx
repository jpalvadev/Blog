// Esta es la CARD de cada Blog Post

import Link from 'next/link';
import Image from 'next/image';

import CategoryLabel from './CategoryLabel';

import { motion } from 'framer-motion';
import { COLOR_KEY, COLOR_KEY_BORDERS } from '@/config/index';

export default function Post({ post, compact }) {
  return (
    <motion.div
      className="w-full bg-background-200 rounded-2xl mt-6"
      whileHover={{ backgroundColor: '#282828' }}
    >
      {/* Category Label */}
      <CategoryLabel>{post.frontmatter.category}</CategoryLabel>

      {/* Imagen  */}
      {/* {!compact && (
        <Image
          src={post.frontmatter.cover_image}
          alt=""
          height={420}
          width={600}
          className="mb-4"
        />
      )} */}

      {/* title and excerpt */}
      <div className="px-4">
        <Link href={`/blog/${post.slug}`}>
          <a className="text-2xl text-white font-main font-bold hover:underline">
            {post.frontmatter.title}
          </a>
        </Link>
        <p className="mt-2 text-primary-800 font-main">
          {post.frontmatter.excerpt}
        </p>
      </div>

      <div
        className={`flex items-center justify-between ${
          COLOR_KEY[post.frontmatter.category]
        } rounded-bl-2xl rounded-br-2xl`}
      >
        {/* Date */}
        <span
          className={`font-light text-background-100 font-title w-full text-center py-4 border-r ${
            COLOR_KEY_BORDERS[post.frontmatter.category]
          }`}
        >
          {post.frontmatter.date}
        </span>

        {/* Read More <a></a> tag */}
        {!compact && (
          <Link href={`/blog/${post.slug}`}>
            <a
              className={`text-gray-900 hover:text-blue-600 font-title w-full text-center py-4 border-l ${
                COLOR_KEY_BORDERS[post.frontmatter.category]
              }`}
            >
              Read More
            </a>
          </Link>
        )}
      </div>
    </motion.div>
  );
}
