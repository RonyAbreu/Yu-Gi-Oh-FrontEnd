import Search from "../../components/search/Search";
import styles from "./Home.module.css";

import { apiFetch } from "../../axios/config";
import { useEffect, useState } from "react";
import { Card } from "../../types/card";
import Filter from "../../components/filter/Filter";
import Loading from "../../components/loading/Loading";

function Home() {
  const [cards, setCards] = useState<Card[] | null | []>(null);
  const [loading, setLoading] = useState<boolean>(false);

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
        const filterCards = cardsJson.slice(0, 50);
        setCards(filterCards);
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
        <Filter />

        <div className={styles.home_data}>
          {!loading && cards && cards.length > 0 && (
            <div className={styles.container_cards}>
              {cards.map((card: Card) => (
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

      {loading && <Loading />}
    </div>
  );
}

export default Home;
