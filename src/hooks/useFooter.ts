import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const useFooter = () => {
  const [isFooter, setFooter] = useState(true);
  const path = useLocation();

  useEffect(() => {
    if (path.pathname.includes("cart")) {
      setFooter(false);
    } else {
      setFooter(true);
    }
  }, [path.pathname]);

  return isFooter;
};
