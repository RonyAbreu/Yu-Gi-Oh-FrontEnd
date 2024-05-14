import Search from "../../components/search/Search";
import styles from "./Home.module.css";

import { apiFetch } from "../../axios/config";
import { useEffect, useState } from "react";
import { Card } from "../../types/card";

function Home() {
  const [cards, setCards] = useState<Card[] | null | []>(null);

  async function searchCard(cardName: string) {
    try {
      const response = await apiFetch.get(`?name=${cardName}`);
      const cardsJson = response.data.data;

      setCards(cardsJson);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function getAllCards() {
      try {
        const response = await apiFetch.get("");
        const cardsJson = response.data.data;
        console
        .log(cardsJson.length)

        setCards(cardsJson);
      } catch (error) {
        console.log(error);
      }
    }

    getAllCards();
  }, []);

  return (
    <div>
      <h1>Tudo sobre cartas de Yu Gi Oh</h1>

      <Search searchCard={searchCard} />

      <div>
        {cards &&
          cards.length > 0 &&
          cards.map((card: Card) => (
            <div key={card.name}>
              <img
                src={card.card_images[0].image_url_small}
                alt="card-image"
                width="200"
                height="280"
              />
            </div>
          ))}
      </div>

      {cards && cards.length === 0 && <p>Nenhuma carta foi encontrada</p>}
    </div>
  );
}

export default Home;
