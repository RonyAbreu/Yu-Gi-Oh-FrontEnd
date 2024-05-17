import styles from "./NavBar.module.css"
import YuGiOhImg from "../../assets/yugioh-logo.png"
import { useNavigate } from "react-router-dom"

function NavBar() {
  const navigate = useNavigate();
  return (
    <div className={styles.nav_bar}>
        <img src={YuGiOhImg} alt="yugioh-logo" width="180" height="70" onClick={() => navigate("/")}/>
    </div>
  )
}

export default NavBar