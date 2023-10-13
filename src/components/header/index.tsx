import styles from "./header.module.css";
import Logo from "./../../assets/cryptoview-low-resolution-logo-white-on-transparent-background.svg";
export function Header() {
  return (
    <header className={styles.container}>
      <a className={styles.logo} href="/">
        <img alt="logo" src={Logo} />
      </a>
    </header>
  );
}
