import { Link } from "react-router-dom";
import PropType from "prop-types";
import CardList from "./CardList";
import { useState } from "react";
import * as BooksAPI from "./BooksAPI";

const SearchPage = ({searchBooks, onReloadBooks, onSearchBooks}) => {
  const [value, setValue]= useState("");

  const onChangeValue = async (e) => {
    onSearchBooks([]);
    setValue(e);
    const search = await BooksAPI.search(e, 10);
 
    if(search && search.length > 0){
      onSearchBooks(search);
    }
    else{
      onSearchBooks([]);
    }
  };

  const handleReloadbooks = () => {
    onReloadBooks();
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search" >
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={value}
            onChange={(event) => onChangeValue(event.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        {
          <CardList bookShelfs={searchBooks} onHandleReloadBooks={handleReloadbooks} />
        }  
      </div>
    </div>
  );
};

SearchPage.prototype = {
  searchBooks: PropType.array.isRequired,
  onReloadBooks: PropType.func.isRequired,
  onSearchBooks: PropType.func.isRequired,
};

export default SearchPage;