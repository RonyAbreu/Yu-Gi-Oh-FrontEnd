import styles from "./Footer.module.css";

function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.footer_container}>
        <div className={styles.footer_column}>
          <h2>:Links Úteis</h2>
          <ul>
            <li>
              <a target="_blank" href="https://ygoprodeck.com/api-guide/">
                Yu-Gi-Oh API
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.footer_column}>
          <h2>:Redes Sociais</h2>
          <ul>
            <li>
              <a
                target="_blank"
                href="https://www.linkedin.com/in/ronyelison-de-oliveira-abreu/"
              >
                Linkedin
              </a>
            </li>
            <li>
              <a target="_blank" href="https://github.com/RonyAbreu">
                GitHub
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.footer_column}>
          <h2>:Informações</h2>
          <p>Desenvolvido por Rony Dev</p>
          <p>React & TypeScript</p>
          <p>Email: ronyelison78@gmail.com</p>
        </div>
      </div>
      <div className={styles.footer_bottom}>
        <p>&copy; 2024 YuGiOh. Todos os direitos reservados.</p>
      </div>
    </div>
  );
}

export default Footer;