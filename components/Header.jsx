import Link from 'next/link';
import Image from 'next/image';
import PixelBorder from './PixelBorder';
import Search from './Search';
import CategoryList from './CategoryList';
import MusicPlayer from './MusicPlayer';

export default function Header({
  showSearch,
  setShowSearch,
  showCategoryList,
  setShowCategoryList,
  showPlayer,
  setShowPlayer,
}) {
  const handleSearch = () => {
    setShowCategoryList(false);
    setShowSearch(!showSearch);
  };

  const handleCategories = () => {
    setShowSearch(false);
    setShowCategoryList(!showCategoryList);
  };

  return (
    <div className="fixed z-10 top-[4px] left-[4px] right-[4px]">
      <PixelBorder classNames={'mm-1'}>
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
            <nav className="flex flex-wrap gap-4 md:gap-10 mmd:w-4/5 items-center justify-end text-sm md:text-base mmd:ml-auto">
              <Link href="/blog">
                <a className="mml-10 cursor-pointer uppercase transition duration-300 hover:text-primary-250">
                  Blog
                </a>
              </Link>
              <div
                // onClick={() => setShowSearch(!showSearch)}
                onClick={handleSearch}
                className="m-0 cursor-pointer uppercase transition duration-300 hover:text-primary-250"
              >
                {/* Search */}
                {/* <img src="./glass.svg" alt="" /> */}
                <svg
                  className="transition duration-300 hover:fill-primary-250 ml-auto h-8"
                  viewBox="0 0 700 700"
                >
                  <g className="layer">
                    {/* <title>Layer 1</title> */}
                    <g id="svg_24">
                      <path
                        d="m388.89,77.78l77.77,0l0,77.78l-77.77,0l0,-77.78z"
                        id="svg_25"
                      />
                      <path
                        d="m466.66,311.11l0,77.78l77.77,0l0,-233.33l-77.77,0l0,155.55z"
                        id="svg_26"
                      />
                      <path
                        d="m388.89,388.89l77.77,0l0,77.78l-77.77,0l0,-77.78z"
                        id="svg_27"
                      />
                      <path
                        d="m466.66,466.66l77.77,0l0,77.78l-77.77,0l0,-77.78z"
                        id="svg_28"
                      />
                      <path
                        d="m544.44,544.44l77.77,0l0,77.78l-77.77,0l0,-77.78z"
                        id="svg_29"
                      />
                      <path
                        d="m622.21,622.21l77.77,0l0,77.78l-77.77,0l0,-77.78z"
                        id="svg_30"
                      />
                      <path
                        d="m77.79,233.34l0,-77.78l-77.77,0l0,233.33l77.77,0l0,-155.55z"
                        id="svg_31"
                      />
                      <path
                        d="m77.79,388.89l77.77,0l0,77.78l-77.77,0l0,-77.78z"
                        id="svg_32"
                      />
                      <path
                        d="m311.11,77.78l77.77,0l0,-77.78l-233.32,0l0,77.78l155.55,0z"
                        id="svg_33"
                      />
                      <path
                        d="m233.34,466.66l-77.77,0l0,77.78l233.32,0l0,-77.78l-155.55,0z"
                        id="svg_34"
                      />
                      <path
                        d="m77.79,77.78l77.77,0l0,77.78l-77.77,0l0,-77.78z"
                        id="svg_35"
                      />
                    </g>
                  </g>
                </svg>
              </div>

              <div
                // onClick={() => setShowCategoryList(!showCategoryList)}
                onClick={handleCategories}
                className="m-0 cursor-pointer uppercase transition duration-300 hover:text-primary-250"
              >
                Categories
              </div>

              {/* Music Player */}
              <div
                // onClick={() => setShowCategoryList(!showCategoryList)}
                onClick={handleCategories}
                className="m-0 cursor-pointer uppercase transition duration-300 hover:text-primary-250"
              >
                Mu
              </div>

              <div
                // onClick={() => setShowSearch(!showSearch)}
                onClick={handleSearch}
                className="m-0 cursor-pointer uppercase transition duration-300 hover:text-primary-250"
              >
                {/* Search */}
                {/* <img src="./glass.svg" alt="" /> */}
                <svg
                  className="h-4 w-4 fill-current m-0 cursor-pointer uppercase transition duration-300 hover:text-primary-250"
                  // xmlns="http://www.w3.org/2000/svg"
                  // version="1.1"
                  // id="Capa_1"
                  // x="0px"
                  // y="0px"
                  // viewBox="0 0 56.966 56.966"
                  viewBox="0 0 56.966 56.966"
                  width={512}
                  height={512}
                >
                  <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                </svg>
              </div>

              {/* <Link href="/about">
                <a className="mml-10 mmr-1 cursor-pointer uppercase transition duration-300 hover:text-primary-250">
                  About
                </a>
              </Link> */}
            </nav>
          </div>
          <Search showSearch={showSearch} />
          <CategoryList showCategoryList={showCategoryList} />
          <MusicPlayer showPlayer={showPlayer} />
        </header>
      </PixelBorder>
    </div>
  );
}
