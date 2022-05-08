import { motion, useCycle } from 'framer-motion';
import Image from 'next/image';
import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { SKY_COLOR } from '../config';
import styles from '../styles/Cloud.module.css';

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

function setCloudAnimation(e) {
  const cloud = e.target;
  cloud.style.animation = 'none';
  setTimeout(() => {
    cloud.style.animation = `cloud ${getRandom(25, 55)}s linear ${getRandom(
      5,
      40
    )}s infinite`;
    cloud.style.top = `${getRandom(0, 100)}%`;
    cloud.style.left = `-${cloud.offsetWidth}px`;
  }, 0);
  // setTimeout(() => {
  //   cloud.style.animation = `cloud ${getRandom(
  //     15,
  //     35
  //   )}s infinite linear ${getRandom(5, 40)}s`;
  //   cloud.style.top = `${getRandom(0, 100)}%`;
  //   cloud.style.left = `-${cloud.offsetWidth}px`;
  // }, 0);
}

let random = [];
// const widths = [110, 163, 213];
const widths = [125, 188, 250];

export function Cloud({ cloudsNumber }) {
  const [render, setRender] = useState(false);

  useEffect(() => {
    // useLayoutEffect(() => {

    console.log('runs');

    random = []; // Reseteamos random para no sumar nubes
    for (let i = 0; i < cloudsNumber; i++) {
      const randomito = Math.floor(getRandom(0, 3));
      random.push({
        img: `/images/cloud-mini-${randomito + 1}.png`,
        width: widths[randomito],
      });
    }
    setRender(true);
  }, []);

  if (render) {
    return (
      <div
        className="fixed w-screen h-screen top-0 left-0 z-[-1]"
        style={{ backgroundColor: SKY_COLOR }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          // style={{ backgroundColor: SKY_COLOR }}
          className="fixed w-screen h-screen top-0 left-0 z-[-1]"
        >
          {random.map((randomNum, i) => (
            <div
              className="cloud"
              key={i}
              onAnimationIteration={(e) => setCloudAnimation(e)}
              style={{
                animation: `cloud ${getRandom(25, 55)}s linear -${getRandom(
                  5,
                  40
                )}s infinite`,
                top: `${getRandom(0, 100)}%`,
                // left: `-${widths[randomNum]}px`,
                left: `-${randomNum.width}px`,
              }}

              // style={{
              //   animation: `cloud ${getRandom(
              //     15,
              //     35
              //   )}s infinite linear ${getRandom(5, 40)}s`,
              //   top: `${getRandom(0, 100)}%`,
              //   // left: `-${widths[randomNum]}px`,
              //   left: `-${randomNum.width}px`,
              // }}
            >
              <Image
                src={randomNum.img}
                alt="cloud"
                width={randomNum.width}
                height={80}
              />
            </div>
          ))}
        </motion.div>
      </div>
    );
  }
  return <div></div>;
}

export const MemoizedCloud = React.memo(Cloud);
