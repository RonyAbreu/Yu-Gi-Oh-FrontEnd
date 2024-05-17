import { useState } from "react";
import styles from "./Filter.module.css";
import { CardType } from "../../enum/CardType";
import { CardAttribute } from "../../enum/CardAttribute";

interface FilterProps {
  setBaseUrl: (baseUrl: string) => void;
}

function Filter({ setBaseUrl }: FilterProps) {
  const [level, setLevel] = useState("");
  const [attribute, setAttribute] = useState("");
  const [type, setType] = useState("");

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

  return (
    <div className={styles.filter}>
      <div className={styles.filter_component}>
        <span>Level</span>
        <select
          name="level"
          onChange={(e) => setLevel(e.target.value)}
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
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">Todos</option>
          {generateOptionTypes()}
        </select>
      </div>

      <div className={styles.filter_component}>
        <span>Atributo</span>
        <select
          name="attribute"
          onChange={(e) => setAttribute(e.target.value)}
          value={attribute}
        >
          <option value="">Todos</option>
          {generateAttributeOptions()}
        </select>
      </div>

      <button
        onClick={() => filterCards(level, attribute, type)}
        className={styles.filter_button}
      >
        Filtrar
      </button>
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