// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { useAlert } from "react-alert";

// import { getProductDetails, clearErrors } from "../../actions/productsActions";

// import Loader from "../layouts/Loader";
// import MetaData from "../layouts/Loader";

// import "../../App.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "font-awesome/css/font-awesome.min.css";

// const ProductDetail = ({}) => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const alert = useAlert();
//   const { loading, error, product } = useSelector(
//     (state) => state.productDetails
//   );

//   useEffect(() => {
//     dispatch(getProductDetails(id));
//     if (error) {
//       alert.error(error.message);
//       dispatch(clearErrors());
//     }
//   }, [dispatch, id, error, product, alert]);

//   const [quantity, setQuantity] = useState(1);
//   const [showModal, setShowModal] = useState(false);

//   const handleShowModal = () => setShowModal(true);
//   const handleCloseModal = () => setShowModal(false);

//   const handleIncrease = () => setQuantity(quantity + 1);
//   const handleDecrease = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

//   return (
//     <>
//       {loading ? (
//         <Loader />
//       ) : (
//         <>
//           <div>
//             <MetaData title={`Buy ${product.name} online`} />
//             <h1>Leslie</h1>
//             <div className="row f-flex justify-content-around">
//               <div className="col-12 col-lg-5 img-fluid" id="product_image">
//                 <img
//                   src="https://i5.walmartimages.com/asr/1223a935-2a61-480a-95a1-21904ff8986c_1.17fa3d7870e3d9b1248da7b1144787f5.jpeg?odnWidth=undefined&odnHeight=undefined&odnBg=ffffff"
//                   alt="sdf"
//                   height="500"
//                   width="500"
//                 />
//               </div>

//               <div className="col-12 col-lg-5 mt-5">
//                 <h3>{product.name}</h3>
//                 <p id="product_id">Product # sklfjdk35fsdf5090</p>

//                 <hr />

//                 <div className="rating-outer">
//                   <div className="rating-inner"></div>
//                 </div>
//                 <span id="no_of_reviews">(5 Reviews)</span>

//                 <hr />

//                 <p id="product_price">$108.00</p>
//                 <div className="stockCounter d-inline">
//                   <button
//                     className="btn btn-danger minus"
//                     onClick={handleDecrease}
//                   >
//                     -
//                   </button>

//                   <input
//                     type="number"
//                     className="form-control count d-inline"
//                     value={quantity}
//                     readOnly
//                   />

//                   <button
//                     className="btn btn-primary plus"
//                     onClick={handleIncrease}
//                   >
//                     +
//                   </button>
//                 </div>
//                 <button
//                   type="button"
//                   id="cart_btn"
//                   className="btn btn-primary d-inline ml-4"
//                 >
//                   Add to Cart
//                 </button>

//                 <hr />

//                 <p>
//                   Status: <span id="stock_status">In Stock</span>
//                 </p>

//                 <hr />

//                 <h4 className="mt-2">Description:</h4>
//                 <p>
//                   Binge on movies and TV episodes, news, sports, music, and
//                   more! We insisted on 720p High Definition for this 32" LED TV,
//                   bringing out more lifelike color, texture, and detail. We also
//                   partnered with Roku to bring you the best possible content
//                   with thousands of channels to choose from, conveniently
//                   presented through your own custom home screen.
//                 </p>
//                 <hr />
//                 <p className="mb-3">
//                   Sold by: <strong>Amazon</strong>
//                 </p>

//                 <button
//                   id="review_btn"
//                   type="button"
//                   className="btn btn-primary mt-4"
//                   onClick={handleShowModal}
//                 >
//                   Submit Your Review
//                 </button>

//                 <div className="row mt-2 mb-5">
//                   <div className="rating w-50">
//                     <div
//                       className={`modal fade ${
//                         showModal ? "show d-block" : ""
//                       }`}
//                       id="ratingModal"
//                       tabIndex="-1"
//                       role="dialog"
//                       aria-labelledby="ratingModalLabel"
//                       aria-hidden={!showModal}
//                       style={{ display: showModal ? "block" : "none" }}
//                     >
//                       <div className="modal-dialog" role="document">
//                         <div className="modal-content">
//                           <div className="modal-header">
//                             <h5 className="modal-title" id="ratingModalLabel">
//                               Submit Review
//                             </h5>
//                             <button
//                               type="button"
//                               className="close"
//                               onClick={handleCloseModal}
//                               aria-label="Close"
//                             >
//                               <span aria-hidden="true">&times;</span>
//                             </button>
//                           </div>
//                           <div className="modal-body">
//                             <ul className="stars">
//                               {[...Array(5)].map((_, index) => (
//                                 <li className="star" key={index}>
//                                   <i className="fa fa-star"></i>
//                                 </li>
//                               ))}
//                             </ul>

