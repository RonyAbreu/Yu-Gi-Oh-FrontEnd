import styles from "./Checkout.module.css";
import { useCart } from "../../hooks/useCart";
import { useState, useEffect } from "react";
import { useValidAddress } from "../../hooks/useValidAddress";
import { Address } from "../../types/Address";

function Checkout() {
  const { cartItens } = useCart();
  const [subtotal, setSubTotal] = useState<number>(0);

  const { register, handleSubmit, errors } = useValidAddress();

  useEffect(() => {
    let total: number = 0;
    cartItens.map((item) => {
      total += item.subtotal;
    });
    setSubTotal(total);
  }, [cartItens]);

  function finalizeOrder(address: Address) {
    console.log(address);
  }

  return (
    <div className={styles.checkout_container}>
      <div className={styles.checkout}>
        <div className={styles.checkout_column}>
          <h2 className={styles.title}>Revise seu Pedido</h2>
          <div className={styles.checkout_items}>
            {cartItens &&
              cartItens.map((item) => (
                <div key={item.id} className={styles.item}>
                  <img
                    src={item.image_url}
                    alt="card-image"
                    width={60}
                    height={90}
                  />

                  <div className={styles.item_info}>
                    <h3>Nome: {item.name}</h3>
                    <span>Quantidade: {item.quantity} x</span>
                    <p>Preço: R${item.price}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
        
        <div className={styles.checkout_column}>
          <h2 className={styles.title}>Endereço</h2>
          <form className={styles.address_form}>
            <label>
              <p>Rua</p>
              <input
                type="text"
                placeholder="Digite o nome de sua rua"
                {...register("street")}
              />
              <span>{errors.street?.message}</span>
            </label>
            <label>
              <p>Bairro</p>
              <input
                type="text"
                placeholder="Digite o nome de seu bairro"
                {...register("burgh")}
              />
              <span>{errors.burgh?.message}</span>
            </label>
            <label>
              <p>Número da Casa</p>
              <input
                type="number"
                min={1}
                placeholder="Digite o número de sua casa"
                {...register("number")}
              />
              <span>{errors.number?.message}</span>
            </label>
            <label>
              <p>Cidade</p>
              <input
                type="text"
                placeholder="Digite o nome de sua cidade"
                {...register("city")}
              />
              <span>{errors.city?.message}</span>
            </label>
            <label>
              <p>Estado</p>
              <input
                type="text"
                placeholder="Digite o nome do seu estado"
                {...register("state")}
              />
              <span>{errors.state?.message}</span>
            </label>
          </form>
        </div>

        <div className={styles.checkout_column}>
          <h2 className={styles.title}>Forma de Pagamento</h2>
          <div className={styles.payments_methods}>
            <div className={styles.payment}>
              <input type="radio" name="payment" id="pix" />
              <label htmlFor="pix">PIX</label>
            </div>
            <div className={styles.payment}>
              <input type="radio" name="payment" id="ticket" />
              <label htmlFor="ticket">Boleto</label>
            </div>
            <div className={styles.payment}>
              <input type="radio" name="payment" id="card" />
              <label htmlFor="card">Cartão</label>
            </div>
          </div>

          <div className={styles.total}>
            <span>Total R${subtotal.toFixed(2)}</span>
          </div>

          <button
            className={styles.btn_payment}
            onClick={handleSubmit(finalizeOrder)}
          >
            Finalizar Pedido
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
