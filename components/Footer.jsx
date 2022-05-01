import PixelBorder from './PixelBorder';
import SoundCloudPlayer from './SoundCloudPlayer';

export default function Footer() {
  return (
    <footer className="fixed bottom-0 w-full">
      <PixelBorder classNames={'m-1'}>
        <SoundCloudPlayer />
      </PixelBorder>
    </footer>
  );
}
