import useStateWithCallback from './useStateWithCallback';

function useToggle(isOn = false, callback) {
  const [isToggle, setIsToggle] = useStateWithCallback(() => {
    if (typeof isOn !== 'boolean') {
      isOn = Boolean(isOn);
    }

    return isOn;
  }, callback);

  return [isToggle, setIsToggle];
}

export default useToggle;
