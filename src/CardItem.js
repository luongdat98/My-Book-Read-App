import PropType from "prop-types";
import * as BooksAPI from "./BooksAPI";

const CardItem = ({book, handleReloadBooks}) => {
  const optionAddTypes = [
    {
      value: 'currentlyReading',
    },
    {
      value: 'wantToRead',
    },
    {
      value: 'read',
    },
  ];

  const optionMoveTypes = [
    {
      value: 'currentlyReading',
    },
    {
      value: 'wantToRead',
    },
    {
      value: 'read',
    },
    {
      value: 'none',
    },
  ];

  const updateBook = async (book, shelf) => {
    const res = await BooksAPI.update(book, shelf);
    if(res && res != null){
      handleReloadBooks();
    }
  };  

  const onChangeBook = (book, e) => {
    updateBook(book, e.target.value);
  };

  const showAddOptionType = (book, optionAddTypes) => (
    <select defaultValue={book.shelf ? book.shelf : "none"} onChange={(value) => onChangeBook(book, value)}>
        <option value="none" disabled>
          Add to...
        </option>
        {
          optionAddTypes.map((option) => (
            <option 
              key={option.value} 
              value={option.value}
            >
              {option.value}
            </option>
          ))
        }
      </select>
  );

  const showMoveOptionType = (book, optionMoveTypes) => (
    <select defaultValue={book.shelf} onChange={(value) => onChangeBook(book, value)}>
      <option value="none" disabled>
        Move to...
      </option>
      {
        optionMoveTypes.map((option) => (
          <option 
            key={option.value} 
            value={option.value}
          >
            {option.value}
          </option>
        ))
      }
    </select>
  );

  return (
    <li>
      {book ? (
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url("${book.imageLinks.thumbnail}")`,
              }}
            ></div>
            <div className="book-shelf-changer">
              {
                book.shelf ? showMoveOptionType(book, optionMoveTypes) : showAddOptionType(book, optionAddTypes)
              }
            </div>
          </div>
          <div className="book-title">{book?.title}</div>
          <div className="book-authors">{book?.authors}</div>
        </div>
        ) : ""
          }
    </li>
  );
};

CardItem.prototype = {
  book: PropType.object.isRequired,
  handleReloadBooks: PropType.func.isRequired,
};

export default CardItem;