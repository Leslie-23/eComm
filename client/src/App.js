import "./App.css";

import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Home from "./components/Home";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <div className="container container-fluid">
          <Routes>
            <Route path="/" Component={Home} exact />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
