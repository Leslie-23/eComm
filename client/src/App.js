import "./App.css";
import { useEffect } from "react";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Home from "./components/Home";
import ProductDetail from "./components/product/ProductDetail";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import { loadUser } from "./actions/userAction";
import Store from "./Store";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  useEffect(() => {
    Store.dispatch(loadUser());
  }, []);
  return (
    <div className="App">
      <Router>
        <Header />
        <div className="container">
          <div className="container container-fluid">
            <Routes>
              <Route path="/" Component={Home} exact />
              <Route path="/search/:keyword" Component={Home} />
              <Route path="/product/:id" Component={ProductDetail} exact />
              <Route path="/login" Component={Login} />
              <Route path="/register" Component={Register} />

              {/* <Route path="/" element={<Home />} />
              <Route path="/search/:keyword" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/login" element={<Login />} /> */}
            </Routes>
          </div>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
