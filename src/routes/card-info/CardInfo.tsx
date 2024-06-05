import { useParams } from "react-router-dom";
import styles from "./CardInfo.module.css";
import { ReactElement, useEffect, useState } from "react";
import { apiFetch } from "../../axios/config";
import { FaStar } from "react-icons/fa";
import Loading from "../../components/loading/Loading";
import { CartItem } from "../../types/CartItem";
import { useCart } from "../../hooks/useCart";
import CartMenu from "../../components/cart-menu/CartMenu";
import { BiCart } from "react-icons/bi";
import { useMenuCart } from "../../hooks/useMenuCart";
import { Card } from "../../types/Card";

function CardInfo() {
  const { name } = useParams();

  const [cards, setCards] = useState<Card[]>();
  const [loading, setLoading] = useState<boolean>(false);

  const { countItens, setCountItens, setCartItens } = useCart();

  const {isCartMenu, setMenu} = useMenuCart();

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
  }, [name]);

  function showStars(level: number): ReactElement[] {
    const arrayStar: ReactElement[] = [];
    for (let i = 0; i < level; i++) {
      arrayStar.push(<FaStar key={i} />);
    }
    return arrayStar;
  }

  const [quantity, setQuantity] = useState<number>(1);

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  function handleBuyCard(card: Card, quantity: number) {
    let cardPrice: number = card.card_prices[0].amazon_price;

    if (cardPrice == 0) {
      cardPrice = 1.5;
    }

    const subtotal: number = cardPrice * quantity;

    const cartItem: CartItem = {
      id: card.id,
      name: card.name,
      image_url: card.card_images[0].image_url_small,
      price: cardPrice,
      quantity: quantity,
      subtotal: subtotal,
    };

    setCartItens((prevCartItens) => {
      const itemIndex = prevCartItens.findIndex((item) => item.id === card.id);
      if (itemIndex !== -1) {
        const updatedCart = [...prevCartItens];
        updatedCart[itemIndex].quantity += quantity;
        updatedCart[itemIndex].subtotal += subtotal;
        return updatedCart;
      } else {
        return [...prevCartItens, cartItem];
      }
    });

    setCountItens(countItens + quantity);

    setMenu(true);
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
                {card.attribute && (
                  <div className={styles.stats}>
                    <span>Attribute</span>
                    <p>{card.attribute}</p>
                  </div>
                )}
                {card.level && (
                  <div className={styles.stats}>
                    <span>Level</span>
                    <p className={styles.stars}>{showStars(card.level)}</p>
                  </div>
                )}
              </div>

              <div className={styles.description}>
                <p>Description:</p>
                <hr />
                <span>{card.desc}</span>
              </div>

              <div className={styles.card_attributes}>
                {(card.atk || card.atk === 0) && (
                  <div className={styles.attributes} id={styles.atk}>
                    <span>Atk</span>
                    <p>{card.atk}</p>
                  </div>
                )}
                {(card.def || card.def === 0) && (
                  <div className={styles.attributes} id={styles.def}>
                    <span>Def</span>
                    <p>{card.def}</p>
                  </div>
                )}
              </div>

              <div className={styles.card_value}>
                <p>
                  R$
                  {card.card_prices[0].amazon_price == 0
                    ? 1.5
                    : card.card_prices[0].amazon_price}
                </p>
                <div className={styles.quantity_control}>
                  <button type="button" onClick={decreaseQuantity}>
                    -
                  </button>
                  <input
                    type="number"
                    name="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    disabled={true}
                  />
                  <button type="button" onClick={increaseQuantity}>
                    +
                  </button>
                </div>
                <button
                  className={styles.buy_button}
                  onClick={() => handleBuyCard(card, quantity)}
                >
                  Comprar
                </button>
                <BiCart
                  className={styles.buy_button_cart}
                  onClick={() => handleBuyCard(card, quantity)}
                />
              </div>
            </div>
          </div>
        ))}

      {isCartMenu && <CartMenu setMenu={setMenu} />}
      {loading && <Loading />}
    </div>
  );
}

export default CardInfo;
