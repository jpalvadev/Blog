import { useState, useEffect, createRef } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import Script from 'next/script';

import Image from 'next/image';
import PixelBorder from './PixelBorder';

let shuffledArr = [];
let nextIndex = 0;
export default function MusicPlayer({ showPlayer }) {
  // used to communicate between SC widget and React
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlistIndex, setPlaylistIndex] = useState(0);
  const [isPlayerLoaded, setIsPlayerLoaded] = useState(false);
  const [isInteracted, setIsInteracted] = useState(false);

  // populated once SoundCloud Widget API is loaded and initialized
  const [player, setPlayer] = useState(false);

  // ref for iframe element - https://reactjs.org/docs/refs-and-the-dom.html
  const iframeRef = createRef();

  // initialization - load soundcloud widget API and set SC event listeners

  // Event Listeners to make the audio autoplay, then we remove the event listeners
  const handleEventListeners = () => {
    // if (!isPlayerLoaded) return;
    // player.getCurrentSoundIndex((playerPlaylistIndex) => {
    //   console.log(playerPlaylistIndex);
    //   console.log(shuffledArr);
    //   setPlaylistIndex(shuffledArr[nextIndex]);
    // });
    setIsInteracted(true);

    // console.log('removed!');

    window.removeEventListener('click', handleEventListeners);
    window.removeEventListener('keydown', handleEventListeners);
    // togglePlayback();
  };

  useEffect(() => {
    if (!player) return;
    if (!isInteracted) return;
    player.skip(playlistIndex);
    setIsPlaying(true);
    // console.log('sdfljknsdflkj');
  }, [isPlayerLoaded, isInteracted]);

  // useEffect(() => {
  // if (isPlayerLoaded) {
  // window.addEventListener('click', handleEventListeners);
  // window.addEventListener('keydown', handleEventListeners);
  // }
  // }, [isPlayerLoaded]);

  // integration - update SC player based on new state (e.g. play button in React section was click)

  // adjust seleted song in SC player playlist if playlistIndex state has changed
  useEffect(() => {
    if (!player) return; // player loaded async - make sure available
    if (!isInteracted) return;
    // console.log(playlistIndex);
    player.getCurrentSoundIndex((playerPlaylistIndex) => {
      if (playerPlaylistIndex !== playlistIndex) {
        player.skip(playlistIndex);
        setIsPlaying(true);
      }
    });
  }, [playlistIndex]);

  // React section button click event handlers (play/next/previous)
  //  - adjust React component state based on click events

  const togglePlayback = () => {
    if (!player) return; // player loaded async - make sure available
    player.isPaused((playerIsPaused) => {
      if (playerIsPaused) {
        // player.skip(playlistIndex);
        player.play();
        setIsPlaying(true);
        // console.log('play');
      } else {
        player.pause();
        setIsPlaying(false);
      }
    });
  };

  const changePlaylistIndex = (skipForward = true) => {
    // get list of songs from SC widget
    player.getSounds((playerSongList) => {
      // let nextIndex = skipForward ? playlistIndex + 1 : playlistIndex - 1;
      nextIndex = skipForward ? ++nextIndex : --nextIndex;
      // console.log(playerSongList);
      // ensure index is not set to less than 0 or greater than playlist
      if (nextIndex < 0) nextIndex = 0;
      else if (nextIndex >= playerSongList.length) {
        nextIndex = playerSongList.length - 1;
      }

      setPlaylistIndex(shuffledArr[nextIndex]);
    });
  };

  return (
    <div>
      <Script
        src="https://w.soundcloud.com/player/api.js"
        strategy="lazyOnload"
        onLoad={() => {
          // check that the script loaded correctly

          // initialize player and store reference in state
          if (!iframeRef.current) return;
          const player = window.SC.Widget(iframeRef.current);

          setPlayer(player);

          const {
            PLAY,
            PLAY_PROGRESS,
            LOAD_PROGRESS,
            PAUSE,
            FINISH,
            ERROR,
            READY,
          } = window.SC.Widget.Events;

          // NOTE: closures created - cannot access react state or props from within and SC callback functions!!

          // player.bind(PLAY, () => {
          //   player.play();
          //   // update state to playing
          //   setIsPlaying(true);
          //   // check to see if song has changed - if so update state with next index
          //   player.getCurrentSoundIndex((playerPlaylistIndex) => {
          //     setPlaylistIndex(shuffledArr[nextIndex]);
          //   });
          // });

          player.bind(FINISH, () => {
            // console.log('finishehhdh');
            // console.log(playlistIndex);
            nextIndex++;
            setPlaylistIndex(shuffledArr[nextIndex]);
            // changePlaylistIndex(true);
            // console.log(playlistIndex);
          });

          // player.bind(PAUSE, () => {
          //   // update state if player has paused - must double check isPaused since false positives
          //   player.isPaused((playerIsPaused) => {
          //     if (playerIsPaused) setIsPlaying(false);
          //   });
          // });

          // when the iframe has done loading, set the state to loaded to create event Listeners
          player.bind(READY, () => {
            const tryGetSounds = () => {
              player.getSounds((playerSongList) => {
                while (shuffledArr.length < playerSongList.length) {
                  const newRandom =
                    Math.floor(Math.random() * playerSongList.length) + 1;
                  if (shuffledArr.indexOf(newRandom) === -1)
                    shuffledArr.push(newRandom);
                }

                ////////
                let notComplete = false;
                // for (let i = 0, len = playerSongList.length; i < len; i++) {
                for (let i = 0; i < playerSongList.length; i++) {
                  if (playerSongList[i].title === undefined) {
                    notComplete = true;
                    break;
                  }
                }
                if (notComplete) {
                  // console.log('Not complete. Try again in 200ms ...');
                  setTimeout(function () {
                    tryGetSounds();
                  }, 200);
                } else {
                  // console.log('Complete!');
                  setPlaylistIndex(shuffledArr[nextIndex]);
                  // player.skip(shuffledArr[nextIndex]);

                  setIsPlayerLoaded(true);
                  // console.log('isloaded');
                  window.addEventListener('click', handleEventListeners);
                  window.addEventListener('keydown', handleEventListeners);
                }
                ///////
              });

              // player.getCurrentSoundIndex((playerPlaylistIndex) => {
              //   console.log(playerPlaylistIndex);
              //   console.log(shuffledArr);
              //   setPlaylistIndex(shuffledArr[nextIndex]);
              // });
            };
            tryGetSounds();
          });
        }}
      />

      <iframe
        className="absolute -z-50 invisible"
        // className=""
        ref={iframeRef}
        id="sound-cloud-player"
        scrolling="no"
        allow="autoplay"
        src={
          'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1172027074'
        }
      ></iframe>
      <AnimatePresence>
        {showPlayer && (
          <motion.div
            className="flex gap-1 justify-center"
            initial={{ opacity: 0, marginTop: 0, height: 0 }}
            animate={{ opacity: 1, marginTop: 26, height: 'auto' }}
            exit={{
              opacity: 0,
              marginTop: 0,
              transform: 'translateY(104px)',
              height: 0,
            }}
          >
            <PixelBorder inset btn>
              <div
                onClick={() => changePlaylistIndex(false)}
                className="pt-1 px-2 md:pl-1 md:pr-2"
              >
                {/* Prev */}
                <Image
                  className="scale-x-[-1]"
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
                className="pt-1 px-2 md:pl-2 md:pr-1"
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
