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

  const invalidPaths: string[] = ["cart", "card", "checkout"]

  function isPathNotValidForFooter(): boolean {
    return invalidPaths.some(pathname => path.pathname.includes(pathname));
  }

  return isFooter;
};
