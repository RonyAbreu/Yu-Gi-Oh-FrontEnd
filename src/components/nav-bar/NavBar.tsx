import styles from "./NavBar.module.css";
import YuGiOhImg from "../../assets/yugioh-logo.png";
import { useNavigate } from "react-router-dom";
import { BiCart } from "react-icons/bi";
import { useContext, useEffect, useState } from "react";
import CartMenu from "../cart-menu/CartMenu";
import { CartContext } from "../../context/CartContext";

function NavBar() {
  const navigate = useNavigate();
  const cartProvider = useContext(CartContext);

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
        <span className={styles.count_itens}>{cartProvider?.countItens}</span>
      </div>

      {isMenu && <CartMenu setMenu={setMenu}/>}
    </div>
  );
}

export default NavBar;
