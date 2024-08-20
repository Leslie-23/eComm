import { React, useEffect } from "react";
import MetaData from "./layouts/metadata";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../actions/productsActions";
import "@fortawesome/fontawesome-free/css/all.min.css"; //fa
import "../../src/App.css";
import Product from "./product/Product";
import Loader from "./layouts/Loader";
import { useAlert } from "react-alert";
const Home = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, products, error, productsCount } = useSelector(
    (state) => state.products
  );
  useEffect(() => {
    if (error) {
      // alert.success("All products loaded"); // success messages at the top
      return alert.error(error);
    }

    dispatch(getProducts());
  }, [dispatch, alert, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`Buy Best Products online `} />

          {/* <div className="container container-fluid"> */}
          <h1 id="products_heading">Latest Products</h1>

          <section id="products" className="container mt-5">
            <div className="row">
              {products &&
                products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Home;
