
import { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../Layout/AuthProvider";

const AddBook = () => {
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const newBook = {
      image: form.image.value,
      name: form.name.value,
      quantity: parseInt(form.quantity.value),
      author: form.author.value,
      category: form.category.value,
      description: form.description.value,
      rating: parseFloat(form.rating.value),
      email: user?.email,
    };

    try {
      const res = await fetch('https://library-server-side-dun.vercel.app/books', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBook),
      });

      const result = await res.json();
      if (result.insertedId) {
        Swal.fire("Success", "Book added successfully!", "success");
        form.reset();
      } else {
        Swal.fire("Error", "Failed to add book", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-100 text-white w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <h2 className="text-xl font-semibold text-center">Add Book</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input name="image" type="text" className="input input-bordered w-full" placeholder="Image URL" required />
            <input name="name" type="text" className="input input-bordered w-full" placeholder="Book Title" required />
            <input name="quantity" type="number" className="input input-bordered w-full" placeholder="Quantity" required />
            <input name="author" type="text" className="input input-bordered w-full" placeholder="Author Name" required />
            <select className="input input-bordered w-full" name="category">
              <option value="Novel">Novel</option>
              <option value="Thriller">Thriller</option>
              <option value="History">History</option>
              <option value="Drama">Drama</option>
              <option value="Sci-Fi">Sci-Fi</option>
            </select>
            <textarea name="description" className="input input-bordered w-full" placeholder="Short Description" required></textarea>
            <input name="rating" type="number" step="0.1" min="1" max="5" className="input input-bordered w-full" placeholder="Rating (1-5)" required />

            <input className="input input-bordered w-full" value={user?.displayName} readOnly />
            <input className="input input-bordered w-full" value={user?.email} readOnly />

            <button className="btn bg-[#3749bb] border-none text-white w-full" type="submit">Add Book</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
