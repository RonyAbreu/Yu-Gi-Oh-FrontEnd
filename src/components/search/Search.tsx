import { useState } from "react";
import styles from "./Search.module.css";

interface SearchProps{
  searchCard: (cardName : string) => void;
}

function Search({searchCard} : SearchProps) {
  const [cardName, setCardName] = useState("");

  return (
    <div className={styles.search}>
      <input
        type="text"
        placeholder="Digite o nome de uma carta"
        value={cardName}
        onChange={(e) => {
          setCardName(e.target.value);
          searchCard(e.target.value);
        }}
      />
    </div>
  );
}

export default Search;
