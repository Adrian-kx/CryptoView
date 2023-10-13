import { Link } from "react-router-dom";
import styles from "./header.module.css";
import Logo from "./../../assets/cryptoview-low-resolution-logo-white-on-transparent-background.svg";
export function Header() {
  return (
    <header className={styles.container}>
      <Link className={styles.logo} to="/">
        <img src={Logo} />
      </Link>
    </header>
  );
}
