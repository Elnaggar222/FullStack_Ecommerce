import { Route, Routes } from "react-router-dom";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import Cart from "../Pages/Cart";
import CategoryProducts from "../Pages/CategoryProducts";
import Home from "../Pages/Home";
import SingleProductPage from "../Pages/SingleProductPage";
import Success from "../Pages/Success";
import { useSelector } from "react-redux";

const MainRoutes = () => {
  const user = useSelector((state) => state.userState.currentUser);


  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/category/:category" element={<CategoryProducts />} />
      <Route path="/product/:id" element={<SingleProductPage />} />
      <Route path="/cart" element={<Cart />} />
      {!user ? (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </>
      ) : (
        <>
          <Route path="/register" element={<Home />} />
          <Route path="/login" element={<Home />} />
        </>
      )}
      <Route path="/success" element={<Success />} />
    </Routes>
  );
};

export default MainRoutes;
