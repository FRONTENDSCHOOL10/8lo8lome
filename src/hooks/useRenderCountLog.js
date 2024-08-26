import useRenderCount from './useRenderCount';

/**@type {(componentName: string, color?: string, weight?: number, size?: number) => void} */
function useRenderCountLog(
  componentName,
  color = '#777',
  weight = 500,
  size = 16
) {
  const renderCount = useRenderCount();

  console.log(
    `%c${componentName} 컴포넌트 렌더링 횟수 = ${renderCount}`,
    `color: ${color}; font-weight: ${weight}; font-size: ${size}px`
  );
}

export default useRenderCountLog;
