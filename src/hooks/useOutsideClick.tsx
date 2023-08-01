import React, { useEffect } from "react";

export const useOutsideClick = (
  ref: React.MutableRefObject<any>,
  action: Function
) => {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target)) {
        action();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, action]);
};
