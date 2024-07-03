import { useState ,useEffect } from "react";

export const UseOnline = () => {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    window.addEventListener("online", () => {
      setIsOnline(true);
    });
    window.addEventListener("offline", () => {
      setIsOnline(false);
    });
  }, []);

  return isOnline;
};
