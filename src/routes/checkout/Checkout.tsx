import styles from "./Checkout.module.css";
import { useCart } from "../../hooks/useCart";
import { useState, useEffect } from "react";
import { OrderDetail } from "../../types/OrderDetail";
import { useOrderReview } from "../../hooks/useOrderReview";
import { useNavigate } from "react-router-dom";
import { useValidOrderDetails } from "../../hooks/useValidOrderDetails";

function Checkout() {
  const { cartItens } = useCart();
  const [total, setTotal] = useState<number>(0);
  const navigate = useNavigate();

  const { register, handleSubmit, errors } = useValidOrderDetails();

  const { setOrderDetails } = useOrderReview();

  useEffect(() => {
    let total: number = 0;
    cartItens.map((item) => {
      total += item.subtotal;
    });
    setTotal(total);
  }, [cartItens]);

  function finalizeOrder(orderDetail : OrderDetail) {
    orderDetail.totalValue = total;
    setOrderDetails(orderDetail);
    navigate("/review");
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
              <p>Email</p>
              <input
                type="email"
                placeholder="Digite o seu email"
                {...register("email")}
              />
              <span className={styles.error}>{errors.email?.message}</span>
            </label>
            <label>
              <p>Rua</p>
              <input
                type="text"
                placeholder="Digite o nome de sua rua"
                {...register("street")}
              />
              <span className={styles.error}>{errors.street?.message}</span>
            </label>
            <label>
              <p>Bairro</p>
              <input
                type="text"
                placeholder="Digite o nome de seu bairro"
                {...register("burgh")}
              />
              <span className={styles.error}>{errors.burgh?.message}</span>
            </label>
            <label>
              <p>Número da Casa</p>
              <input
                type="number"
                min={1}
                placeholder="Digite o número de sua casa"
                {...register("number")}
              />
              <span className={styles.error}>{errors.number?.message}</span>
            </label>
            <label>
              <p>Cidade</p>
              <input
                type="text"
                placeholder="Digite o nome de sua cidade"
                {...register("city")}
              />
              <span className={styles.error}>{errors.city?.message}</span>
            </label>
            <label>
              <p>Estado</p>
              <input
                type="text"
                placeholder="Digite o nome do seu estado"
                {...register("state")}
              />
              <span className={styles.error}>{errors.state?.message}</span>
            </label>
          </form>
        </div>

        <div className={styles.checkout_column}>
          <h2 className={styles.title}>Forma de Pagamento</h2>
          <div className={styles.payments_methods}>
            <div className={styles.payment}>
              <input type="radio" id="pix" value="pix" {...register("payment")} />
              <label htmlFor="pix">PIX</label>
            </div>
            <div className={styles.payment}>
              <input type="radio" id="ticket" value="boleto" {...register("payment")} />
              <label htmlFor="ticket">Boleto</label>
            </div>
            <div className={styles.payment}>
              <input type="radio" id="card" value="cartão" {...register("payment")} />
              <label htmlFor="card">Cartão</label>
            </div>
            <span className={styles.error}>{errors.payment?.message}</span>
          </div>

          <div className={styles.total}>
            <span>Total R${total.toFixed(2)}</span>
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