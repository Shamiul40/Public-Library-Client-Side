
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../Layout/AuthProvider";

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [viewMode, setViewMode] = useState("card");
  const [showAvailable, setShowAvailable] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://library-server-side-dun.vercel.app/books")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setFilteredBooks(data);
      });
  }, []);

  const handleFilter = () => {
    setShowAvailable((prev) => {
      const newState = !prev;
      if (newState) {
        setFilteredBooks(books.filter((book) => book.quantity > 0));
      } else {
        setFilteredBooks(books);
      }
      return newState;
    });
  };

  const handleViewChange = (e) => {
    setViewMode(e.target.value);
  };

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold mb-6 text-center">All Books</h2>

      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <button onClick={handleFilter} className="btn btn-primary">
          {showAvailable ? "Show All Books" : "Show Available Books"}
        </button>

        <select
          onChange={handleViewChange}
          value={viewMode}
          className="select select-bordered w-full max-w-xs"
        >
          <option value="card">Card View</option>
          <option value="table">Table View</option>
        </select>
      </div>

      {viewMode === "card" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <div key={book._id} className="card bg-base-100 shadow-xl">
              <figure>
                <img
                  src={book.image}
                  alt={book.name}
                  className="h-60 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{book.name}</h2>
                <p><strong>Author:</strong> {book.author}</p>
                <p><strong>Category:</strong> {book.category}</p>
                <p><strong>Rating:</strong> {book.rating}</p>
                <p><strong>Quantity:</strong> {book.quantity}</p>
                <div className="card-actions justify-end">
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate(`/update-book/${book._id}`)}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Author</th>
                <th>Category</th>
                <th>Rating</th>
                <th>Quantity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((book) => (
                <tr key={book._id}>
                  <td>
                    <img src={book.image} alt={book.name} className="w-16 h-20 object-cover" />
                  </td>
                  <td>{book.name}</td>
                  <td>{book.author}</td>
                  <td>{book.category}</td>
                  <td>{book.rating}</td>
                  <td>{book.quantity}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => navigate(`/update-book/${book._id}`)}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllBooks;
