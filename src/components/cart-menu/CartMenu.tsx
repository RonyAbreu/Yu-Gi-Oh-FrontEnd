import { BiTrash } from "react-icons/bi";
import { useCart } from "../../hooks/useCart";
import styles from "./CartMenu.module.css";
import { useEffect, useState } from "react";

interface CartMenuProps {
  setMenu: (isMenu: boolean) => void;
}

function CartMenu({ setMenu }: CartMenuProps) {
  const { cartItens, removeItem } = useCart();
  const [subtotal, setSubTotal] = useState(0);

  useEffect(() => {
    let total: number = 0;
    cartItens.map((item) => {
      total += item.subtotal;
    });
    setSubTotal(total);
  }, [cartItens, subtotal]);

  return (
    <div className={styles.container_cart}>
      <div className={styles.cart}>
        <div className={styles.btn_close_cart}>
          <button onClick={() => setMenu(false)}>X</button>
        </div>

        <h3>Carrinho</h3>

        <div className={styles.cart_data}>
          {cartItens && cartItens.length > 0 ? (
            cartItens.map((cartItem) => (
              <div key={cartItem.image_url} className={styles.cart_item}>
                <img
                  src={cartItem.image_url}
                  alt="card-image"
                  width={60}
                  height={90}
                />

                <div className={styles.cart_item_info}>
                  <h4>{cartItem.name}</h4>
                  <span>{cartItem.quantity} x</span>
                  <p>R${cartItem.price}</p>
                </div>

                <div className={styles.cart_item_btn}>
                  <BiTrash
                    onClick={() => {
                      removeItem(cartItem.id);
                      showSubTotal();
                    }}
                  />
                </div>
              </div>
            ))
          ) : (
            <p>Seu carrinho está vazio.</p>
          )}
        </div>

        <div className={styles.container_show_cart}>
          <p>Subtotal: R${subtotal}</p>
          <button className={styles.btn_show_cart}>Ver carrinho</button>
        </div>
      </div>
    </div>
  );
}

export default CartMenu;
