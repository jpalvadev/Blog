import { motion, useCycle } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import styles from '../styles/Cloud.module.css';

export default function Cloud({ cloudsNumber }) {
  // const refe = useRef();
  const generateClouds = () => {
    const clouds = [];
    for (let i = 0; i <= cloudsNumber; i++) {
      const random = parseInt(getRandom(0, 3));
      const widths = [110, 163, 213];
      // const wiwi = widths[random];
      const cloud = {
        img: `/images/cloud-mini-${random + 1}.png`,
        width: widths[random],
      };
      // console.log(cloud);
      clouds.push(
        <div
          className="cloud"
          key={i}
          onAnimationIteration={(e) => setCloudAnimation(e)}
          // style={{ width: `${widths[random]}px`, height: '80px' }}
          style={{ width: `${cloud.width}px`, height: '80px' }}
        >
          <Image
            // src={`/images/cloud-mini-${random + 1}.png`}
            src={cloud.img}
            alt="cloud"
            // width={wiwi}
            // height={80}
            layout="fill"
          />
        </div>
      );
    }
    console.log(clouds);
    return clouds;
  };

  const nubes = generateClouds();

  function setCloudAnimation(e) {
    // const cloud = e.target || e;
    const cloud = e.target;
    // const cloud = e.target.parentElement;
    // console.log(e.target);
    cloud.style.animation = 'none';
    setTimeout(() => {
      cloud.style.animation = `cloud ${getRandom(
        15,
        35
      )}s infinite linear ${getRandom(5, 40)}s`;
      cloud.style.top = `${getRandom(0, 100)}%`;
    }, 0);
  }

  function getRandom(min, max) {
    return (Math.random() * (max - min) + min).toFixed(2);
  }

  // return <div className="fixed w-screen h-screen">{generateClouds()}</div>;
  return <div className="fixed w-screen h-screen">{nubes}</div>;
}
