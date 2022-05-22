import { useState, useEffect, createRef } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import Script from 'next/script';

import Image from 'next/image';
import PixelBorder from './PixelBorder';

export default function MusicPlayer(showPlayer) {
  // used to communicate between SC widget and React
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlistIndex, setPlaylistIndex] = useState(0);

  // populated once SoundCloud Widget API is loaded and initialized
  const [player, setPlayer] = useState(false);

  // ref for iframe element - https://reactjs.org/docs/refs-and-the-dom.html
  const iframeRef = createRef();

  // initialization - load soundcloud widget API and set SC event listeners

  // Event Listeners to make the audio autoplay
  const handleEventListeners = () => {
    console.log('first event');
    console.log(showPlayer);
    setIsPlaying(true);
    window.removeEventListener('click', handleEventListeners);
    window.removeEventListener('scroll', handleEventListeners);
    window.removeEventListener('keydown', handleEventListeners);
  };

  useEffect(() => {
    window.addEventListener('click', handleEventListeners);
    window.addEventListener('scroll', handleEventListeners);
    window.addEventListener('keydown', handleEventListeners);
  }, []);

  // integration - update SC player based on new state (e.g. play button in React section was click)

  // adjust playback in SC player to match isPlaying state
  useEffect(() => {
    if (!player) return; // player loaded async - make sure available

    player.isPaused((playerIsPaused) => {
      if (isPlaying && playerIsPaused) {
        player.play();
      } else if (!isPlaying && !playerIsPaused) {
        player.pause();
      }
    });
  }, [isPlaying]);

  // adjust seleted song in SC player playlist if playlistIndex state has changed
  useEffect(() => {
    if (!player) return; // player loaded async - make sure available

    player.getCurrentSoundIndex((playerPlaylistIndex) => {
      if (playerPlaylistIndex !== playlistIndex) player.skip(playlistIndex);
    });
  }, [playlistIndex]);

  // React section button click event handlers (play/next/previous)
  //  - adjust React component state based on click events

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const changePlaylistIndex = (skipForward = true) => {
    // get list of songs from SC widget
    player.getSounds((playerSongList) => {
      let nextIndex = skipForward ? playlistIndex + 1 : playlistIndex - 1;

      // ensure index is not set to less than 0 or greater than playlist
      if (nextIndex < 0) nextIndex = 0;
      else if (nextIndex >= playerSongList.length)
        nextIndex = playerSongList.length - 1;

      setPlaylistIndex(nextIndex);
    });
  };

  return (
    <AnimatePresence>
      <div>
        <Script
          src="https://w.soundcloud.com/player/api.js"
          strategy="lazyOnload"
          onLoad={() => {
            // check that the script loaded correctly
            console.log(
              `script loaded correctly, window.FB has been populated`
            );

            // initialize player and store reference in state
            const player = window.SC.Widget(iframeRef.current);
            setPlayer(player);

            const { PLAY, PLAY_PROGRESS, PAUSE, FINISH, ERROR } =
              window.SC.Widget.Events;

            // NOTE: closures created - cannot access react state or props from within and SC callback functions!!

            player.bind(PLAY, () => {
              // update state to playing
              setIsPlaying(true);

              // check to see if song has changed - if so update state with next index
              player.getCurrentSoundIndex((playerPlaylistIndex) => {
                setPlaylistIndex(playerPlaylistIndex);
              });
            });

            player.bind(PAUSE, () => {
              // update state if player has paused - must double check isPaused since false positives
              player.isPaused((playerIsPaused) => {
                if (playerIsPaused) setIsPlaying(false);
              });
            });
          }}
        />

        <iframe
          ref={iframeRef}
          id="sound-cloud-player"
          style={{ border: 'none', height: 314, width: 400 }}
          scrolling="no"
          allow="autoplay"
          src={
            'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1172027074'
          }
        ></iframe>
        {showPlayer && (
          <div className="flex gap-1 justify-center">
            <PixelBorder inset btn>
              <div
                onClick={() => changePlaylistIndex(false)}
                className="pt-1 px-2"
              >
                {/* Prev */}
                <Image
                  className="mirrored"
                  src="/images/next.png"
                  alt="previous song button"
                  width={25}
                  height={22.5}
                />
              </div>
            </PixelBorder>
            <PixelBorder inset btn>
              <div onClick={togglePlayback} className="pt-1 px-3">
                {/* Play Pause */}
                <Image
                  src={`/images/${isPlaying ? 'pause' : 'play'}.png`}
                  alt="play button"
                  width={12.5}
                  height={22.5}
                />
              </div>
            </PixelBorder>
            <PixelBorder inset btn>
              <div
                onClick={() => changePlaylistIndex(true)}
                className="pt-1 px-2"
              >
                {/* Next */}
                <Image
                  src="/images/next.png"
                  alt="next song button"
                  width={25}
                  height={22.5}
                />
              </div>
            </PixelBorder>
          </div>
        )}
      </div>
    </AnimatePresence>
  );
}