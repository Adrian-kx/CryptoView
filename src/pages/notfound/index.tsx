import { Link } from "react-router-dom";
import style from "./notFound.module.css";

export function Notfound() {
  return (
    <div className={style.container}>
      <h1>Pagina 404 não existe</h1>
      <Link to="/">Voltar para a Página Inicial</Link>
    </div>
  );
}
