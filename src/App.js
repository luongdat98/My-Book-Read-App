import './App.css';
import { useState, useEffect } from "react";
import { Route, Routes} from "react-router-dom";
import MainPage from './MainPage';
import SearchPage from './SearchPage';
import * as BooksAPI from './BooksAPI';

const BOOK_TYPE = {
  CURRENTLY_READING: "currentlyReading",
  WANT_TO_READ: "wantToRead",
  READ: "read",
};

function App() {
  const [books, setBooks] = useState([]);
  const [searchBooks, setSearchBooks] = useState([]);
  const [currentlyReadings, setCurrentlyReadings] = useState([]);
  const [wantToReads, setWantToReads] = useState([]);
  const [reads, setReads] = useState([]);

  const filterBookType = (books) => {
    setCurrentlyReadings(books.filter((book) => book.shelf === BOOK_TYPE.CURRENTLY_READING));
    setWantToReads(books.filter((book) => book.shelf === BOOK_TYPE.WANT_TO_READ));
    setReads(books.filter((book) => book.shelf === BOOK_TYPE.READ));
  };

  const getBookList = async () => {
    const res = await BooksAPI.getAll();
    setBooks(res);
    
    filterBookType(res);
  };

  const reloadBooks = async () => {
    await getBookList();
  };

  const reloadSearchBooks = () => {
    setSearchBooks([]);
  };

  const searchBook = (bookList) => {
    const checkbook = bookList.map((b) => {
      const filterBook = books.find((res) => res.id === b.id);
      if(filterBook && filterBook !== undefined){
        b.shelf = filterBook.shelf;
      }
      return b;
    });

    setSearchBooks(checkbook);
  };

  useEffect(() => {
    getBookList();
  }, []);


  return (
    <Routes>
      <Route 
        exact
        path="/"
        element={
          <MainPage 
            currentlyReadings={currentlyReadings} 
            wantToReads={wantToReads} 
            reads={reads}
            onReloadBooks={reloadBooks}
            reloadSearchBooks={reloadSearchBooks}
          />
        }
      />
      <Route 
        path="/Search"
        element={
          <SearchPage 
          searchBooks={searchBooks} 
            onReloadBooks={reloadBooks}
            onSearchBooks={searchBook}
          />
        }
      />
    </Routes>
  );
}

export default App;
