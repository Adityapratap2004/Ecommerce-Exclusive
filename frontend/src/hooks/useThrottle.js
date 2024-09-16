import { useRef } from 'react';

function useThrottle(callback, limit) {
  const lastFunc = useRef(null);
  const lastRan = useRef(Date.now());

  const throttledFunction = (...args) => {
    const now = Date.now();

    if (now - lastRan.current >= limit) {
      callback(...args);
      lastRan.current = now;
    } else {
      if (lastFunc.current) clearTimeout(lastFunc.current);
      lastFunc.current = setTimeout(() => {
        callback(...args);
        lastRan.current = Date.now();
      }, limit - (now - lastRan.current));
    }
  };

  return throttledFunction;
}

export default useThrottle;
