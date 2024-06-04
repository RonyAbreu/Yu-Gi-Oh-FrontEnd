import { BsCheckCircleFill, BsXCircleFill } from 'react-icons/bs';
import styles from './AlertBox.module.css';
import { MouseEventHandler } from 'react';

type AlertProps = {
    title: string;
    isFail: boolean;
}

function AlertBox({ title, isFail }: AlertProps) {
  return (
    <div className={styles.alert_box}>
        <div className={styles.box}>
            <h2>{title}</h2>
            {isFail ? <BsXCircleFill /> : <BsCheckCircleFill />}
        </div>
    </div>
  );
}

export default AlertBox;
