export default function InventoryItem({ id, title, imgUrl, copiesAvailable, setSelectedFilmById }) {
    return (
        <div className="inventory_item" onClick={event => {
            event.stopPropagation(); // necessary to prevent container onclick from overriding
            setSelectedFilmById(id);
        }}>
            <h3 className="item_title">{title}</h3>
            <img src={imgUrl} />
            <div className="item_actions">
                {copiesAvailable.current} available
            </div>
        </div>
    );
}