import styles from "./NavBar.module.css"

import YuGiOhImg from "../../assets/yugioh-logo.png"
import { Link } from "react-router-dom"

function NavBar() {

  return (
    <div className={styles.nav_bar}>
        <img src={YuGiOhImg} alt="yugioh-logo" width="180" height="70"/>

        <nav>
          <ul>
            <Link to="/">Home</Link>
          </ul>
        </nav>
    </div>
  )
}

export default NavBar