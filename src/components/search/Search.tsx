import { useState } from "react";
import styles from "./Search.module.css";
import { BiSearch } from "react-icons/bi";

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
        onChange={(e) => setCardName(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" ? searchCard(cardName) : ""}
      />
      <BiSearch onClick={() => searchCard(cardName)} className={styles.btn_search}/>
      <button onClick={() => searchCard(cardName)}>Buscar</button>
    </div>
  );
}

export default Search;
