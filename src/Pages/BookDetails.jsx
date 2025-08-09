
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../Layout/AuthProvider";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch(`https://library-server-side-dun.vercel.app/books/${id}`)
      .then(res => res.json())
      .then(data => setBook(data))
      .catch(err => console.error("Error loading book:", err));
  }, [id]);

  const handleBorrow = async (e) => {
    e.preventDefault();
    const form = e.target;
    const returnDate = form.returnDate.value;

    if (!returnDate) {
      return Swal.fire("Warning", "Return date is required", "warning");
    }

    try {
      // 1. Save borrow record
      const borrowInfo = {
        bookId: book._id,
        userEmail: user.email,
        userName: user.displayName,
        returnDate,
        bookName: book.name,
        bookImage: book.image,
      };

      const res = await fetch("https://library-server-side-dun.vercel.app/borrow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(borrowInfo),
      });

      // 2. Reduce quantity
      const updateRes = await fetch(`https://library-server-side-dun.vercel.app/books/borrow/${book._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok && updateRes.ok) {
        Swal.fire("Success", "Book borrowed successfully!", "success");
        setShowModal(false);
        setBook(prev => ({ ...prev, quantity: prev.quantity - 1 }));
      } else {
        Swal.fire("Error", "Borrow failed", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  if (!book) return <div className="text-center mt-10">Loading book details...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        className="card shadow-xl bg-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex flex-col md:flex-row">
          <img src={book.image} alt={book.name} className="w-full md:w-1/2 h-96 object-cover rounded-l-lg" />
          <div className="p-6 space-y-2 md:w-1/2">
            <h2 className="text-3xl font-bold">{book.name}</h2>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Category:</strong> {book.category}</p>
            <p><strong>Rating:</strong> {book.rating}</p>
            <p><strong>Available Quantity:</strong> {book.quantity}</p>
            <p>{book.description}</p>
            <button
              className="btn btn-primary mt-4"
              onClick={() => setShowModal(true)}
              disabled={book.quantity === 0}
            >
              {book.quantity === 0 ? "Not Available" : "Borrow"}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Borrow Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-96 relative">
            <button className="absolute top-2 right-2 text-xl" onClick={() => setShowModal(false)}>✖</button>
            <h3 className="text-xl font-semibold mb-4">Borrow Book</h3>
            <form onSubmit={handleBorrow} className="space-y-3">
              <input type="text" className="input input-bordered w-full" value={user?.displayName} readOnly />
              <input type="email" className="input input-bordered w-full" value={user?.email} readOnly />
              <input type="date" name="returnDate" className="input input-bordered w-full" required />
              <button type="submit" className="btn btn-success w-full">Confirm Borrow</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetails;
