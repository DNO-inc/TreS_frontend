import { useState, useEffect } from "react";

const DELAY = 800;

const throttle = (callback, delay = DELAY) => {
  let shouldWait = false;
  let waitingArgs: null | unknown[] = null;

  const timeoutFunc = () => {
    if (waitingArgs === null) {
      shouldWait = false;
    } else {
      callback(...waitingArgs);
      waitingArgs = null;
      setTimeout(timeoutFunc, delay);
    }
  };

  return (...args) => {
    if (shouldWait) {
      waitingArgs = args;
      return;
    }

    callback(...args);
    shouldWait = true;

    setTimeout(timeoutFunc, delay);
  };
};

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleThrottledResize = throttle(width => {
      const isTablet = width < 900;
      setWindowWidth(isTablet ? width * 1.5 : width);
    });

    window.addEventListener("resize", () => {
      handleThrottledResize(window.innerWidth);
    });

    return () => window.removeEventListener("resize", handleThrottledResize);
  }, []);

  return windowWidth;
};

export { useWindowWidth };