//                             <textarea
//                               name="review"
//                               id="review"
//                               className="form-control mt-3"
//                             ></textarea>

//                             <button
//                               className="btn my-3 float-right review-btn px-4 text-white"
//                               onClick={handleCloseModal}
//                             >
//                               Submit
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     {showModal && (
//                       <div
//                         className="modal-backdrop fade show"
//                         onClick={handleCloseModal}
//                       ></div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </>
//   );
// };

// export default ProductDetail;

// ------------------------------------->
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import { Carousel } from "react-bootstrap";

import { getProductDetails, clearErrors } from "../../actions/productsActions";

import Loader from "../layouts/Loader";
import MetaData from "../layouts/metadata";

import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, product } = useSelector(
    (state) => state.productDetail
  );

  useEffect(() => {
    dispatch(getProductDetails(id));

    if (error) {
      alert.error(error.message);
      dispatch(clearErrors());
    }
  }, [dispatch, id, error, alert]); // Ensure `product` is not in dependencies

  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        product && ( // Ensure that product is checked before rendering
          <div>
            <MetaData title={`Buy ${product.name} online`} />

            <div className="row f-flex justify-content-around">
              <div className="col-12 col-lg-5 img-fluid" id="product_image">
                <Carousel pause="hover">
                  {product.images &&
                    product.images.map((image) => (
                      <Carousel.Item key={image.public_id}>
                        <img
                          src={image.url}
                          alt={product.title}
                          className="d-block"
                          width={500}
                          height={500}
                        />
                      </Carousel.Item>
                    ))}
                </Carousel>
              </div>

              <div className="col-12 col-lg-5 mt-5">
                <h3>{product.name}</h3>
                <p id="product_id">Product # {product._id}</p>

                <hr />

                <div className="rating-outer">
                  <div
                    className="rating-inner"
                    style={{
                      width: `${parseFloat(product.ratings / 5) * 100}%`,
                    }}
                  ></div>
                </div>
                <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>

                <hr />

                <p id="product_price">${product.price}</p>
                <div className="stockCounter d-inline">
                  <button
                    className="btn btn-danger minus"
                    onClick={handleDecrease}
                  >
                    -
                  </button>

                  <input
                    type="number"
                    className="form-control count d-inline"
                    value={quantity}
                    readOnly
                  />

                  <button
                    className="btn btn-primary plus"
                    onClick={handleIncrease}
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  id="cart_btn"
                  className="btn btn-primary d-inline ml-4"
                >
                  Add to Cart
                </button>

                <hr />

                <p>
                  Status:{" "}
                  <span
                    id="stock_status"
                    className={product.stock > 0 ? "greenColor" : "redColor"}
                  >
                    {product.stock > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </p>

                <hr />

                <h4 className="mt-2">Description:</h4>
                <p>{product.description}</p>
                <hr />
                <p className="mb-3">
                  Sold by: <strong>{product.seller}</strong>
                </p>

                <button
                  id="review_btn"
                  type="button"
                  className="btn btn-primary mt-4"
                  onClick={handleShowModal}
                >
                  Submit Your Review
                </button>

                <div className="row mt-2 mb-5">
                  <div className="rating w-50">
                    <div
                      className={`modal fade ${
                        showModal ? "show d-block" : ""
                      }`}
                      id="ratingModal"
                      tabIndex="-1"
                      role="dialog"
                      aria-labelledby="ratingModalLabel"
                      aria-hidden={!showModal}
                      style={{ display: showModal ? "block" : "none" }}
                    >
                      <div className="modal-dialog" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="ratingModalLabel">
                              Submit Review
                            </h5>
                            <button
                              type="button"
                              className="close"
                              onClick={handleCloseModal}
                              aria-label="Close"
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <ul className="stars">
                              {[...Array(5)].map((_, index) => (
                                <li className="star" key={index}>
                                  <i className="fa fa-star"></i>
                                </li>
                              ))}
                            </ul>

                            <textarea
                              name="review"
                              id="review"
                              className="form-control mt-3"
                            ></textarea>

                            <button
                              className="btn my-3 float-right review-btn px-4 text-white"
                              onClick={handleCloseModal}
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {showModal && (
                      <div
                        className="modal-backdrop fade show"
                        onClick={handleCloseModal}
                      ></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default ProductDetail;
