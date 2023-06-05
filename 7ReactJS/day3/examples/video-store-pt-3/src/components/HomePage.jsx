import InventoryItem from './InventoryItem';
import DetailsPanel from './DetailsPanel';

export default function HomePage({ inventory, selectedFilm, setSelectedFilmById, checkoutOrReturnFilmById }) {
    return (
        <div className="page_container">
            <h2>Inventory</h2>
            <div className="section_container">
                {
                    inventory.map(({ id, Title, Poster, copiesAvailable }) => (
                        <InventoryItem
                            key={id}
                            id={id}
                            title={Title}
                            imgUrl={Poster}
                            copiesAvailable={copiesAvailable}
                            setSelectedFilmById={setSelectedFilmById}
                        />
                    ))
                }
                <button onClick={() => setSelectedFilmById(null)}>Clear Selection</button>
            </div>
            {/* will only render if there is a selectedFilm (not null) */}
            {selectedFilm && (
                <DetailsPanel
                    selectedFilm={selectedFilm}
                    checkoutOrReturnFilmById={checkoutOrReturnFilmById}
                />
            )}
        </div>
    );
}