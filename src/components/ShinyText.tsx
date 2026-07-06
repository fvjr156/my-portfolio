import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, useMotionValue, useAnimationFrame, useTransform, MotionValue } from 'framer-motion';
import type { GradientStyleProps, ShinyTextProps } from '../types/Types';

const ShinyText = ({
  children,
  disabled = false,
  speed = 2,
  className = '',
  color = '#b5b5b5',
  shineColor = '#ffffff',
  spread = 120,
  yoyo = false,
  pauseOnHover = false,
  direction = 'left',
  delay = 0
}: ShinyTextProps) => {
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const progress = useMotionValue<number>(0);
  const elapsedRef = useRef<number>(0);
  const lastTimeRef = useRef<null | number>(null);
  const directionRef = useRef<number>(direction === 'left' ? 1 : -1);

  const animationDuration: number = speed * 1000;
  const delayDuration: number = delay * 1000;

  useAnimationFrame(time => {
    if (disabled || isPaused) {
      lastTimeRef.current = null;
      return;
    }

    if (lastTimeRef.current === null) {
      lastTimeRef.current = time;
      return;
    }

    const deltaTime: number = time - lastTimeRef.current;
    lastTimeRef.current = time;

    elapsedRef.current += deltaTime;

    if (yoyo) {
      const cycleDuration: number = animationDuration + delayDuration;
      const fullCycle: number = cycleDuration * 2;
      const cycleTime: number = elapsedRef.current % fullCycle;

      if (cycleTime < animationDuration) {
        // Forward animation: 0 -> 100
        const p: number = (cycleTime / animationDuration) * 100;
        progress.set(directionRef.current === 1 ? p : 100 - p);
      } else if (cycleTime < cycleDuration) {
        // Delay at end
        progress.set(directionRef.current === 1 ? 100 : 0);
      } else if (cycleTime < cycleDuration + animationDuration) {
        // Reverse animation: 100 -> 0
        const reverseTime: number = cycleTime - cycleDuration;
        const p: number = 100 - (reverseTime / animationDuration) * 100;
        progress.set(directionRef.current === 1 ? p : 100 - p);
      } else {
        // Delay at start
        progress.set(directionRef.current === 1 ? 0 : 100);
      }
    } else {
      const cycleDuration: number = animationDuration + delayDuration;
      const cycleTime: number = elapsedRef.current % cycleDuration;

      if (cycleTime < animationDuration) {
        // Animation phase: 0 -> 100
        const p: number = (cycleTime / animationDuration) * 100;
        progress.set(directionRef.current === 1 ? p : 100 - p);
      } else {
        // Delay phase - hold at end (shine off-screen)
        progress.set(directionRef.current === 1 ? 100 : 0);
      }
    }
  });

  useEffect(() => {
    directionRef.current = direction === 'left' ? 1 : -1;
    elapsedRef.current = 0;
    progress.set(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [direction]);

  // Transform: p=0 -> 150% (shine off right), p=100 -> -50% (shine off left)
  const backgroundPosition: MotionValue<string> = useTransform(progress, p => `${150 - p * 2}% center`);

  const handleMouseEnter: (()=>void) = useCallback(() => {
    if (pauseOnHover) setIsPaused(true);
  }, [pauseOnHover]);

  const handleMouseLeave: (()=>void) = useCallback(() => {
    if (pauseOnHover) setIsPaused(false);
  }, [pauseOnHover]);

  const gradientStyle: GradientStyleProps = {
    backgroundImage: `linear-gradient(${spread}deg, ${color} 0%, ${color} 35%, ${shineColor} 50%, ${color} 65%, ${color} 100%)`,
    backgroundSize: '200% auto',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  };

  return (
    <motion.span
      className={`inline-block ${className}`}
      style={{ ...gradientStyle, backgroundPosition }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.span>
  );
};

export default ShinyText;
