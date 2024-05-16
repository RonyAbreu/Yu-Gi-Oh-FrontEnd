import { useState } from "react";
import styles from "./Filter.module.css";

interface FilterProps {
  setBaseUrl: (baseUrl: string) => void;
}

function Filter({ setBaseUrl }: FilterProps) {
  const [level, setLevel] = useState<number | string>("");
  const [attribute, setAttribute] = useState("");

  function changeLevel(level : string){
    const levelNumber = Number(level);
    if(isNaN(levelNumber) || level == ""  || levelNumber > 13){
      setLevel("");
      return;
    }
    setLevel(levelNumber);
  }

  function filterCards(){
    if(level != "" && attribute == ""){
      setBaseUrl(`?level=${level}`)
    } else if(level == "" && attribute != ""){
      setBaseUrl(`?attribute=${attribute}`)
    } else if(level != "" && attribute != ""){
      setBaseUrl(`?level=${level}&attribute=${attribute}`)
    } else {
      setBaseUrl(" ")
    }
  }

  return (
    <div className={styles.filter}>
      <div className={styles.filter_component}>
        <span>Level</span>
        <input
          type="text"
          placeholder="Digite o level da carta"
          value={level}
          min={14}
          onChange={(e) => changeLevel(e.target.value)}
        />
      </div>

      <div className={styles.filter_component}>
        <span>Atributo</span>
        <select name="attribute" onChange={(e) => setAttribute(e.target.value)}>
          <option value="">Todos</option>
          <option value="DARK">Trevas</option>
          <option value="EARTH">Terra</option>
          <option value="FIRE">Fogo</option>
          <option value="LIGHT">Luz</option>
          <option value="WATER">Água</option>
          <option value="WIND">Vento</option>
          <option value="DIVINE">Divino</option>
        </select>
      </div>

      <button onClick={filterCards} className={styles.filter_button}>Filtrar</button>
    </div>
  );
}

export default Filter;
