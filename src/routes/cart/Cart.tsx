import { BiTrash } from "react-icons/bi";
import { useCart } from "../../hooks/useCart";
import styles from "./Cart.module.css";
import { useEffect, useState } from "react";
import { useValidCep } from "../../hooks/useValidCep";
import { useNavigate } from "react-router-dom";
import AlertBox from "../../components/alert-box/AlertBox";

type Cep = {
  cep: string;
};

function Cart() {
  const { cartItens, removeItem } = useCart();
  const [subtotal, setSubTotal] = useState(0);
  const { register, handleSubmit, errors } = useValidCep();
  const [alertBox, setAlertBox] = useState(false);

  const [total, setTotal] = useState(0);

  const [cepIsValid, setCepIsValid] = useState(true);

  const [coupon, setCoupon] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    let total: number = 0;
    cartItens.map((item) => {
      total += item.subtotal;
    });
    setSubTotal(total);
  }, [cartItens]);

  function calculateCep({ cep }: Cep) {
    setTotal(0);

    const cepPercent = 10;
    if (isValidCep(cep)) {
      setCepIsValid(true);
      setTotal(subtotal + cepPercent);
    } else {
      setCepIsValid(false);
    }
  }

  function isValidCep(cep: string): boolean {
    // Expressão regular para verificar o formato do CEP
    const cepRegex = /^[0-9]{5}-?[0-9]{3}$/;

    if (!cepRegex.test(cep)) {
      return false;
    }

    const cleanCep = cep.replace("-", "");

    if (cleanCep.length !== 8) {
      return false;
    }

    return true;
  }

  function showCheckout() {
    if (cartItens && cartItens.length > 0) {
      navigate("/checkout");
    } else {
      setAlertBox(true);
    }
  }

  if (alertBox)
    return (
      <AlertBox
        title={"Insira algo no carrinho antes de prosseguir para o pagamento!"}
        isFail={true}
        onclickFunction={() => setAlertBox(false)}
      />
    );

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
        <form
          className={styles.itens_info}
          onSubmit={handleSubmit(calculateCep)}
        >
          <span>CEP</span>
          <input
            type="text"
            placeholder="Digite seu CEP"
            {...register("cep")}
            maxLength={8}
            id="inputCep"
          />
          <span id={styles.errors}>{errors.cep?.message}</span>
          {!cepIsValid && <span id={styles.errors}>Cep inválido</span>}
          <button type="submit" id="btnCep">
            Calcular Frete
          </button>
        </form>

        <label className={styles.itens_info}>
          <span>Cupom</span>
          <input
            type="text"
            name="cupom"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            placeholder="Digite seu cupom"
          />
          <button>Aplicar cupom</button>
        </label>

        <div className={styles.total_value}>
          <p>Total</p>
          <p>
            R$
            {total == 0
              ? Number(subtotal).toFixed(2)
              : Number(total).toFixed(2)}
          </p>
        </div>

        <button className={styles.payment_button} onClick={showCheckout}>
          Continuar para pagamento
        </button>
      </div>
    </div>
  );
}

export default Cart;
