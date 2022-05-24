import { useState } from 'react';
import { motion } from 'framer-motion';

function Motionlayout() {
  const [show, setShow] = useState(false);

  return (
    <div>
      <button onClick={() => setShow(!show)}>mostra</button>
      <motion.p layoutId="texto" className="text-5xl">
        hola
      </motion.p>

      {show && (
        <motion.p layoutId="texto" className="text-5xl">
          hola
        </motion.p>
      )}
    </div>
  );
}

export default Motionlayout;
