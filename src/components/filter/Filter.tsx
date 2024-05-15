import "./Filter.module.css"

// 'dark', 'earth', 'fire', 'light', 'water', 'wind' or 'divine'

function Filter() {
  return (
    <div>
        <div>
          <span>Level</span>
          <input type="number" min={1} max={13} placeholder="Digite o level da carta"/>
        </div>

        <div>
          <span>Atributo</span>
          <select name="atributo">
              <option value="dark">Trevas</option>
              <option value="earth">Terra</option>
              <option value="fire">Fogo</option>
              <option value="light">Luz</option>
              <option value="water">Água</option>
              <option value="wind">Vento</option>
              <option value="divine">Divino</option>
          </select>
        </div>
    </div>
  )
}

export default Filter