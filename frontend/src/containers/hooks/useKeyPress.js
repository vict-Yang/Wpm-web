import { useState, useEffect } from "react";

const useKeyPress = (callback) => {
  const [keyPressed, setKeyPressed] = useState();
  useEffect(() => {
    const downHandler = (e) => {
      const { key } = e;
      if (key.length === 1 || key === "Backspace") {
        setKeyPressed(key);
        callback && callback(key);
      }

      if (e.keyCode == 32 && e.target == document.body) {
        // Prevent spaces from scrolling the page
        e.preventDefault();
      }
    };
    const upHandler = () => {
      setKeyPressed(null);
    };
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, []);
  return keyPressed;
};

export { useKeyPress };
