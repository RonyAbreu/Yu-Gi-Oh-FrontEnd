import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const useFooter = () => {
  const [isFooter, setFooter] = useState(true);
  const path = useLocation();

  useEffect(() => {
    if (isPathNotValidForFooter()) {
      setFooter(false);
    } else {
      setFooter(true);
    }
  }, [path.pathname]);

  function isPathNotValidForFooter(): boolean {
    return path.pathname.includes("cart") || path.pathname.includes("card");
  }

  return isFooter;
};
