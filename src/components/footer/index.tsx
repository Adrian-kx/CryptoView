import styles from "./footer.module.css";

export default function Footer() {
  return (
    <>
      <footer>
        <div className={styles.contentFooter}>
          <a href="https://adrianxavier.com.br" className={styles.linkLogo}>
            <h2>{"{AX}"}</h2>
          </a>
          <div className={styles.direitos}>
            <p>Todos os Direitos Reservados 2023 © Adrian Kauã Xavier</p>
          </div>
        </div>
      </footer>
    </>
  );
}
