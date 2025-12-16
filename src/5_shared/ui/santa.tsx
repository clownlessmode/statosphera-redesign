import { useState, useEffect, useRef } from "react";

const useSecretCode = (
  secretCode: string,
  onMatch: () => void,
  timeout = 3000,
) => {
  const inputBuffer = useRef<string>("");
  const startTime = useRef<number>(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const now = Date.now();

      if (inputBuffer.current === "" || now - startTime.current > timeout) {
        inputBuffer.current = e.key;
        startTime.current = now;
      } else {
        inputBuffer.current += e.key;
      }

      if (inputBuffer.current.includes(secretCode)) {
        onMatch();
        inputBuffer.current = "";
        startTime.current = 0;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [secretCode, timeout]);
};

const Santa = () => {
  const [isVisible, setIsVisible] = useState(false);

  useSecretCode(
    "2026",
    () => {
      setIsVisible(true);

      setTimeout(() => setIsVisible(false), 9900);
    },
    3000,
  );

  return (
    <>
      {isVisible && (
        <img
          src="/new-year/santa.gif"
          loading="lazy"
          className="fixed inset-0 w-auto h-1/2 mx-auto mt-auto mb-0 z-100 pointer-events-none"
        />
      )}
    </>
  );
};

export default Santa;
