import {
  BsArrowLeft,
  BsArrowRight,
} from "react-icons/bs";
import styles from "./Pagination.module.css";

interface PaginationProps {
  quantPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  setLoading: (isLoading: boolean) => void;
}

function Pagination({
  quantPages,
  currentPage,
  setCurrentPage,
  setLoading,
}: PaginationProps) {
  const calculatePages = (maxPagesToShow: number) => {
    const pageButtons = [];
    const halfMaxPages = Math.floor(maxPagesToShow / 2);
    let startPage = 0;
    let endPage = 0;

    if (quantPages <= maxPagesToShow) {
      startPage = 0;
      endPage = quantPages - 1;
    } else if (currentPage <= halfMaxPages) {
      startPage = 0;
      endPage = maxPagesToShow - 1;
    } else if (currentPage >= quantPages - halfMaxPages) {
      startPage = quantPages - maxPagesToShow;
      endPage = quantPages - 1;
    } else {
      startPage = currentPage - halfMaxPages;
      endPage = currentPage + halfMaxPages;
    }

    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <button
          key={i}
          className={
            currentPage === i
              ? styles.active + " " + styles.pagination_button
              : styles.pagination_button
          }
          onClick={() => handleClick(i)}
        >
          {i + 1}
        </button>
      );
    }

    return pageButtons;
  };

  function handleClick(page: number) {
    setLoading(true);
    setTimeout(() => {
      setCurrentPage(page);
      window.scrollTo(0, 0);
      setLoading(false);
    }, 500);
  }

  return (
    <div className={styles.pagination}>
      {currentPage > 0 && (
        <div>
          <button
            className={styles.pagination_button + " " + styles.btn_action}
            onClick={() => handleClick(0)}
          >
            Primeira
          </button>
          <BsArrowLeft className={styles.arrow} onClick={() => handleClick(0)}/>
        </div>
      )}
      {calculatePages(5)}
      {currentPage < quantPages - 1 && <span>...</span>}
      {currentPage < quantPages - 1 && (
        <div>
          <button
            className={styles.pagination_button + " " + styles.btn_action}
            onClick={() => handleClick(quantPages - 1)}
          >
            Última
          </button>
          <BsArrowRight className={styles.arrow} onClick={() => handleClick(quantPages - 1)}/>
        </div>
      )}
    </div>
  );
}

export default Pagination;
