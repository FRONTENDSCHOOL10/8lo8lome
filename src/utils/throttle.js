// 기존 코드
// /** @type {(callback: () => void, timeout: number) => (...args: any[]) => void} */
// export function throttle(callback, timeout = 300) {
//   let timer = null;
//   return (...args) => {
//     if (!timer) {
//       timer = setTimeout(() => {
//         callback.apply(null, args);
//         timer = null;
//       }, timeout);
//     }
//   };
// }

//변경된 코드
/** @type {(callback: () => void, timeout: number) => (...args: any[]) => void} */
export function throttle(callback, timeout = 300) {
  let lastCall = 0;
  return (...args) => {
    const now = new Date().getTime();
    if (now - lastCall >= timeout) {
      lastCall = now;
      callback.apply(null, args);
    }
  };
}
