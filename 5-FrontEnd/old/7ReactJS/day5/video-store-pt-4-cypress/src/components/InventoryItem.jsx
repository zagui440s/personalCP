import { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";

export default function InventoryItem(props) {
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();
  const { getInvetoryItemById } = useOutletContext();

  const inventoryItemData = getInvetoryItemById(props.id);
  const { Title: title, Poster: imgUrl, copiesAvailable } = inventoryItemData;

  useEffect(() => {
    if (clicked) {
      navigate(`/film/${props.id}`);
    }
  });

  return (
    <div
      className="inventory-item"
      onClick={(event) => {
        // necessary to prevent container onclick from overriding
        event.stopPropagation();
        setClicked(true);
      }}
    >
      <h3 className="item-title">{title}</h3>
      <img src={imgUrl} />
      <div className="num-available">{copiesAvailable} available</div>
    </div>
  );
}
