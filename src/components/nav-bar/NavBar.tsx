import styles from "./NavBar.module.css"
import YuGiOhImg from "../../assets/yugioh-logo.png"

function NavBar() {

  return (
    <div className={styles.nav_bar}>
        <img src={YuGiOhImg} alt="yugioh-logo" width="180" height="70"/>
    </div>
  )
}

export default NavBar