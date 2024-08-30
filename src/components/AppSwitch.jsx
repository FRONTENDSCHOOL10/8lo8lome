// import { animate, spring } from 'motion';
// import { useRef, useEffect, memo } from 'react';
// import { bool, func, number } from 'prop-types';
// import S from '@/styles/components/AppSwitch.module.css';

// const springAnimation = spring({ stiffness: 500, damping: 40 });

// AppSwitch.propTypes = {
//   value: bool,
//   onToggle: func,
//   ratio: number,
// };

// function AppSwitch({ value = false, onToggle, ratio = 2, ...restProps }) {
//   const buttonRef = useRef(null);
//   const ballRef = useRef(null);

//   useEffect(() => {
//     const el = ballRef.current;

//     const ratio = parseInt(
//       getComputedStyle(buttonRef.current).getPropertyValue('--ratio'),
//       10
//     );

//     const size = parseInt(
//       getComputedStyle(el).getPropertyValue('block-size'),
//       10
//     );

//     if (value) {
//       animate(el, { x: size * (ratio - 1) }, { easing: springAnimation });
//     } else {
//       animate(el, { x: 0 }, { easing: springAnimation });
//     }
//   }, [value]);

//   const handleToggle = () => onToggle?.(!value);

//   return (
//     <button
//       ref={buttonRef}
//       role="switch"
//       type="button"
//       aria-checked={value}
//       className={S.component}
//       style={{ '--ratio': ratio }}
//       onClick={handleToggle}
//       {...restProps}
//     >
//       <span className={S.ball} ref={ballRef} />
//     </button>
//   );
// }

// export default memo(AppSwitch);
