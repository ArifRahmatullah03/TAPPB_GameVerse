import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollReset = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Reset posisi scroll ke atas setiap kali rute berubah
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollReset;
