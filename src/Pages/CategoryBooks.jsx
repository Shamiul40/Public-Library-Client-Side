// src/pages/CategoryBooks.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { motion } from "framer-motion";

const CategoryBooks = () => {
  const { categoryName } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://library-server-side-dun.vercel.app/books")
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(b => b.category.toLowerCase() === categoryName.toLowerCase());
        setBooks(filtered);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [categoryName]);

  const searched = books.filter(b =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(searched.length / itemsPerPage);
  const paginated = searched.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner text-primary loading-lg" />
      </div>
    );
  }

  return (
    <div className="px-6 md:px-16 py-12 space-y-8">
      <h2 className="text-3xl font-bold text-center">{categoryName} Books</h2>

      {/* Search */}
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Search within category..."
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
          className="input input-bordered w-full max-w-md"
        />
      </div>

      {/* Grid */}
      {paginated.length === 0 ? (
        <p className="text-center text-gray-500">No books found.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {paginated.map(book => (
            <motion.div key={book._id}
              className="card bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden"
              whileHover={{ scale: 1.03 }}
            >
              <img src={book.image} alt={book.name} className="h-48 w-full object-cover" />
              <div className="p-4 space-y-1">
                <h3 className="font-semibold text-lg">{book.name}</h3>
                <p className="text-sm text-gray-600">Author: {book.author}</p>
                <button className="btn btn-sm btn-primary w-full mt-2" onClick={() => navigate(`/book-details/${book._id}`)}>
                  Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center space-x-2 mt-6">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`btn btn-sm ${page === i + 1 ? "btn-primary" : "btn-outline"}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryBooks;
