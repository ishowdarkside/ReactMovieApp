import { useEffect } from "react";
export function useKey(key, callbackFunc) {
  useEffect(() => {
    const callback = (e) => {
      if (e.code.toLowerCase() === `${key.toLowerCase()}`) callbackFunc();
    };
    document.addEventListener("keydown", callback);

    return function () {
      document.removeEventListener("keydown", callback);
    };
  }, [key, callbackFunc]);
}
