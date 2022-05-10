// Esta es la CARD de cada Blog Post

import Link from 'next/link';
import Image from 'next/image';

import { useState } from 'react';

import CategoryLabel from './CategoryLabel';

import { motion } from 'framer-motion';
import { COLOR_KEY, COLOR_KEY_BORDERS } from '@/config/index';
import PixelBorder from './PixelBorder';
const readingTime = require('reading-time');

export default function Post({ post, compact }) {
  const [cardHover, setCardHover] = useState(false);

  // console.log(post);

  return (
    <PixelBorder
      rounded
      iinset
      shadow
      canHover
      // bgColor={'rgba(255,255,255, 0.85)'}
      classNames={'oopacity-90 m-4 mmd:m-3'}
    >
      {/* Category Label */}
      <CategoryLabel>{post.frontmatter.category}</CategoryLabel>

      {/* title and excerpt */}
      <div className="flex flex-col justify-between h-full">
        <div>
          <div className="mx-[-4px] px-6 py-4 border-b-2 border-black transition duration-300 hover:text-primary-250">
            <Link href={`/blog/${post.slug}`}>
              <a className="font-arcade text-base">{post.frontmatter.title}</a>
            </Link>
          </div>
          <p className="px-4 first-letter:mt-2 font-main text-lg tracking-wide">
            {post.frontmatter.excerpt}
          </p>
        </div>

        <div>
          <div className={`flex items-center justify-between mx-4`}>
            {/* Date */}
            <span className={'font-light font-main'}>
              {post.frontmatter.date}
            </span>

            {/* Read Time */}
            <p className="m-0">
              Lectura: {parseInt(readingTime(post.content).text)} min
            </p>
          </div>

          {/* Read More Button */}
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
                  className={`text-gray-900 inline-block whitespace-nowrap font-main w-full text-center font-bold px-4 py-4 ${
                    COLOR_KEY_BORDERS[post.frontmatter.category]
                  }`}
                >
                  Read More
                </a>
              </Link>
            </PixelBorder>
          )}
        </div>
      </div>
    </PixelBorder>
  );
}
