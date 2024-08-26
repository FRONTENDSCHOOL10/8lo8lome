import { useState, useEffect, useDebugValue, useCallback } from 'react';
import useOnline from './useOnline';

function useClock() {
  const isOnline = useOnline();
  const [date, setDate] = useState(new Date());
  const [turnOn, setTurnOn] = useState(false);

  const onOff = useCallback((isOn) => {
    if (typeof isOn === 'function') {
      setTurnOn((t) => isOn(t));
    } else {
      setTurnOn(isOn);
    }
  }, []);

  useEffect(() => {
    let intervalId;

    if (isOnline) {
      if (turnOn) {
        const intervalCallback = () => setDate(new Date());
        intervalId = setInterval(intervalCallback, 1000);
      }
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isOnline, turnOn]);

  const timeString = date.toLocaleTimeString();

  useDebugValue(date, () => timeString);

  return { time: timeString, turnOn, onOff };
}

export default useClock;
