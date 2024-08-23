// import React from "react";
// import { Route, Routes } from "react-router-dom";
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
//           {/* <Route path="/search" Component={Search} /> */}
//           <Routes>
//             {" "}
//             <Route
//               render={({ history }) => <Search history={history} />}
//             ></Route>
//           </Routes>
//           <button className="btn" id="login_btn">
//             Login
//           </button>

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

// ------------------------------------>
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../App.css";
import Search from "./Search";

const Header = () => {
  const navigate = useNavigate();

  return (
    <>
      <nav className="navbar row">
        <div className="col-12 col-md-3">
          <div className="navbar-brand">
            <Link to="/">
              <img src="/images/logo.png" alt="E-COMMERCE img" />
            </Link>
          </div>
        </div>

        <div className="col-12 col-md-6 mt-2 mt-md-0">
          <Search navigate={navigate} />
        </div>

        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          <button className="btn" id="login_btn">
            Login
          </button>

          <span id="cart" className="ml-3">
            Cart
          </span>
          <span className="ml-1" id="cart_count">
            2
          </span>
        </div>
      </nav>
    </>
  );
};

export default Header;
