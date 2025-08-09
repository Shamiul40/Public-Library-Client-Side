import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { AuthContext } from "../Layout/AuthProvider";

const Register = () => {
  const { createUser, setUser, updateUser, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); 
  const [error, setError] = useState("");

  const validatePassword = (password) => {
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasLength = password.length >= 6;
    return hasUpper && hasLower && hasLength;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    if (!validatePassword(password)) {
      return Swal.fire({
        icon: "error",
        title: "Invalid Password",
        text: "Password must be at least 6 characters, include an uppercase and a lowercase letter.",
      });
    }

    createUser(email, password)
      .then((result) => {
        updateUser({ displayName: name, photoURL: photo })
          .then(() => {
            setUser({ ...result.user, displayName: name, photoURL: photo });
            Swal.fire("Success!", "Registered successfully!", "success");
            navigate("/");
          })
          .catch(() => {
            setUser(result.user);
            Swal.fire("Warning", "Registered but profile not fully updated.", "warning");
          });
      })
      .catch((error) => {
        Swal.fire("Error", error.message, "error");
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        Swal.fire("Success!", "Logged in with Google", "success");
        navigate("/");
      })
      .catch((err) => {
        Swal.fire("Error", err.message, "error");
      });
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-100  text-white w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <h2 className="text-xl font-semibold text-center">Register</h2>
          <form onSubmit={handleRegister} className="space-y-3">
            <div>
              <label className="label">Name</label>
              <input name="name" type="text" className="input input-bordered w-full" required />
            </div>
            <div>
              <label className="label">Photo URL</label>
              <input name="photo" type="text" className="input input-bordered w-full" />
            </div>
            <div>
              <label className="label">Email</label>
              <input name="email" type="email" className="input input-bordered w-full" required />
            </div>
            <div>
              <label className="label">Password</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pr-10"
                  required
                />
                <span
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                </span>
              </div>
            </div>
            <button type="submit" className="btn btn-neutral w-full">Register</button>
          </form>

          <div className="text-center mt-3">
            <button onClick={handleGoogleLogin} className="btn btn-outline w-full">
              Continue with Google
            </button>
            <p className="text-sm mt-3">
              Already have an account? <Link to="/auth/login" className=" text-white  ">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
