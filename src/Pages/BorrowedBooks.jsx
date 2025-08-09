
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Layout/AuthProvider";
import Swal from "sweetalert2";

const BorrowedBooks = () => {
  const { user } = useContext(AuthContext);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [allBooks, setAllBooks] = useState([]);

  useEffect(() => {
    fetch("https://library-server-side-dun.vercel.app/books")
      .then((res) => res.json())
      .then((data) => setAllBooks(data));
  }, []);

  const fetchBorrowed = async () => {
    const res = await fetch(`https://library-server-side-dun.vercel.app/borrowed?email=${user?.email}`);
    const data = await res.json();
    setBorrowedBooks(data);
  };

  useEffect(() => {
    if (user?.email) fetchBorrowed();
  }, [user?.email]);

  const handleReturn = async (borrowedBook) => {
    const res = await fetch(`https://library-server-side-dun.vercel.app/borrowed/${borrowedBook._id}`, {
      method: "DELETE",
    });

    const result = await res.json();

    if (result.deletedCount > 0) {
      await fetch(`https://library-server-side-dun.vercel.app/books/quantity/${borrowedBook.bookId}`, {
        method: "PATCH",
      });

      Swal.fire("Returned", "Book returned successfully", "success");
      fetchBorrowed(); // refresh
    } else {
      Swal.fire("Error", "Return failed", "error");
    }
  };

  const mergedBorrowedBooks = borrowedBooks.map((borrow) => {
    const bookInfo = allBooks.find((book) => book._id === borrow.bookId) || {};
    return { ...borrow, ...bookInfo };
  });

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold mb-6 text-center">My Borrowed Books</h2>
      <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mergedBorrowedBooks.map((book) => (
          <div key={book._id} className="card  bg-white text-black shadow-xl">
            <figure>
              <img src={book.image} alt={book.name} className="h-60 w-full object-cover" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{book.name}</h2>
              <p><strong>Category:</strong> {book.category}</p>
              <p><strong>Borrowed:</strong> {book.borrowedDate}</p>
              <p><strong>Return:</strong> {book.returnDate}</p>
              <div className="card-actions justify-end">
                <button
                  onClick={() => handleReturn(book)}
                  className="btn border-none bg-[#3749bb]"
                >
                  Return
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BorrowedBooks;
