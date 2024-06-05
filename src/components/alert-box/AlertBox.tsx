import { BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";
import styles from "./AlertBox.module.css";
import { MouseEventHandler } from "react";

type AlertProps = {
  title: string;
  isFail: boolean;
  onclickFunction: MouseEventHandler<HTMLButtonElement>
};

function AlertBox({ title, isFail, onclickFunction }: AlertProps) {
  return (
    <div className={styles.alert_box}>
      <div className={styles.box}>
        <h2>{title}</h2>
        {isFail ? <BsXCircleFill className={styles.icon}/> : <BsCheckCircleFill className={styles.icon}/>}
        <button onClick={onclickFunction}>Voltar</button>
      </div>
    </div>
  );
}

export default AlertBox;
