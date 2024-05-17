import styles from "./CartMenu.module.css";

interface CartMenuProps {
  setMenu: (isMenu: boolean) => void;
}

function CartMenu({ setMenu }: CartMenuProps) {
  return (
    <div className={styles.container_cart}>
      <div className={styles.cart}>
        <div className={styles.btn_close_cart}>
          <button onClick={() => setMenu(false)}>X</button>
        </div>

        <h3>Carrinho</h3>

        <div className={styles.cart_data}></div>

        <div className={styles.container_show_cart}>
          <button className={styles.btn_show_cart}>Ver carrinho</button>
        </div>
      </div>
    </div>
  );
}

export default CartMenu;
