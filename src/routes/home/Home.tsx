import Search from "../../components/search/Search";
import styles from "./Home.module.css";
import { apiFetch } from "../../axios/config";
import { useEffect, useState } from "react";
import { Card } from "../../types/card";
import Filter from "../../components/filter/Filter";
import Loading from "../../components/loading/Loading";
import Pagination from "../../components/pagination/Pagination";
import { useNavigate } from "react-router-dom";

function Home() {
  const [cards, setCards] = useState<Card[] | []>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const itensPerPage: number = 30;
  const [currentPage, setCurrentPage] = useState(0);

  const pages: number = Math.ceil(cards!.length / itensPerPage);
  const startIndex: number = currentPage * itensPerPage;
  const endIndex: number = startIndex + itensPerPage;

  const currentItens: Array<Card> = cards!.slice(startIndex, endIndex);

  const [baseUrl, setBaseUrl] = useState("");

  useEffect(() => {
    async function getAllCards() {
      try {
        setLoading(true);
        const response = await apiFetch.get(baseUrl);
        const cardsJson = response.data.data;
        setCards(cardsJson);
      } catch (error) {
        setCards([]);
      } finally {
        setLoading(false);
      }
    }

    getAllCards();
  }, [baseUrl]);
  
  async function searchCard(cardName: string) {
    let searchUrl: string;
    if(baseUrl != ""){
      searchUrl = baseUrl.concat("&");
    } else {
      searchUrl = baseUrl.concat("?");
    }

    try {
      setLoading(true);
      const response = await apiFetch.get(`${searchUrl}fname=${cardName}`);
      const cardsJson = response.data.data;
      setCards(cardsJson);
    } catch (error) {
      setCards([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.home}>
      <div className={styles.home_header}>
        <h1>Yu-Gi-Oh Shop</h1>
        <Search searchCard={searchCard} />
      </div>

      <div className={styles.home_main}>
        <Filter setBaseUrl={setBaseUrl}/>

        <div className={styles.home_data}>
          {!loading && cards && cards.length > 0 && (
            <div className={styles.container_cards}>
              {currentItens.map((card: Card) => (
                <div key={card.id} className={styles.card_data} onClick={() => navigate(`/card/${card.name}`)}>
                  <img
                    src={card.card_images[0].image_url_small}
                    alt="card-image"
                    width="200"
                    height="280"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          )}

          {!loading && cards && cards.length === 0 && (
            <p className={styles.not_found}>Nenhuma carta foi encontrada</p>
          )}
        </div>
      </div>

      <Pagination quantPages={pages} setCurrentPage={setCurrentPage} currentPage={currentPage} setLoading={setLoading}/>

      {loading && <Loading />}
    </div>
  );
}

export default Home;
