import styles from "./NavBar.module.css";
import YuGiOhImg from "../../assets/yugioh-logo.png";
import { useNavigate } from "react-router-dom";
import { BiCart } from "react-icons/bi";
import { useEffect, useState } from "react";
import CartMenu from "../cart-menu/CartMenu";

function NavBar() {
  const navigate = useNavigate();
  const [countItens, setCountItens] = useState(0);

  const [isMenu, setMenu] = useState(false);

  useEffect(() => {
    if (isMenu) {
      document.body.classList.add(styles.no_scroll);
    } else {
      document.body.classList.remove(styles.no_scroll);
    }
  }, [isMenu]);

  return (
    <div className={styles.nav_bar}>
      <img
        src={YuGiOhImg}
        alt="yugioh-logo"
        width="180"
        height="70"
        onClick={() => navigate("/")}
      />

      <div className={styles.container_cart} onClick={() => setMenu(true)}>
        <BiCart className={styles.cart} />
        <span className={styles.count_itens}>{countItens}</span>
      </div>

      {isMenu && <CartMenu setMenu={setMenu}/>}
    </div>
  );
}

export default NavBar;
