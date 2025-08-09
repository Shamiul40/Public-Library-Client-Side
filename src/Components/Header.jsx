import React, { use } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../Layout/AuthProvider";
import Swal from "sweetalert2";


const Header = () => {
 
const { user, logOut, loading } = use(AuthContext);

  if (loading) {
    return (
      <div className="flex justify-center items-center my-10">
        <span className="loading loading-bars loading-x"></span>
      </div>
    );
  }

  const HandleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire("Logout Successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

 

  const links = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "text-[#00a1e1]" : "")}
      >
        Home
      </NavLink>
      <NavLink
        to="/allBooks"
        className={({ isActive }) => (isActive ? "text-[#00a1e1]" : "")}
      >
        All Books
      </NavLink>
      <NavLink
        to="/addBooks"
        className={({ isActive }) => (isActive ? "text-[#00a1e1]" : "")}
      >
        Add Books
      </NavLink>
      <NavLink
        to="/borrowedBooks"
        className={({ isActive }) => (isActive ? "text-[#00a1e1]" : "")}
      >
        Borrowed Books
      </NavLink>
      
      
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <a className="text-xl font-bold hidden md:block">
          Public<span className="text-[#00a1e1]"> Library</span>
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-4">{links}</ul>
      </div>
      <div className="navbar-end">
        <div className="navbar-end gap-5">
          <div className="bg-base-200 px-4 py-2 rounded-lg hidden md:block">
            {user && user.email}
          </div>

          {user && (
            <img
              className="w-12 rounded-full "
              src={user.photoURL || userImg}
              alt="user"
            />
          )}

          {user ? (
            <button
              onClick={HandleLogOut}
              className="btn text-white bg-[#00a1e1] px-6 md:px-10"
            >
              Logout
            </button>
          ) : (
            <Link to="/auth/login" className="btn text-white bg-[#00a1e1] px-6 md:px-10">
              Login
            </Link>
          )}
        </div>

       
      </div>
    </div>
  );
};

export default Header;
