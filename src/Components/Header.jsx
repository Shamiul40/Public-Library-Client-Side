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
        className={({ isActive }) => (isActive ? "text-[#3749bb] " : "")}
      >
        Home
      </NavLink>
      <NavLink
        to="/allBooks"
        className={({ isActive }) => (isActive ?"text-[#3749bb] " : "")}
      >
        All Books
      </NavLink>
      <NavLink
        to="/addBooks"
        className={({ isActive }) => (isActive ? "text-[#3749bb] ": "")}
      >
        Add Books
      </NavLink>
      <NavLink
        to="/borrowedBooks"
        className={({ isActive }) => (isActive ? "text-[#3749bb]": "")}
      >
        Borrowed Books
      </NavLink>
      
      
    </>
  );

  return (
    <div className="navbar  shadow-lg rounded-sm">
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
        <a className="text-xl text-[#3749bb] font-bold hidden md:block">
          Public<span className=""> Library</span>
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-4">{links}</ul>
      </div>
      <div className="navbar-end">
        <div className="navbar-end gap-5">
          <div className=" px-4 py-2 rounded-full hidden md:block">
            {user && user.email}
          </div>

          {user && (
            <img
              className="w-12 rounded-full  "
              src={user.photoURL || userImg}
              alt="user"
            />
          )}

          {user ? (
            <button
              onClick={HandleLogOut}
              className="py-1 rounded-full text-white bg-[#3749bb] px-4 md:px-10"
            >
              Logout
            </button>
          ) : (
            <Link to="/auth/login" className="py-1 rounded-full text-white bg-[#3749bb] px-4 md:px-10">
              Login
            </Link>
          )}
        </div>

       
      </div>
    </div>
  );
};

export default Header;
