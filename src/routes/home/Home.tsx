import Search from "../../components/search/Search";
import styles from "./Home.module.css";
import { apiFetch } from "../../axios/config";
import { useEffect, useState } from "react";
import { Card } from "../../types/card";
import Filter from "../../components/filter/Filter";
import Loading from "../../components/loading/Loading";
import Pagination from "../../components/pagination/Pagination";

function Home() {
  const [cards, setCards] = useState<Card[] | []>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const itensPerPage: number = 60;
  const [currentPage, setCurrentPage] = useState(0);

  const pages: number = Math.ceil(cards!.length / itensPerPage);
  const startIndex: number = currentPage * itensPerPage;
  const endIndex: number = startIndex + itensPerPage;

  const currentItens: Array<Card> = cards!.slice(startIndex, endIndex);

  async function searchCard(cardName: string) {
    try {
      setLoading(true);
      const response = await apiFetch.get(`?fname=${cardName}`);
      const cardsJson = response.data.data;
      setCards(cardsJson);
    } catch (error) {
      setCards([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function getAllCards() {
      try {
        setLoading(true);
        const response = await apiFetch.get("");
        const cardsJson = response.data.data;
        setCards(cardsJson);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    getAllCards();
  }, []);

  return (
    <div className={styles.home}>
      <div className={styles.home_header}>
        <h1>Tudo sobre cartas de Yu Gi Oh</h1>
        <Search searchCard={searchCard} />
      </div>

      <div className={styles.home_main}>
        {!loading && <Filter />}

        <div className={styles.home_data}>
          {!loading && cards && cards.length > 0 && (
            <div className={styles.container_cards}>
              {currentItens.map((card: Card) => (
                <div key={card.name} className={styles.card_data}>
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
