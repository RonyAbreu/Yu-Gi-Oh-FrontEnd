import { useState } from "react";
import styles from "./Filter.module.css";

interface FilterProps {
  setBaseUrl: (baseUrl: string) => void;
}

function Filter({ setBaseUrl }: FilterProps) {
  const [level, setLevel] = useState("");
  const [attribute, setAttribute] = useState("");

  function filterCards(level : string, attribute : string){
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

  function clearInputs(){
    setLevel("");
    setAttribute("");
    filterCards("", "");
  }

  return (
    <div className={styles.filter}>
      <div className={styles.filter_component}>
        <span>Level</span>
        <select name="level" onChange={(e) => setLevel(e.target.value)} value={level}>
          <option value="">Todos</option>
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="13">13</option>
        </select>
      </div>

      <div className={styles.filter_component}>
        <span>Atributo</span>
        <select name="attribute" onChange={(e) => setAttribute(e.target.value)} value={attribute}>
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

      <button onClick={() => filterCards(level, attribute)} className={styles.filter_button}>Filtrar</button>
      <button onClick={clearInputs} className={styles.filter_button} id={styles.clear_btn}>Limpar</button>
    </div>
  );
}

export default Filter;
