import { useEffect, useState } from "react";
import style from "./detail.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

interface CoinProps {
  name: string;
  price: string;
  symbol: string;
  market_cap: string;
  low_24h: string;
  high_24h: string;
  total_volume_24h: string;
  delta_24h: string;
  formatedPrice: string;
  formatedMarket: string;
  formatedLowPrice: string;
  formatedHighPrice: string;
  error?: string;
}

export function Detail() {
  const { cripto } = useParams();
  const [arrayCoin, setArrayCoin] = useState<CoinProps>();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const getDatas = async () => {
    await fetch(
      `https://sujeitoprogramador.com/api-cripto/coin/?key=18624280c23f871b&symbol=${cripto}`
    )
      .then((response) => response.json())
      .then((result: CoinProps) => {
        const price = Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const resultGetApi = {
          ...result,
          formatedPrice: price.format(Number(result.price)),
          formatedMarket: price.format(Number(result.market_cap)),
          formatedLowPrice: price.format(Number(result.low_24h)),
          formatedHighPrice: price.format(Number(result.high_24h)),
        };

        setArrayCoin(resultGetApi);
      })
      .catch((error) => {
        navigate("/");
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getDatas();
  }, []);

  return isLoading ? (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
      }}
    >
      <Spin
        size="large"
        indicator={
          <LoadingOutlined style={{ fontSize: 74, color: "white" }} spin />
        }
      />
    </div>
  ) : (
    <div className={style.container}>
      <h1 className={style.center}>{arrayCoin?.name}</h1>
      <p className={style.center}>{arrayCoin?.symbol}</p>

      <section className={style.content}>
        <p>
          <strong>Preço:</strong>
          {arrayCoin?.formatedPrice}
        </p>
        <p>
          <strong>Maior Preço em 24h:</strong>
          {arrayCoin?.formatedHighPrice}
        </p>

        <p>
          <strong>Menor Preço em 24h:</strong>
          {arrayCoin?.formatedLowPrice}
        </p>
        <p>
          <strong>Delta em 24h:</strong>
          <span
            style={{
              color: Number(arrayCoin?.delta_24h) >= 0 ? "#12f98a" : "#f91257",
            }}
          >
            {arrayCoin?.delta_24h}
          </span>
        </p>

        <p>
          <strong>Maior Preço:</strong>
          {arrayCoin?.formatedHighPrice}
        </p>
        <p>
          <strong>Valor de Mercado:</strong>
          {arrayCoin?.formatedMarket}
        </p>
      </section>
      <Link to="/">Voltar</Link>
    </div>
  );
}
