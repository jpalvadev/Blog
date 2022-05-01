import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

import styles from '../styles/PixelBorder.module.css';

const getStyle = (el, property) =>
  getComputedStyle(el).getPropertyValue(property);

const setStyle = (el, property, newValue) =>
  el.style.setProperty(property, newValue);

export default function PixelBorder({
  shadow,
  children,
  btn,
  inset,
  insetColor,
  bgColor,
  rounded,
  canHover,
  classNames,
}) {
  const pixelContainer = useRef(null);

  const [isHover, setIsHover] = useState(false);
  const onMouseEnter = () => setIsHover(true);
  const onMouseLeave = () => setIsHover(false);

  useEffect(() => {
    // Inset & Inset Color
    if (inset && insetColor) {
      setStyle(pixelContainer.current, '--pixel-inset-color', insetColor);
    }

    // Background Color
    if (bgColor) {
      setStyle(pixelContainer.current, '--pixel-card-bg-color', bgColor);
    } else {
      setStyle(pixelContainer.current, '--pixel-card-bg-color', '#fff');
    }
  }, []);

  return (
    <motion.div
      ref={pixelContainer}
      initial={{ x: 0, y: 0 }}
      whileHover={{
        x: canHover ? -8 : 0,
        y: canHover ? -8 : 0,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`${styles.pixelWrapper} ${
        rounded ? styles.pixelBorder2 : styles.pixelBorder1
      } ${inset ? styles.pixelInset : ''} ${btn ? styles.pixelBtn : ''} ${
        shadow ? styles.pixelShadow : ''
      } ${classNames}`}
    >
      {children}
    </motion.div>
  );
}
