import { useState } from "react";
import styles from "./Filter.module.css";
import { CardType } from "../../enum/CardType";
import { CardAttribute } from "../../enum/CardAttribute";
import { Card } from "../../types/Card";

interface FilterProps {
  setBaseUrl: (baseUrl: string) => void;
  setCards: (cards: Card[]) => void;
  cards: Card[];
}

function Filter({ setBaseUrl, setCards, cards }: FilterProps) {
  const [level, setLevel] = useState("");
  const [attribute, setAttribute] = useState("");
  const [type, setType] = useState("");

  const [priceOrder, setPriceOrder] = useState("");

  function filterCards(level: string, attribute: string, type: string) {
    const params = new URLSearchParams();

    if (level !== "") {
      params.append("level", level);
    }
    if (attribute !== "") {
      params.append("attribute", attribute);
    }
    if (type !== "") {
      params.append("type", type);
    }

    setBaseUrl(params.toString() ? `?${params.toString()}` : " ");
  }

  function clearInputs() {
    setLevel("");
    setAttribute("");
    setType("");
    setPriceOrder("");
    filterCards("", "", "");
  }

  function generateOptionTypes() {
    return Object.values(CardType).map(type => (
      <option key={type} value={type}>{type}</option>
    ));
  }

  function generateAttributeOptions() {
    return Object.entries(CardAttribute).map(([key, value]) => (
      <option key={key} value={key}>{value}</option>
    ));
  }

  function orderCardsByPrice(order: string) {
    const sortedCards = [...cards].sort((cardA, cardB) => {
      const priceA = cardA.card_prices[0].amazon_price || 1.50;
      const priceB = cardB.card_prices[0].amazon_price || 1.50;

      if (order === "Crescente") {
        return priceA - priceB;
      } else if (order === "Decrescente") {
        return priceB - priceA;
      } else {
        setBaseUrl(" ");
        return 0;
      }
    });

    setCards(sortedCards);
  }

  return (
    <div className={styles.filter}>
      <div className={styles.filter_component}>
        <span>Level</span>
        <select
          name="level"
          onChange={(e) => {
            setLevel(e.target.value);
            filterCards(e.target.value, attribute, type);
          }}
          value={level}
        >
          <option value="">Todos</option>
          {[...Array(14).keys()].map(i => (
            <option key={i} value={i}>{i}</option>
          ))}
        </select>
      </div>

      <div className={styles.filter_component}>
        <span>Tipo</span>
        <select
          name="type"
          value={type}
          onChange={(e) => {
            setType(e.target.value);
            filterCards(level, attribute, e.target.value);
          }}
        >
          <option value="">Todos</option>
          {generateOptionTypes()}
        </select>
      </div>

      <div className={styles.filter_component}>
        <span>Atributo</span>
        <select
          name="attribute"
          onChange={(e) => {
            setAttribute(e.target.value);
            filterCards(level, e.target.value, type);
          }}
          value={attribute}
        >
          <option value="">Todos</option>
          {generateAttributeOptions()}
        </select>
      </div>

      <div className={styles.filter_component}>
        <span>Preço (Utilize por último)</span>
        <select
          name="price"
          onChange={(e) => {
            setPriceOrder(e.target.value);
            orderCardsByPrice(e.target.value);
          }}
          value={priceOrder}
        >
          <option value="">Normal</option>
          <option value="Crescente">Crescente</option>
          <option value="Decrescente">Decrescente</option>
        </select>
      </div>

      <button
        onClick={clearInputs}
        className={styles.filter_button}
        id={styles.clear_btn}
      >
        Limpar
      </button>
    </div>
  );
}

export default Filter;