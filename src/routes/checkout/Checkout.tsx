import styles from "./Checkout.module.css";
import { useCart } from "../../hooks/useCart";
import { useState, useEffect } from "react";

function Checkout() {
  const { cartItens } = useCart();
  const [subtotal, setSubTotal] = useState(0);

  useEffect(() => {
    let total: number = 0;
    cartItens.map((item) => {
      total += item.subtotal;
    });
    setSubTotal(total);
  }, [cartItens]);

  return (
    <div className={styles.checkout}>
      <div className={styles.address +" "+ styles.checkout_column}>
        <h2>Endereço</h2>
        <form className={styles.address_form}>
          <label>
            <span>Rua</span>
            <input type="text" placeholder="Digite o nome de sua rua" />
          </label>
          <label>
            <span>Bairro</span>
            <input type="text" placeholder="Digite o nome de seu bairro" />
          </label>
          <label>
            <span>Número</span>
            <input type="text" placeholder="Digite o número de sua casa" />
          </label>
          <label>
            <span>Cidade</span>
            <input type="text" placeholder="Digite o nome de sua cidade" />
          </label>
          <label>
            <span>Estado</span>
            <input type="text" placeholder="Digite o nome do seu estado" />
          </label>
        </form>
      </div>

      <div className={styles.item_review +" "+ styles.checkout_column}>
        <h2>Revise seu Pedido</h2>
        <div>
          {cartItens &&
            cartItens.map((item) => (
              <div key={item.id}>
                <img
                  src={item.image_url}
                  alt="card-image"
                  width={60}
                  height={90}
                />

                <div>
                  <h3>Nome: {item.name}</h3>
                  <span>Quantidade: {item.quantity} x</span>
                  <p>Preço: R${item.price}</p>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className={styles.payment +" "+ styles.checkout_column}>
        <h2>Forma de Pagamento</h2>
        <div>
          <div>
            <input type="radio" name="payment" />
            <span>PIX</span>
          </div>
          <div>
            <input type="radio" name="payment" />
            <span>Boleto</span>
          </div>
          <div>
            <input type="radio" name="payment" />
            <span>Cartão</span>
          </div>
        </div>

        <span>Total {subtotal}</span>

        <button>Finalizar Pedido</button>
      </div>
    </div>
  );
}

export default Checkout;
