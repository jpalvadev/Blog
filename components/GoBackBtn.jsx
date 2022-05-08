import Link from 'next/link';
import PixelBorder from './PixelBorder';

export default function GoBackBtn() {
  return (
    <PixelBorder
      btn
      inset
      insetColor={'#0eb148'}
      bgColor={'#2cee71'}
      classNames={'mx-3 w-max ww-1/4 px-4'}
    >
      <Link href="/blog">
        <a className="block font-arcade py-4 text-center">Go Back</a>
      </Link>
    </PixelBorder>
  );
}
