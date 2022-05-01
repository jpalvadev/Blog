// Esta es la CARD de cada Blog Post

import Link from 'next/link';
import Image from 'next/image';

import { useState } from 'react';

import CategoryLabel from './CategoryLabel';

import { motion } from 'framer-motion';
import { COLOR_KEY, COLOR_KEY_BORDERS } from '@/config/index';

export default function Post({ post, compact }) {
  const [cardHover, setCardHover] = useState(false);
  return (
    <div
      className="bg-white mt-6 pixel-border pixel-border--2 inset"
      // whileHover={{
      //   x: -4,
      //   y: -4,
      //   transition: {
      //     duration: 0.2,
      //   },
      // }}
      // onMouseEnter={() => setCardHover(true)}
      // onMouseLeave={() => setCardHover(false)}
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
      <div className="">
        <div className="px-4 pt-6 pb-4 border-b-2 border-black">
          <Link href={`/blog/${post.slug}`}>
            <a className="font-arcade text-base">{post.frontmatter.title}</a>
          </Link>
        </div>
        <p className="px-4 first-letter:mt-2 font-main text-lg tracking-wide">
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
              className={`pixel-borders pixel-box--primary text-gray-900 hover:text-blue-600 font-title w-full text-center py-4 border-l ${
                COLOR_KEY_BORDERS[post.frontmatter.category]
              }`}
            >
              Read More
            </a>
          </Link>
        )}
      </div>

      {/* <motion.div
        className="absolute inset-0 papapa ppixel-shadow ppixel-borders--2 oopacity-25"
        initial={{ x: 4, y: 4 }}
        animate={{
          x: cardHover ? 12 : 0,
          y: cardHover ? 12 : 0,
        }}
      ></motion.div> */}
    </div>
  );
}
