import Link from 'next/link';
import Image from 'next/image';
import PixelBorder from './PixelBorder';
import Search from './Search';

export default function Header({ showSearch, setShowSearch }) {
  return (
    <PixelBorder classNames={'m-1'}>
      <header className="bbg-gray-900 text-gray-900 bg-white w-full relative z-10 overflow-hidden ppx-10 py-4">
        <div className="container px-2 mx-auto flex fflex-wrap ppl-1 ppy-2 fflex-col md:flex-row items-center font-arcade justify-between">
          <Link href="/">
            <a className="flex mmd:w-1/5 title-font font-medium items-center md:justify-start mmb-4 md:mb-0">
              <Image
                src="/images/logo-dark.png"
                width={40}
                height={40}
                alt="logo"
              />
              <span className="ml-3 text-xl whitespace-nowrap hidden md:block transition duration-300 hover:text-primary-250">
                Nameless Blog
              </span>
            </a>
          </Link>
          <nav className="flex flex-wrap mmd:w-4/5 items-center justify-end text-sm md:text-base mmd:ml-auto">
            <div
              onClick={() => setShowSearch(!showSearch)}
              className="m-0 cursor-pointer uppercase transition duration-300 hover:text-primary-250"
            >
              Search
            </div>

            <Link href="/blog">
              <a className="mx-10 cursor-pointer uppercase transition duration-300 hover:text-primary-250">
                Blog
              </a>
            </Link>

            <Link href="/about">
              <a className="mml-10 mmr-1 cursor-pointer uppercase transition duration-300 hover:text-primary-250">
                About
              </a>
            </Link>
          </nav>
        </div>
        <Search showSearch={showSearch} />
      </header>
    </PixelBorder>
  );
}
