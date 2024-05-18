import styles from "./NavBar.module.css";
import YuGiOhImg from "../../assets/yugioh-logo.png";
import { useNavigate } from "react-router-dom";
import { BiCart } from "react-icons/bi";
import { useContext } from "react";
import CartMenu from "../cart-menu/CartMenu";
import { CartContext } from "../../context/CartContext";
import { BsHouse } from "react-icons/bs";
import { useMenuCart } from "../../hooks/useMenuCart";

function NavBar() {
  const navigate = useNavigate();
  const cartProvider = useContext(CartContext);

  const {isCartMenu, setMenu} = useMenuCart();

  return (
    <div className={styles.nav_bar}>
      <h2 onClick={() => navigate("/")}>Home</h2>
      <BsHouse className={styles.btn_home} onClick={() => navigate("/")}/>

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

      {isCartMenu && <CartMenu setMenu={setMenu}/>}
    </div>
  );
}

export default NavBar;
