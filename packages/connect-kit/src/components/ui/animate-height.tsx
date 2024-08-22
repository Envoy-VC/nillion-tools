import React, { useEffect, useRef, useState } from 'react';

import { cn } from '~/lib/utils';

import { motion, cubicBezier } from 'framer-motion';

interface AnimateChangeInHeightProps {
  children: React.ReactNode;
  className?: string;
}

export const AnimateChangeInHeight: React.FC<AnimateChangeInHeightProps> = ({
  children,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState<number | 'auto'>('auto');

  useEffect(() => {
    if (containerRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        // We only have one entry, so we can use entries[0].
        const observedHeight = entries[0]?.contentRect.height;
        if (observedHeight) setHeight(observedHeight);
      });

      resizeObserver.observe(containerRef.current);

      return () => {
        // Cleanup the observer when the component is unmounted
        resizeObserver.disconnect();
      };
    }
  }, []);

  return (
    <motion.div
      animate={{ height }}
      className={cn(className, 'overflow-hidden')}
      style={{ height }}
      transition={{ duration: 0.5, ease: cubicBezier(0.77, 0, 0.175, 1) }}
    >
      <div ref={containerRef}>{children}</div>
    </motion.div>
  );
};
