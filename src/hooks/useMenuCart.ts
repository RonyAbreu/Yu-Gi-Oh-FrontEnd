import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useMenuCart = () => {
  const [isCartMenu, setMenu] = useState(false);
  const path = useLocation();

  useEffect(() => {
    if (isCartMenu) {
      document.body.classList.add("no_scroll");
    } else {
      document.body.classList.remove("no_scroll");
    }
  }, [isCartMenu, path.pathname]);

  return { isCartMenu, setMenu };
};
