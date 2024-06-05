import { BsCheckCircleFill } from "react-icons/bs";
import styles from "./PurchaseReview.module.css";
import { useOrderReview } from "../../hooks/useOrderReview";

function PurchaseReview() {
  const { orderDetails } = useOrderReview();

  return (
    <div className={styles.container_review}>
      <div className={styles.review}>
        <h1>Compra realizada com sucesso</h1>
        <div className={styles.payment}>
          <p>Seu pedido foi realizado com sucesso.</p>
          <p>
            Em breve você receberá um e-mail no endereço <span className={styles.email}>{orderDetails?.email}</span> com todos os
            detalhes do pedido
          </p>
          <div className={styles.payment_approved}>
            <BsCheckCircleFill/>
            <p>Pagamento Aprovado</p>
          </div>
        </div>

        <div className={styles.details}>
          <h3>Informações do pedido</h3>
          <p>Total: {orderDetails?.totalValue + "R$"}</p>
          <p>Rua: {orderDetails?.street}</p>
          <p>Bairro: {orderDetails?.burgh}</p>
          <p>Número da casa: {orderDetails?.number}</p>
          <p>Cidade: {orderDetails?.city}</p>
          <p>Estado: {orderDetails?.state}</p>
          <p>Forma de pagamento: {orderDetails?.payment}</p>
        </div>
      </div>
    </div>
  );
}

export default PurchaseReview;
