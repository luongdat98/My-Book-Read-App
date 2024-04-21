import { Link } from "react-router-dom";
import PropType from "prop-types";
import CardList from "./CardList";


const MainPage = ({currentlyReadings, wantToReads, reads, onReloadBooks, reloadSearchBooks }) => {
  const handleReloadbooks = () => {
    onReloadBooks();
  };

  const onReloadSearchBooks = () =>{
    reloadSearchBooks();
  };

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <CardList  bookShelfs={currentlyReadings} onHandleReloadBooks={handleReloadbooks} />
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Want to Read</h2>
            <CardList bookShelfs={wantToReads} onHandleReloadBooks={handleReloadbooks} />
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <CardList bookShelfs={reads} onHandleReloadBooks={handleReloadbooks} />
          </div>
        </div>
      </div>
      <div className="open-search">
        <Link to="/Search" onClick={onReloadSearchBooks}>Add a book</Link>
      </div>
    </div>
  );
};

MainPage.prototype = {
  currentlyReadings: PropType.array.isRequired,
  wantToReads: PropType.array.isRequired,
  reads: PropType.array.isRequired,
  onReloadBooks: PropType.func.isRequired,
  reloadSearchBooks: PropType.func.isRequired,
};

export default MainPage;