import { BiTrash } from "react-icons/bi";
import { useCart } from "../../hooks/useCart";
import styles from "./Cart.module.css";
import { useEffect, useState } from "react";

function Cart() {
  const { cartItens, removeItem } = useCart();
  const [subtotal, setSubTotal] = useState(0);

  const [cep, setCep] = useState<number|string>("");

  useEffect(() => {
    let total: number = 0;
    cartItens.map((item) => {
      total += item.subtotal;
    });
    setSubTotal(total);
  }, [cartItens]);

  function calculateCep() {}

  function changeCep(cep: string) {
    const cepValid: number = Number(cep);

    if(isNaN(cepValid) || cep == ""){
      setCep("")
      return;
    }

    setCep(cepValid);
  }

  return (
    <div className={styles.container_cart}>
      <div className={styles.cart}>
        <h1>Seu Carrinho</h1>
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
                  <h3>Nome: {cartItem.name}</h3>
                  <span>Quantidade: {cartItem.quantity} x</span>
                  <p>Preço: R${cartItem.price}</p>
                </div>

                <div className={styles.cart_item_btn}>
                  <BiTrash
                    onClick={() => {
                      removeItem(cartItem.id);
                    }}
                  />
                </div>
              </div>
            ))
          ) : (
            <p>Seu carrinho está vazio.</p>
          )}
        </div>
      </div>

      <div className={styles.container_itens_info}>
        <label className={styles.itens_info}>
          <span>CEP</span>
          <input
            type="text"
            placeholder="Digite seu CEP"
            name="cep"
            value={cep}
            onChange={(e) => changeCep(e.target.value)}
            maxLength={8}
          />
          <span></span>
          <button onClick={calculateCep}>Calcular Frete</button>
        </label>

        <label className={styles.itens_info}>
          <span>Cupom</span>
          <select name="cupom">
            <option value="">Vazio</option>
            <option value="FG">Frete Grátis</option>
            <option value="DESC">10% de Desconto</option>
          </select>
          <button>Aplicar cupom</button>
        </label>

        <div className={styles.total_value}>
          <p>Total</p>
          <p>R${Number(subtotal).toFixed(2)}</p>
        </div>

        <button className={styles.payment_button}>
          Continuar para pagamento
        </button>
      </div>
    </div>
  );
}

export default Cart;
