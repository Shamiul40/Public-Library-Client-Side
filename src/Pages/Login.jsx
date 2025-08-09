import React, { use, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../Layout/AuthProvider';

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { signIn, googleLogin } = use(AuthContext);
  const emailRef = useRef(); 

  const handleLogin = (e) => {
    e.preventDefault();
    const target = e.target;
    const email = target.email.value;
    const password = target.password.value;

    signIn(email, password)
      .then((result) => {
        navigate(location.state ? location.state : "/");
      })
      .catch((error) => {
        const errorCode = error.code;
        setErrorMessage(errorCode);
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

  const handleForgotPassword = () => {
    const email = emailRef.current.value;
    navigate("/auth/forgot-password", {
      state: { email },
    });
  };

  return (
    <div className="flex justify-center">
      <div className="card  w-full max-w-sm shrink-0 shadow-2xl ">
        <div className="card-body">
          <form onSubmit={handleLogin} className="fieldset">
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              ref={emailRef}
              className="input text-white"
              placeholder="Email"
            />
            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              className="input text-white"
              placeholder="Password"
            />
            <div>
              <button
                type="button"
                className="link link-hover"
                onClick={handleForgotPassword}
              >
                Forgot password?
              </button>
            </div>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <button type="submit" className="btn btn-neutral mt-4">
              Login
            </button>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="btn btn-outline mt-2 w-full"
            >
              Continue with Google
            </button>

            <p className="font-semibold text-center my-2 text-sm">
              Don’t have any account?{" "}
              <Link  className="text-black" to="/auth/register">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
