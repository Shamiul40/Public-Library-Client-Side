// src/pages/UpdateBook.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";

const UpdateBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://library-server-side-dun.vercel.app/books/${id}`)
      .then((res) => res.json())
      .then((data) => setBook(data));
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedBook = {
      image: form.image.value,
      name: form.name.value,
      author: form.author.value,
      category: form.category.value,
      rating: parseFloat(form.rating.value),
    };

    const res = await fetch(`https://library-server-side-dun.vercel.app/books/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedBook),
    });

    const result = await res.json();
    if (result.modifiedCount > 0) {
      Swal.fire("Success", "Book updated successfully!", "success");
      navigate("/all-books");
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-100 text-white w-full max-w-md shadow-2xl">
        <div className="card-body">
          <h2 className="text-xl font-semibold text-center">Update Book</h2>
          <form onSubmit={handleUpdate} className="space-y-4">
            <input name="image" defaultValue={book.image} className="input input-bordered w-full" placeholder="Image URL" required />
            <input name="name" defaultValue={book.name} className="input input-bordered w-full" placeholder="Book Title" required />
            <input name="author" defaultValue={book.author} className="input input-bordered w-full" placeholder="Author Name" required />
            <select name="category" defaultValue={book.category} className="input input-bordered w-full">
              <option value="Novel">Novel</option>
              <option value="Thriller">Thriller</option>
              <option value="History">History</option>
              <option value="Drama">Drama</option>
              <option value="Sci-Fi">Sci-Fi</option>
            </select>
            <input type="number" step="0.1" name="rating" defaultValue={book.rating} min="1" max="5" className="input input-bordered w-full" placeholder="Rating" required />
            <button type="submit" className="btn border-none bg-[#3749bb] text-white w-full">Update Book</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateBook;
