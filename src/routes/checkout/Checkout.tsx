import styles from "./Checkout.module.css";

function Checkout() {
  return (
    <div className={styles.checkout}>
      <div>
        <h2>Endereço</h2>
        <form>
          <label>
            <span>Rua</span>
            <input type="text" placeholder="Digite o nome de sua rua"/>
          </label>
          <label>
            <span>Bairro</span>
            <input type="text" placeholder="Digite o nome de seu bairro"/>
          </label>
          <label>
            <span>Número</span>
            <input type="text" placeholder="Digite o número de sua casa"/>
          </label>
          <label>
            <span>Cidade</span>
            <input type="text" placeholder="Digite o nome de sua cidade"/>
          </label>
          <label>
            <span>Estado</span>
            <input type="text" placeholder="Digite o nome do seu estado"/>
          </label>
        </form>
      </div>

      <div>
        <h2>Revise seu Pedido</h2>
      </div>

      <div>
        <h2>Forma de Pagamento</h2>
        <form>

        </form>
      </div>
    </div>
  );
}

export default Checkout;
