// Esta es la CARD de cada Blog Post

import Link from 'next/link';
import Image from 'next/image';

import { useState } from 'react';

import CategoryLabel from './CategoryLabel';

import { motion } from 'framer-motion';
import { COLOR_KEY, COLOR_KEY_BORDERS } from '@/config/index';
import PixelBorder from './PixelBorder';

export default function Post({ post, compact }) {
  const [cardHover, setCardHover] = useState(false);
  return (
    <PixelBorder
      rounded
      iinset
      shadow
      canHover
      // bgColor={'rgba(255,255,255, 0.95)'}
      classNames={'oopacity-90 m-4 mmd:m-3'}
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
        <div className=" mx-[-4px] px-4 pt-6 pb-4 border-b-2 border-black transition duration-300 hover:text-primary-250 bg-[rgba(255,255,255, 0.85)]">
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
          className={`font-light text-background-100 font-title w-full text-center py-4 bborder-r ${
            COLOR_KEY_BORDERS[post.frontmatter.category]
          }`}
        >
          {post.frontmatter.date}
        </span>

        {/* Read More <a></a> tag */}
        {!compact && (
          <PixelBorder
            btn
            inset
            insetColor={'#0eb148'}
            bgColor={'#2cee71'}
            classNames={'m-4 relative'}
          >
            <Link href={`/blog/${post.slug}`}>
              <a
                className={`text-gray-900 hhover:text-blue-600 inline-block whitespace-nowrap gbg-primary-350 font-title w-full text-center font-bold px-4 py-4 ${
                  COLOR_KEY_BORDERS[post.frontmatter.category]
                }`}
              >
                Read More
              </a>
            </Link>
          </PixelBorder>
        )}
      </div>
    </PixelBorder>
  );
}
