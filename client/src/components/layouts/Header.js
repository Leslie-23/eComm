// import React from "react";
// import { Route, Routes, Link } from "react-router-dom";
// import "../../App.css";
// import Search from "./Search";

// const Header = () => {
//   return (
//     <>
//       <nav className="navbar row">
//         <div className="col-12 col-md-3">
//           <div className="navbar-brand">
//             <img src="/images/logo.png" alt="E-COMMERCE img" />
//           </div>
//         </div>

//         <div className="col-12 col-md-6 mt-2 mt-md-0">
//           <div className="input-group">
//             <input
//               type="text"
//               id="search_field"
//               className="form-control"
//               placeholder="Enter Product Name ..."
//             />
//             <div className="input-group-append">
//               <button id="search_btn" className="btn">
//                 <i className="fa fa-search" aria-hidden="true"></i>
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
//           <Route path="/search" Component={Search} />
//           <Routes>
//             {" "}
//             <Route
//               render={({ history }) => <Search history={history} />}
//             ></Route>
//           </Routes>
//           <Link to="/login" className="btn" id="login_btn">
//             Login
//           </Link>

//           <span id="cart" className="ml-3">
//             Cart
//           </span>
//           <span className="ml-1" id="cart_count">
//             2
//           </span>
//         </div>
//       </nav>
//     </>
//   );
// };

// export default Header;

// // ------------------------------------>
// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "../../App.css";
// import Search from "./Search";

// const Header = () => {
//   const navigate = useNavigate();

//   return (
//     <>
//       <nav className="navbar row">
//         <div className="col-12 col-md-3">
//           <div className="navbar-brand">
//             <Link to="/">
//               <img src="/images/logo.png" alt="E-COMMERCE img" />
//             </Link>
//           </div>
//         </div>

//         <div className="col-12 col-md-6 mt-2 mt-md-0">
//           <Search navigate={navigate} />
//         </div>

//         <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
//           <Link to="/login" className="btn" id="login_btn">
//             Login
//           </Link>

//           <span id="cart" className="ml-3">
//             Cart
//           </span>
//           <span className="ml-1" id="cart_count">
//             2
//           </span>
//         </div>
//       </nav>
//     </>
//   );
// };

// export default Header;
import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import "../../App.css";
import Search from "./Search";
import Login from "../user/Login";

const Header = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const { user, loading } = useSelector((state) => state.auth);

  // Updated searchHandler function
  const searchHandler = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    console.log("Search keyword:", keyword); // Debugging line
    if (keyword.trim()) {
      navigate(`/search/${keyword}`); // Navigate to search results with keyword
    } else {
      navigate(`/`); // Navigate to home if no keyword
    }
  };
  console.log("Search keyword:", keyword); // Debugging line
  return (
    <>
      <nav className="navbar row">
        <div className="col-12 col-md-3">
          <Link to="/">
            <img src="/images/logo.png" alt="E-COMMERCE img" />
          </Link>
        </div>

        <div className="col-12 col-md-6 mt-2 mt-md-0">
          <form onSubmit={searchHandler}>
            <div className="input-group">
              <input
                type="text"
                id="search_field"
                className="form-control"
                placeholder="Enter Product Name ..."
                value={keyword} // Set value to keyword state
                onChange={(e) => setKeyword(e.target.value)} // Update keyword state on input change
              />
              <div className="input-group-append">
                <button id="search_btn" className="btn">
                  <i className="fa fa-search" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          <Link to="/cart" style={{ textDecoration: "none" }}>
            <span id="cart" className="ml-3">
              Cart
            </span>
            <span className="ml-1" id="cart_count">
              2
            </span>
          </Link>

          {user ? (
            <div className="ml-4 dropdown d-inline">
              <Link
                to="#"
                className="btn dropdown-toggle text-white mr-4"
                type="button"
                id="dropDownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <figure className="avatar avatar-nav">
                  <img
                    src={user.avatar && user.avatar.url}
                    alt={user && user.name}
                    className="rounded-circle"
                  />
                </figure>
                <span>{user && user.name}</span>
              </Link>

              <div
                className="dropdown-menu"
                aria-labelledby="dropDownMenuButton"
              >
                {user && user.role !== "admin" ? (
                  <>
                    <Link className="dropdown-item" to="/orders">
                      My Orders
                    </Link>
                    <Link className="dropdown-item" to="/favorites">
                      My Favorites
                    </Link>

                    <Link className="dropdown-item " to="/profile">
                      Profile
                    </Link>
                  </>
                ) : (
                  <Link to="dashboard" className="dropdown-item">
                    Dashboard
                  </Link>
                )}

                <Link className="dropdown-item text-danger" to="/logout">
                  Logout
                </Link>
              </div>
            </div>
          ) : (
            !loading && (
              <Link to="/login" className="btn ml-4" id="login_btn">
                Login
              </Link>
            )
          )}
        </div>
        {/* <Link to="/login" className="btn ml-4" id="login_btn">
          Login
        </Link> */}
      </nav>

      {/* Routes can be defined here or in a separate component */}
      <Routes>
        {/* <Route render={({ history }) => <Search history={history} />} /> */}
        {/* <Route
          path="/search/:keyword"
          render={{ history }}
          Component={<Search history={history} />}
        /> */}
        <Route path="/search/:keyword" element={<Search history={history} />} />
        {/* <Route path="/login" element={<Login />} /> */}
      </Routes>
    </>
  );
};

export default Header;
