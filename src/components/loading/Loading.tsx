import { FaSpinner } from "react-icons/fa"
import styles from "./Loading.module.css"

function Loading() {
  return (
    <div className={styles.container_loading}>
      <FaSpinner className={styles.loading}/>
    </div>
  )
}

export default Loading