// import { React, useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { getProducts } from "../actions/productsActions";
// import { useAlert } from "react-alert";
// import Pagination from "react-js-pagination";
// import MetaData from "./layouts/metadata";

// import "@fortawesome/fontawesome-free/css/all.min.css"; //fa
// import "../../src/App.css";

// import Product from "./product/Product";
// import Loader from "./layouts/Loader";
// import { useParams } from "react-router-dom";

// const Home = ({ match }) => {
//   const [currentPage, setCurrentPage] = useState(1);

//   const dispatch = useDispatch();
//   const alert = useAlert();
//   const { loading, products, error, productsCount, resPerPage } = useSelector(
//     (state) => state.products
//   );

//   const { keyword } = useParams();
//   console.log(` keyword: ${keyword}`);
//   // const keyword = match.params.keyword //deprecated
//   useEffect(() => {
//     if (error) {
//       // alert.success("All products loaded"); // success messages at the top
//       return alert.error(error);
//     }

//     dispatch(getProducts(keyword, currentPage));
//   }, [dispatch, alert, error, currentPage, keyword]);

//   function setCurrentPageNo(pageNumber) {
//     setCurrentPage(pageNumber);
//   }

//   return (
//     <>
//       {loading ? (
//         <Loader />
//       ) : (
//         <>
//           <MetaData title={`Buy Best Products online `} />

//           {/* <div className="container container-fluid"> */}
//           <h1 id="products_heading">Latest Products</h1>

//           <section id="products" className="container mt-5">
//             <div className="row">
//               {products &&
//                 products.map((product) => (
//                   <Product key={product._id} product={product} />
//                 ))}
//             </div>
//           </section>
//           {resPerPage <= productsCount && (
//             <div className="d-flex justify-content-center mt-5 py-3">
//               <Pagination
//                 activePage={currentPage}
//                 itemsCountPerPage={resPerPage}
//                 totalItemsCount={productsCount}
//                 onChange={setCurrentPageNo}
//                 nextPageText={">"}
//                 prevPageText={"<"}
//                 lastPageText={"Last"}
//                 firstPageText={"First"}
//                 itemClass="page-item"
//                 linkClass="page-link"
//               />
//             </div>
//           )}
//         </>
//       )}
//     </>
//   );
// };

// export default Home;

// ------------------------------------>
import { React, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../actions/productsActions";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";

import Pagination from "react-js-pagination";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import MetaData from "./layouts/metadata";
import Product from "./product/Product";

import Loader from "./layouts/Loader";

import "@fortawesome/fontawesome-free/css/all.min.css"; //fa
import "../../src/App.css";

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 1000]);
  const [category, setCategory] = useState("");

  const categories = [
    "electronics",
    "fashion",
    "beauty",
    "accessories",
    "food",
    "books",
    "clothes",
    "shoes",
    // "beauty",
    "health",
    "sports",
    "wearables",
    "audio",
    "computers",
    "smart home",
    "gadgets",
  ];
  categories.sort();

  const dispatch = useDispatch();
  const alert = useAlert();
  const {
    loading,
    products = [],
    error,
    productsCount,
    resPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const { keyword } = useParams(); // Destructure keyword from useParams

  useEffect(() => {
    if (error) {
      alert.error(error);
      return;
    }

    dispatch(getProducts(keyword, currentPage, price, category));
  }, [dispatch, alert, error, currentPage, keyword, price, category]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }
  const getPopupContainer = (triggerNode) => {
    return (triggerNode && triggerNode.parentNode) || document.body;
  };

  let count = productsCount;
  if (keyword) {
    count = filteredProductsCount;
  }
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`Buy Best Products online`} />

          <h1 id="products_heading">Latest Products</h1>
          <div className="container ">
            <section id="products" className="container mt-5">
              <div className="row">
                {keyword ? (
                  <>
                    {" "}
                    <div className="col-3 col-md-3 mt-5 mb-5">
                      <div className="px-5">
                        <Range
                          marks={{
                            1: `$1`,
                            1000: `$1000`,
                          }}
                          min={1}
                          max={1000}
                          default={[1, 1000]}
                          tipFormatter={(value) => `$${value}`}
                          tipProps={{
                            placement: "top",
                            visible: true,
                            getPopupContainer,
                          }}
                          value={price}
                          onChange={(value) => setPrice(value)}
                        />

                        <hr className="my-5" />
                        <div className="mt-5">
                          <h4 className="mb-3">Categories</h4>
                          <ul className="pl-0">
                            {categories.map((cat) => (
                              <li
                                style={{
                                  cursor: "pointer",
                                  listStyleType: "none",
                                }}
                                key={cat}
                              >
                                <input
                                  type="checkbox"
                                  id={cat}
                                  value={cat}
                                  checked={category === cat}
                                  onChange={(e) => setCategory(e.target.value)}
                                />
                                <label htmlFor={cat}>{cat}</label>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-6 col-md-9">
                      <div className="row">
                        {products.map((product) => (
                          <Product
                            key={product._id}
                            product={product}
                            col={4}
                          />
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  products &&
                  products.map((product) => (
                    <Product key={product._id} product={product} />
                  ))
                )}
              </div>
            </section>
            {resPerPage <= count && (
              <div className="d-flex justify-content-center mt-5 py-3">
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={resPerPage}
                  totalItemsCount={productsCount}
                  onChange={setCurrentPageNo}
                  nextPageText={">"}
                  prevPageText={"<"}
                  lastPageText={"Last"}
                  firstPageText={"First"}
                  itemClass="page-item"
                  linkClass="page-link"
                />
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
