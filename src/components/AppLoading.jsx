import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import AppSpinner from './AppSpinner';

const alarm = [
  {
    id: 1,
    notification: '로딩 중입니다.',
  },
  {
    id: 2,
    notification: '로딩이 끝났습니다.',
  },
];

export default function AppLoading() {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(alarm[0].notification);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setMessage(alarm[1].notification);
    },3000);
    return () => clearTimeout(timer);
    }, []);

  return (
    <></>
  )
}
