import { useParams } from 'react-router-dom'
import styles from './Card.module.css'

function CardInfo() {
  const {id} = useParams();
  return (
    <div>CardInfo {id}</div>
  )
}

export default CardInfo