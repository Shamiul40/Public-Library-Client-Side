import { createBrowserRouter } from "react-router";
import MainLayout from "./src/LayOut/MainLayout";
import Home from "./src/Pages/Home";
import Authlayout from "./src/LayOut/AuthLayout";
import Login from "./src/Pages/Login";
import Register from "./src/Pages/Register";
import ErrorPage from "./src/Pages/ErrorPage";
import PrivateRoute from "./src/PrivateRoute/PrivateRoute";
import AllBooks from "./src/Pages/AllBooks";
import AddBooks from "./src/Pages/AddBooks";
import BorrowedBooks from "./src/Pages/BorrowedBooks";
import UpdateBook from "./src/Pages/UpdateBook";
import BookDetails from "./src/Pages/BookDetails";
import CategoryBooks from "./src/Pages/CategoryBooks";

export const router = createBrowserRouter([
  {
    path : "/",
    Component : MainLayout,
    children : [
      {
        index : true,
        Component : Home
      },
      {
        path :  "/category/:categoryName",
        Component : CategoryBooks
      },
      {
        path : "/book-details/:id",
        element : 
        <PrivateRoute>
          <BookDetails></BookDetails>
        </PrivateRoute>
      },
      {
        path : "/allBooks",
        element : 
        <PrivateRoute>
          <AllBooks></AllBooks>
        </PrivateRoute>
      },
      {
        path : "/update-book/:id",
        element :
        <PrivateRoute>
          <UpdateBook></UpdateBook>
        </PrivateRoute>
      },
      {
        path : "/addBooks",
        element : 
        <PrivateRoute>
          <AddBooks></AddBooks>
        </PrivateRoute>
      },
      {
        path : "/borrowedBooks",
        element : 
        <PrivateRoute>
          <BorrowedBooks></BorrowedBooks>
        </PrivateRoute>
      },
      {
        path :"*",
        Component : ErrorPage
      },
      {
        path : "/auth",
        Component : Authlayout,
        children :[
          {
            path :"/auth/login",
            Component : Login
          },
          {
            path : "/auth/register",
            Component : Register
          }
        ]
      }
    ]
  }
])