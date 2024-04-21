import PropType from "prop-types";
import CardItem from "./CardItem";

const CardList = ({bookShelfs, onHandleReloadBooks}) => {
  const handleReloadBooks = () => {
    onHandleReloadBooks();
  };

  return (
    <div className="bookshelf-books">
      <ol className="books-grid">
        {
          bookShelfs.length > 0 ?
          bookShelfs.map((book) => (
            <CardItem 
              key={book.id}
              book={book}
              handleReloadBooks={handleReloadBooks}
            />
          ))
          : ""
        }
      </ol>
    </div>
  );
};

CardList.prototype = {
  bookShelfs: PropType.array.isRequired,
  onHandleReloadBooks: PropType.func.isRequired,
}

export default CardList;