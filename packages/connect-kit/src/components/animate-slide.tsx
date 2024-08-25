import type { PropsWithChildren } from 'react';

import { cubicBezier, motion } from 'framer-motion';

export const AnimateSlide = ({ children }: PropsWithChildren) => {
  return (
    <motion.div
      exit={{ opacity: 0.6, x: 20 }}
      initial={{ opacity: 0.6, x: -20 }}
      transition={{ duration: 0.6, ease: cubicBezier(0.16, 1, 0.3, 1) }}
      animate={{
        opacity: 1,
        x: 0,
      }}
    >
      {children}
    </motion.div>
  );
};
