import { useState, useEffect } from "react";

export const useSafari = (): boolean => {
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    const checkSafari = () => {
      const userAgent = navigator.userAgent;
      const isSafariBrowser = /^((?!chrome|android).)*safari/i.test(userAgent);
      setIsSafari(isSafariBrowser);
    };

    checkSafari();
  }, []);

  return isSafari;
};

export default useSafari;
