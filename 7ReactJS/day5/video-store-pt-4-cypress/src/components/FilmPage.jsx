import { useOutletContext, useParams, Link } from "react-router-dom";

export default function FilmPage() {
  const { filmId } = useParams();
  const { getInvetoryItemById, updateInventoryById } = useOutletContext();

  const inventoryItem = getInvetoryItemById(filmId);

  const {
    id,
    Title: title,
    Poster: imgUrl,
    copiesAvailable,
    totalAvailable,
    Rated: rating,
    Plot: description,
  } = inventoryItem;

  // define helper methods where helpful
  const checkoutFilm = () => {
    updateInventoryById(filmId, {
      copiesAvailable: inventoryItem.copiesAvailable - 1,
    });
  };

  const returnFilm = () => {
    updateInventoryById(filmId, {
      copiesAvailable: inventoryItem.copiesAvailable + 1,
    });
  };

  return (
    <div className="section-container">
      <div className="container-column">
        <button className="home-link">
          <Link to="/">Return Home</Link>
        </button>
        <h2>Details</h2>
        <h3>{title}</h3>
        <div className="container-row align-center">
          <img src={imgUrl} />
          <p>{description}</p>
          <pre style={{ fontSize: "40px" }}>{rating}</pre>
        </div>
        <div className="container-column num-available">
          {copiesAvailable} / {totalAvailable} available
          <div className="container-row">
            <button
              disabled={copiesAvailable === 0}
              onClick={checkoutFilm}
              className="checkout-button"
            >
              Check out
            </button>
            <button
              disabled={copiesAvailable === totalAvailable}
              onClick={returnFilm}
              className="return-button"
            >
              Return
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
