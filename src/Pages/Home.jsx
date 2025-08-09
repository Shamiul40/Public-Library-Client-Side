import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import bannerImg1 from "../assets/img1.jpg";
import bannerImg2 from "../assets/img2.jpg";
import bannerImg3 from "../assets/img2.jpg";

const categoryColors = [
  "bg-blue-100 hover:bg-blue-200",
  "bg-green-100 hover:bg-green-200",
  "bg-yellow-100 hover:bg-yellow-200",
  "bg-red-100 hover:bg-red-200",
];

const ITEMS_PER_PAGE = 8;

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://library-server-side-dun.vercel.app/books")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch books:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner text-primary loading-lg"></span>
      </div>
    );
  }

  const categories = [...new Set(books.map((book) => book.category))].slice(
    0,
    4
  );

  const filteredBooks = books.filter(
    (book) =>
      book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentBooks = filteredBooks.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredBooks.length / ITEMS_PER_PAGE);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-8">
      {/* Banner Section */}

      <div className="carousel w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] xl:h-[400px] rounded-xl overflow-hidden my-6">
        {[bannerImg1, bannerImg2, bannerImg3].map((img, idx) => (
          <div
            key={idx}
            id={`slide${idx + 1}`}
            className="carousel-item relative w-full"
          >
            {/* Banner Content Layer */}
            <div
              className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white"
              style={{
                backgroundImage: `url(${img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="text-center px-4 space-y-2">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
                  Explore Knowledge
                </h2>
                <p className="text-sm md:text-base">
                  Discover books, grow your mind.
                </p>
              </div>
            </div>

            {/* Left Arrow */}
            <a
              href={`#slide${idx === 0 ? 3 : idx}`}
              className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 btn btn-circle"
            >
              ❮
            </a>

            {/* Right Arrow */}
            <a
              href={`#slide${idx === 2 ? 1 : idx + 2}`}
              className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 btn btn-circle"
            >
              ❯
            </a>
          </div>
        ))}
      </div>

      {/* Category Section */}
      <section className="px-6 md:px-16 ">
        <h2 className="text-3xl font-bold text-center mb-4">
          Books by Category
        </h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          {categories.map((cat, i) => (
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              key={i}
              className={`${categoryColors[i]} rounded-lg p-6 shadow bg-gray-800 cursor-pointer text-center`}
              onClick={() => navigate(`/category/${cat}`)}
            >
              <h3 className="text-xl font-bold">{cat}</h3>
              <p className="text-sm mt-2">Click to explore all {cat} books</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Search Input */}
      <section className="px-6 md:px-16 ">
        <input
          type="text"
          placeholder="Search by book name, author, or category..."
          className="w-full max-w-md mx-automb-8 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </section>

      {/* Books List with Pagination */}
      <section className="px-6 md:px-16">
        <h2 className="text-3xl font-bold mb-6 text-center">Books</h2>
        {filteredBooks.length === 0 ? (
          <p className="text-center text-gray-500">No books found.</p>
        ) : (
          <>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {currentBooks.map((book) => (
                <motion.div
                  key={book._id}
                  className="card bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden"
                  whileHover={{ scale: 1.03 }}
                >
                  <img
                    src={book.image}
                    alt={book.name}
                    className="h-48 w-full object-cover"
                  />
                  <div className="p-4 text-left space-y-1">
                    <h3 className="font-semibold text-lg text-gray-800">
                      {book.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Author: {book.author}
                    </p>
                    <p className="text-sm text-gray-600">
                      Category: {book.category}
                    </p>
                    <button
                      className="btn btn-sm btn-primary w-full mt-2"
                      onClick={() => navigate(`/book-details/${book._id}`)}
                    >
                      Details
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination Buttons */}
            <div className="flex justify-center space-x-3 mt-8">
              <button
                className="btn btn-sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              {[...Array(totalPages)].map((_, idx) => {
                const pageNum = idx + 1;
                return (
                  <button
                    key={pageNum}
                    className={`btn btn-sm ${
                      currentPage === pageNum ? "btn-primary" : "btn-outline"
                    }`}
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button
                className="btn btn-sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </>
        )}
      </section>

      {/* Extra Section 1 */}
      <section className="bg-[#00a1e1] py-12 px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-3xl font-bold mb-4"
        >
          Join Our Monthly Book Club
        </motion.h2>
        <p className="max-w-2xl mx-auto text-gray-700">
          Engage in exciting discussions, attend virtual events, and meet
          like-minded readers from around the world.
        </p>
      </section>

      {/* Extra Section 2 */}
      <section className="bg-[#00a1e1] py-12 px-6 text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-3xl font-bold mb-4"
        >
          Donate Books & Spread Knowledge
        </motion.h2>
        <p className="max-w-2xl mx-auto text-gray-700">
          Have extra books? Donate today to make education accessible to all.
          Your small effort can make a big impact.
        </p>
      </section>
    </div>
  );
};

export default HomePage;
