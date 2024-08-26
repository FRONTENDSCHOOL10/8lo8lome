import { useLayoutEffect, useRef, useState } from 'react';

function useInView() {
  const [inView, setInView] = useState(false);
  const rootRef = useRef(null);
  const targetRef = useRef(null);

  useLayoutEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting) {
          setInView(true);
        } else {
          setInView(false);
        }
      },
      {
        root: rootRef.current,
      }
    );

    const { current: target } = targetRef;

    if (target) {
      observer.observe(target);
    }

    return () => {
      observer.unobserve(target);
    };
  }, []);

  return [targetRef, inView, rootRef];
}

export default useInView;
