import { FormEvent, useEffect, useState } from "react";
import styles from "./home.module.css";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { Alert, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

interface CoinProps {
  name: string;
  delta_24h: string;
  price: string;
  symbol: string;
  volume_24h: string;
  market_cap: string;
  formatedMarket: string;
  formatedPrice: string;
}
interface DataProps {
  coins: CoinProps[];
}

export function Home() {
  const [coins, setCoins] = useState<CoinProps[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    async function getDatas() {
      await fetch(
        "https://sujeitoprogramador.com/api-cripto/?key=18624280c23f871b&pref"
      )
        .then((response) => response.json())
        .then((result: DataProps) => {
          const coinsDatas = result.coins.slice(0, 15);

          const price = Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          });

          const formatResult = coinsDatas.map((item) => {
            const formated = {
              ...item,
              formatedPrice: price.format(Number(item.price)),
              formatedMarket: price.format(Number(item.market_cap)),
            };
            return formated;
          });
          formatResult.sort((a, b) => {
            const marketA = Number(a.formatedMarket.replace(/\D/g, ""));
            const marketB = Number(b.formatedMarket.replace(/\D/g, ""));

            return marketB - marketA;
          });
          setCoins(formatResult);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

    getDatas();
  }, []);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();

    if (searchValue === "") {
      alert(
        "O campo de pesquisa se encontra vazio, preencha corretamente para pesquisar a critpomoeda que você deseja."
      );
    } else {
      setIsLoading(true);
      await fetch(
        `https://sujeitoprogramador.com/api-cripto/coin/?key=18624280c23f871b&symbol=${searchValue}`
      )
        .then((response) => response.json())
        .then(() => {
          navigate(`/detail/${searchValue}`);
        })
        .catch(() => {
          setIsError(true);
          setIsLoading(false);
          setSearchValue("");
        });
    }
  };

  return (
    <>
      {isError ? (
        <Alert
          message="Aconteceu um erro na requisição"
          description={`Esta criptomoeda não existe em nosso banco de 
          dados, favor tente novamente, ou verifique se a
          nomenclatura da moeda está correta.`}
          type="error"
          showIcon
          closable
          onClose={() => {
            setIsError(false);
          }}
          style={{
            position: "fixed",
            top: "2vw",
            left: "2vw",
            zIndex: 9999,
            whiteSpace: "pre-line",
          }}
        />
      ) : null}
      <main className={styles.container}>
        <form className={styles.form} onSubmit={handleSearch}>
          <input
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Digite o simbolo da moeda para ver mais informações dela. EX: BTC..."
          />
          <button type="submit">
            <BiSearch size={30} color="#FFF" />
          </button>
        </form>
        <p className={styles.helperText}>
          *Você também pode clicar na moeda e ver mais informações dela.
        </p>
        {isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "40vh",
            }}
          >
            <Spin
              size="large"
              indicator={
                <LoadingOutlined
                  style={{ fontSize: 74, color: "white" }}
                  spin
                />
              }
            />
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th scope="col">Moeda</th>
                <th scope="col">Valor mercado</th>
                <th scope="col">Preço</th>
                <th scope="col">Volume</th>
              </tr>
            </thead>

            <tbody id="tbody">
              {coins.map((item) => {
                const volume24h = parseFloat(item.volume_24h);

                return (
                  <tr
                    onClick={() => {
                      navigate(`/detail/${item.symbol}`);
                    }}
                    className={styles.tr}
                    key={item.symbol}
                  >
                    <td className={styles.tdLabel} data-label="Moeda">
                      <span>{item.name}</span> | {item.symbol}
                    </td>
                    <td data-label="Mercado" className={styles.tdLabel}>
                      {item.formatedMarket}
                    </td>
                    <td data-label="Preço" className={styles.tdLabel}>
                      {item.formatedPrice}
                    </td>
                    {volume24h >= 0 ? (
                      <td data-label="Volume" className={styles.tdProfit}>
                        <span>+{volume24h.toFixed(2)}</span>
                      </td>
                    ) : (
                      <td data-label="Volume" className={styles.tdLoss}>
                        <span>{volume24h.toFixed(2)}</span>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </main>
    </>
  );
}
