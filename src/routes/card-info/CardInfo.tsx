import { useParams } from "react-router-dom";
import styles from "./CardInfo.module.css";
import { ReactElement, useEffect, useState } from "react";
import { Card } from "../../types/card";
import { apiFetch } from "../../axios/config";
import { FaStar } from "react-icons/fa";
import Loading from "../../components/loading/Loading";

function CardInfo() {
  const { name } = useParams();

  const [cards, setCards] = useState<Card[]>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getCard() {
      try {
        setLoading(true);
        const response = await apiFetch.get(`?name=${name}`);
        const cardData = response.data.data;
        setLoading(false);
        setCards(cardData);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }

    getCard();
  }, []);

  function showStars(level: number): ReactElement[] {
    const arrayStar: ReactElement[] = [];
    for (let i = 0; i < level; i++) {
      arrayStar.push(<FaStar key={i} />);
    }
    return arrayStar;
  }

  return (
    <div className={styles.container_card}>
      {cards &&
        cards.map((card) => (
          <div key={card.id} className={styles.card_info}>
            <img src={card.card_images[0].image_url_small} alt="card-image" />

            <div className={styles.card_data}>
              <h2>{card.name}</h2>

              <div className={styles.card_stats}>
                <div className={styles.stats}>
                  <span>Type</span>
                  <p>{card.type}</p>
                </div>
                {card.attribute && <div className={styles.stats}>
                  <span>Attribute</span>
                  <p>{card.attribute}</p>
                </div>}
                {card.level && <div className={styles.stats}>
                  <span>Level</span>
                  <p className={styles.stars}>{showStars(card.level)}</p>
                </div>}
              </div>

              <div className={styles.description}>
                <p>Description:</p>
                <hr />
                <span>{card.desc}</span>
              </div>

              <div className={styles.card_attributes}>
                {(card.atk || card.atk == 0) && <div className={styles.attributes} id={styles.atk}>
                  <span>Atk</span>
                  <p>{card.atk}</p>
                </div>}
                {(card.def || card.def == 0) && <div className={styles.attributes} id={styles.def}>
                  <span>Def</span>
                  <p>{card.def}</p>
                </div>}
              </div>
            </div>
          </div>
        ))}

      {loading && <Loading />}
    </div>
  );
}

export default CardInfo;
