import { useEffect, useState } from "react";
const useCountDown = (startValue) => {
  const [countDown, setCountDown] = useState(startValue);
  const [start, setStart] = useState(false);
  useEffect(() => {
    if (start && countDown > 0) {
      const interval = setInterval(() => setCountDown((pre) => pre - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [start, countDown]);
  const startCountDown = () => setStart(true);
  return {
    countDown,
    setCountDown,
    startCountDown,
    setStart
  };
};
export { useCountDown };
