import { useState, useEffect } from 'react';

const useAnimation = (initialState = false, delay = 300) => {
  const [isVisible, setIsVisible] = useState(initialState);
  const [shouldRender, setShouldRender] = useState(initialState);

  useEffect(() => {
    let timeoutId;

    if (initialState) {
      setShouldRender(true);
      timeoutId = setTimeout(() => setIsVisible(true), 50);
    } else {
      setIsVisible(false);
      timeoutId = setTimeout(() => setShouldRender(false), delay);
    }

    return () => clearTimeout(timeoutId);
  }, [initialState, delay]);

  return [shouldRender, isVisible];
};

export default useAnimation;
