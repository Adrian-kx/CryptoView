import { FormEvent, useEffect, useState } from "react";
import styles from "./home.module.css";
import { BiSearch } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
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
      const arrayaux = [
        {
          symbol: "BTC",
          show_symbol: null,
          name: "Bitcoin",
          rank: 1,
          price: "137680.8547007509",
          market_cap: "2686769597036.4360351562",
          volume_24h: "3495285634.8017015457",
          delta_24h: "-0,31",
          formatedPrice: "R$ 137.680,85",
          formatedMarket: "R$ 2.686.769.597.036,44",
        },
        {
          symbol: "ETH",
          show_symbol: null,
          name: "Ethereum",
          rank: 2,
          price: "7972.0907543966",
          market_cap: "975575565718.3679199219",
          volume_24h: "2041596208.195843935",
          delta_24h: "0,04",
          formatedPrice: "R$ 7.972,09",
          formatedMarket: "R$ 975.575.565.718,37",
        },
        {
          symbol: "USDT",
          show_symbol: null,
          name: "Tether",
          rank: 3,
          price: "5.131",
          market_cap: "350245219341.416015625",
          volume_24h: "7012761469.21804142",
          delta_24h: "-0,10",
          formatedPrice: "R$ 5,13",
          formatedMarket: "R$ 350.245.219.341,42",
        },
        {
          symbol: "BNB",
          show_symbol: null,
          name: "Binance Coin",
          rank: 4,
          price: "1074.0167502934",
          market_cap: "180581993008.6782226562",
          volume_24h: "519126489.8098022342",
          delta_24h: "1,42",
          formatedPrice: "R$ 1.074,02",
          formatedMarket: "R$ 180.581.993.008,68",
        },
        {
          symbol: "USDC",
          show_symbol: null,
          name: "USCoin",
          rank: 5,
          price: "5.1309522294",
          market_cap: "150387246773.1814575195",
          volume_24h: "431996463.1765196323",
          delta_24h: "-0,11",
          formatedPrice: "R$ 5,13",
          formatedMarket: "R$ 150.387.246.773,18",
        },
        {
          symbol: "XRP",
          show_symbol: null,
          name: "XRP",
          rank: 6,
          price: "2.4961732939",
          market_cap: "116284937427.9437408447",
          volume_24h: "423032225.9109527469",
          delta_24h: "-0,06",
          formatedPrice: "R$ 2,50",
          formatedMarket: "R$ 116.284.937.427,94",
        },
        {
          symbol: "BUSD",
          show_symbol: null,
          name: "Binance USD",
          rank: 1845,
          price: "5.1325373856",
          market_cap: "63302665994.0820159912",
          volume_24h: "951523740.7802307606",
          delta_24h: "-0,09",
          formatedPrice: "R$ 5,13",
          formatedMarket: "R$ 63.302.665.994,08",
        },
        {
          symbol: "DOGE",
          show_symbol: null,
          name: "Dogecoin",
          rank: 9,
          price: "0.3037467318",
          market_cap: "37542925634.5982131958",
          volume_24h: "142843512.9840468168",
          delta_24h: "-0,26",
          formatedPrice: "R$ 0,30",
          formatedMarket: "R$ 37.542.925.634,60",
        },
        {
          symbol: "SOL",
          show_symbol: null,
          name: "Sola Token",
          rank: 1262,
          price: "111.8056850017",
          market_cap: "32816204224.4267730713",
          volume_24h: "172876714.7178203464",
          delta_24h: "-0,68",
          formatedPrice: "R$ 111,81",
          formatedMarket: "R$ 32.816.204.224,43",
        },
        {
          symbol: "XLM",
          show_symbol: null,
          name: "Stellar",
          rank: 21,
          price: "0.5358584782",
          market_cap: "12694468088.1526374817",
          volume_24h: "116135723.1311608702",
          delta_24h: "0,27",
          formatedPrice: "R$ 0,54",
          formatedMarket: "R$ 12.694.468.088,15",
        },
        {
          symbol: "ZEC",
          show_symbol: null,
          name: "ZCash",
          rank: 31,
          price: "135.7002192293",
          market_cap: "2215749682.9346942902",
          volume_24h: "127175113.5785745233",
          delta_24h: "0,06",
          formatedPrice: "R$ 135,70",
          formatedMarket: "R$ 2.215.749.682,93",
        },
        {
          symbol: "DASH",
          show_symbol: null,
          name: "Dash",
          rank: 45,
          price: "131.7795090661",
          market_cap: "1514878857.9018290043",
          volume_24h: "95137055.4051898718",
          delta_24h: "-0,33",
          formatedPrice: "R$ 131,78",
          formatedMarket: "R$ 1.514.878.857,90",
        },
        {
          symbol: "TUSD",
          show_symbol: null,
          name: "TrueUSD",
          rank: 91,
          price: "5.1263821",
          market_cap: "704109873.2832891941",
          volume_24h: "220314710.0380972922",
          delta_24h: "-0,10",
          formatedPrice: "R$ 5,13",
          formatedMarket: "R$ 704.109.873,28",
        },
        {
          symbol: "BTCU",
          show_symbol: null,
          name: "BitcoinUltra",
          rank: 451,
          price: "137674.992",
          market_cap: "0",
          volume_24h: "204863732.22155568",
          delta_24h: "-0,37",
          formatedPrice: "R$ 137.674,99",
          formatedMarket: "R$ 0,00",
        },
        {
          symbol: "ETHB",
          show_symbol: null,
          name: "EtherBTC",
          rank: 424,
          price: "7946.8503186931",
          market_cap: "0",
          volume_24h: "101915972.076828301",
          delta_24h: "-0,23",
          formatedPrice: "R$ 7.946,85",
          formatedMarket: "R$ 0,00",
        },
      ];

      setCoins(arrayaux);
      setIsLoading(false);
      return;
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
